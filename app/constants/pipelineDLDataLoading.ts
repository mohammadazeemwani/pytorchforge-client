import type { MainTask, SubTasksDiscriminated } from "~/types/pipelineDL"

export type defaultDataLoadingCode_t = {
  [T in MainTask]: {
    [S in SubTasksDiscriminated<T>]: string
  }
}

export const defaultDataLoadingCode: defaultDataLoadingCode_t = {
  'image': {
    'classification': `    self.label_map = label_map or self._infer_label_map()
    self.data = self._load_data()
  
  def _infer_label_map(self):
    classes = sorted([d.name for d in self.root.iterdir() if d.is_dir()])
    return {cls: idx for idx, cls in enumerate(classes)}
  
  def _load_data(self):
    items = []
    for cls in self.label_map:
        for img_path in (self.root / cls).glob('*.jpg'):
            items.append((img_path, self.label_map[cls]))
    return items
  
  def __len__(self):
    return len(self.data)
  
  def __getitem__(self, idx):
    img_path, label = self.data[idx]
    image = Image.open(img_path).convert("RGB")
  
    for transform in self.transforms:
        image = transform(image)
  
    if self.return_format == 'tuple':
        return image, label
    elif self.return_format == 'raw':
        return image
    else:
        return {'image': image, 'label': label}`,
    'generation': `    self.data = self._load_data()
  
  def _load_data(self):
    if self.text_pair:
        prompt_files = sorted((self.root / 'prompt').glob('*.txt'))
        return [(p, Path(str(p).replace('prompt', 'target').replace('.txt', '.jpg'))) for p in prompt_files]
    else:
        return list((self.root / 'target').glob('*.jpg'))
  
  def __len__(self):
    return len(self.data)
  
  def __getitem__(self, idx):
    item = {}
    if self.text_pair:
        prompt_path, img_path = self.data[idx]
        prompt = prompt_path.read_text().strip()
        item['prompt'] = prompt
    else:
        img_path = self.data[idx]
  
    image = Image.open(img_path).convert("RGB")
    for transform in self.transforms:
        image = transform(image)
  
    item['image'] = image
  
    if self.return_format == 'tuple':
        return (item['prompt'], item['image']) if 'prompt' in item else (item['image'],)
    elif self.return_format == 'raw':
        return item['image']
    else:
        return item`,
    'image-segmentation': `    self.transforms = transforms if transforms else [
        transforms.Resize((256, 256)),
        transforms.ToTensor()
    ]
    self.mask_transform = transforms.Compose([
        transforms.Resize((256, 256), interpolation=Image.NEAREST),
        transforms.PILToTensor()
    ])

    self.image_paths = sorted((self.root / 'images').glob('*.jpg'))
    self.mask_paths = [Path(str(p).replace('images', 'masks').replace('.jpg', '.png')) for p in self.image_paths]

def __len__(self):
    return len(self.image_paths)

def __getitem__(self, idx):
    image = Image.open(self.image_paths[idx]).convert("RGB")
    mask = Image.open(self.mask_paths[idx])

    for transform in self.transforms:
        image = transform(image)
    mask = self.mask_transform(mask)[0].long()

    if self.return_format == 'tuple':
        return image, mask
    elif self.return_format == 'raw':
        return image
    else:
        return {'image': image, 'mask': mask}`,
    'object-detection': `    self.data = list((self.root / 'images').glob('*.jpg'))
    self.label_map = label_map or self._infer_label_map()

def _infer_label_map(self):
    labels = set()
    for annotation in (self.root / 'labels').glob('*.json'):
        anns = json.loads(annotation.read_text())
        labels.update(ann['label'] for ann in anns)
    return {label: idx for idx, label in enumerate(sorted(labels))}

def __len__(self):
    return len(self.data)

def __getitem__(self, idx):
    img_path = self.data[idx]
    ann_path = Path(str(img_path).replace("images", "labels").replace(".jpg", ".json"))

    anns = json.loads(ann_path.read_text())
    boxes = torch.tensor([ann['bbox'] for ann in anns], dtype=torch.float32)
    labels = torch.tensor([self.label_map[ann['label']] for ann in anns], dtype=torch.int64)

    image = Image.open(img_path).convert("RGB")
    for transform in self.transforms:
        image = transform(image)

    target = {'boxes': boxes, 'labels': labels}

    if self.return_format == 'tuple':
        return image, target
    elif self.return_format == 'raw':
        return image
    else:
        return {'image': image, **target}`,
  },
  'text': {
    'classification': `def _infer_label_map(self):
    classes = sorted([d.name for d in self.root.iterdir() if d.is_dir()])
    return {cls:idx for idx,cls in enumerate(classes)}

def _load_data(self):
    return [(file.read_text(), self.label_map[cls.name])
            for cls in self.root.iterdir() if cls.is_dir()
            for file in cls.glob('*.txt')]

def __len__(self):
    return len(self.data)

def __getitem__(self, idx):
    text, label = self.data[idx]
    enc = self.tokenizer(text, truncation=True, padding="max_length",
                         max_length=self.max_length, return_tensors="pt")
    item = {'input_ids': enc['input_ids'].squeeze(0), 'attention_mask': enc['attention_mask'].squeeze(0), 'label':label}
    if self.return_format == 'tuple':
        return item['input_ids'], item['label']
    elif self.return_format == 'raw':
        return item['input_ids']
    else:
        return item`,
    'generation': `def _load_data(self):
    prompts = sorted((self.root/'prompt').glob('*.txt'))
    if self.text_pair:
        return [(p.read_text().strip(), Path(str(p).replace('prompt', 'target')).read_text().strip()) for p in prompts]
    return [(p.read_text().strip(), None) for p in prompts]

def __len__(self):
    return len(self.data)

def __getitem__(self, idx):
    prompt, target = self.data[idx]
    text_input = prompt if not target else prompt + self.tokenizer.eos_token + target
    enc = self.tokenizer(text_input, truncation=True, padding="max_length",
                         max_length=self.max_length, return_tensors="pt")
    item = {'input_ids': enc.input_ids.squeeze(0), 'attention_mask': enc.attention_mask.squeeze(0)}
    if target:
        item['target'] = target
    format_handlers = {
        'tuple': lambda x: (x['input_ids'], x.get('target')),
        'raw': lambda x: x['input_ids']
    }
    return format_handlers.get(self.return_format, lambda x:x)(item)`,
    'summarization': `def _load_data(self, src_folder, tgt_folder):
    src_paths = sorted((self.root/src_folder).glob('*.txt'))
    tgt_paths = [Path(str(p).replace(src_folder, tgt_folder)) for p in src_paths]
    return [(sp.read_text().strip(), tp.read_text().strip()) for sp,tp in zip(src_paths,tgt_paths)]

def __len__(self):
    return len(self.data)

def __getitem__(self, idx):
    src, tgt = self.data[idx]
    enc = self.tokenizer(src, truncation=True, padding="max_length",
                         max_length=self.max_length, return_tensors="pt")
    item = {'input_ids':enc.input_ids.squeeze(0), 'attention_mask':enc.attention_mask.squeeze(0), 'target':tgt}
    formats = {
        'tuple': lambda x:(x['input_ids'], x['target']),
        'raw': lambda x:x['input_ids']
    }
    return format_handlers.get(self.return_format, lambda x:x)(item)`,
    'translation': `def _load_data(self, src_folder, tgt_folder):
    src_paths = sorted((self.root/src_folder).glob('*.txt'))
    tgt_paths = [Path(str(p).replace(src_folder, tgt_folder)) for p in src_paths]
    return [(sp.read_text().strip(), tp.read_text().strip()) for sp,tp in zip(src_paths,tgt_paths)]

def __len__(self):
    return len(self.data)

def __getitem__(self, idx):
    src, tgt = self.data[idx]
    enc = self.tokenizer(src, truncation=True, padding="max_length",
                         max_length=self.max_length, return_tensors="pt")
    item = {'input_ids':enc.input_ids.squeeze(0), 'attention_mask':enc.attention_mask.squeeze(0), 'target':tgt}
    formats = {
        'tuple': lambda x:(x['input_ids'], x['target']),
        'raw': lambda x:x['input_ids']
    }
    return format_handlers.get(self.return_format, lambda x:x)(item)`
  },
  'audio': {
    'classification': `    self.sample_rate = 16000
    self.clip_samples = int(self.duration * self.sample_rate)
    
    if label_map is None:
        self.label_map = self._infer_label_map()
    else:
        self.label_map = label_map
        
    self.data = self._load_files()

def _infer_label_map(self):
    classes = sorted([d.name for d in self.root.iterdir() if d.is_dir()])
    return {cls: idx for idx, cls in enumerate(classes)}

def _load_files(self):
    data = []
    for cls in self.label_map:
        class_files = (self.root / cls).glob('*.wav')
        data.extend([(file, self.label_map[cls]) for file in class_files])
    return data

def __len__(self):
    return len(self.data)

def __getitem__(self, idx):
    path, label = self.data[idx]
    waveform, sr = torchaudio.load(path)
    
    # Resample if necessary
    if sr != self.sample_rate:
        waveform = torchaudio.functional.resample(waveform, sr, self.sample_rate)
    
    # Trim or pad waveform
    if waveform.shape[1] < self.clip_samples:
        waveform = torch.nn.functional.pad(waveform, (0, self.clip_samples - waveform.shape[1]))
    else:
        waveform = waveform[:, :self.clip_samples]
        
    # Apply custom transforms
    for transform in self.transforms:
        waveform = transform(waveform)

    if self.return_format == 'tuple':
        return waveform, label
    elif self.return_format == 'raw':
        return waveform
    else:
        return {'audio': waveform, 'label': label}`,
    'conversion': `    self.input_files = sorted((self.root / 'input').glob('*.wav'))

def __len__(self):
    return len(self.input_files)

def __getitem__(self, idx):
    input_path = self.input_files[idx]
    target_path = Path(str(input_path).replace('input', 'target'))

    input_waveform, sr = torchaudio.load(input_path)
    target_waveform, target_sr = torchaudio.load(target_path)

    if sr != self.sample_rate:
        input_waveform = torchaudio.functional.resample(input_waveform, sr, self.sample_rate)
    if target_sr != self.sample_rate:
        target_waveform = torchaudio.functional.resample(target_waveform, target_sr, self.sample_rate)

    input_waveform = self._fix_waveform_length(input_waveform)
    target_waveform = self._fix_waveform_length(target_waveform)
    
    for transform in self.transforms:
        input_waveform = transform(input_waveform)
        target_waveform = transform(target_waveform)

    if self.return_format == 'tuple':
        return input_waveform, target_waveform
    elif self.return_format == 'raw':
        return input_waveform
    else:
        return {'input': input_waveform, 'target': target_waveform}

def _fix_waveform_length(self, waveform):
    if waveform.shape[1] < self.clip_samples:
        return torch.nn.functional.pad(waveform, (0, self.clip_samples - waveform.shape[1]))
    else:
        return waveform[:, :self.clip_samples]`,
    'generation': `    self.sample_rate = 16000
    self.clip_samples = int(duration * self.sample_rate)

    self.data = self._load_data()

def _load_data(self):
    if self.audio_pair:
        prompt_files = sorted((self.root / "input").glob("*.wav"))
    elif self.text_pair:
        prompt_files = sorted((self.root / "text").glob("*.txt"))
    else:
        prompt_files = sorted((self.root / "prompt").glob("*.wav"))
    return prompt_files

def __len__(self):
    return len(self.data)

def _load_audio(self, path):
    waveform, sr = torchaudio.load(path)
    if sr != self.sample_rate:
        waveform = torchaudio.functional.resample(waveform, sr, self.sample_rate)
    if waveform.shape[1] < self.clip_samples:
        waveform = torch.nn.functional.pad(waveform, (0, self.clip_samples - waveform.shape[1]))
    else:
        waveform = waveform[:, :self.clip_samples]

    for transform in self.transforms:
        waveform = transform(waveform)
    return waveform

def __getitem__(self, idx):
    item = {}
    if self.audio_pair:
        prompt_path = self.data[idx]
        target_path = Path(str(prompt_path).replace("input", "target"))
        if self.include_prompt:
            item["prompt"] = self._load_audio(prompt_path)
        if self.include_target:
            item["target"] = self._load_audio(target_path)

    elif self.text_pair:
        prompt_path = self.data[idx]
        target_path = Path(str(prompt_path).replace("text", "target").replace('.txt', '.wav'))
        if self.include_prompt:
            item["prompt"] = prompt_path.read_text().strip()
        if self.include_target:
            item["target"] = self._load_audio(target_path)

    else:  # Default audio prompt only
        audio_path = self.data[idx]
        if self.include_prompt:
            item["prompt"] = self._load_audio(audio_path)

    if self.return_format == 'tuple':
        # Return tuple with ordering: (prompt, target) if target is included.
        output = tuple(item[key] for key in ('prompt', 'target') if key in item)
        return output[0] if len(output) == 1 else output
    elif self.return_format == 'raw':
        return item.get('prompt', None)
    else:
        return item`,
    'recognition': `    self.sample_rate = 16000
    self.clip_samples = int(self.duration * self.sample_rate)
    
    if label_map is None:
        self.label_map = self._infer_label_map()
    else:
        self.label_map = label_map
        
    self.data = self._load_files()

def _infer_label_map(self):
    classes = sorted([d.name for d in self.root.iterdir() if d.is_dir()])
    return {cls: idx for idx, cls in enumerate(classes)}

def _load_files(self):
    data = []
    for cls in self.label_map:
        class_files = (self.root / cls).glob('*.wav')
        data.extend([(file, self.label_map[cls]) for file in class_files])
    return data

def __len__(self):
    return len(self.data)

def __getitem__(self, idx):
    path, label = self.data[idx]
    waveform, sr = torchaudio.load(path)
    
    # Resample if necessary
    if sr != self.sample_rate:
        waveform = torchaudio.functional.resample(waveform, sr, self.sample_rate)
    
    # Trim or pad waveform
    if waveform.shape[1] < self.clip_samples:
        waveform = torch.nn.functional.pad(waveform, (0, self.clip_samples - waveform.shape[1]))
    else:
        waveform = waveform[:, :self.clip_samples]
        
    # Apply custom transforms
    for transform in self.transforms:
        waveform = transform(waveform)

    if self.return_format == 'tuple':
        return waveform, label
    elif self.return_format == 'raw':
        return waveform
    else:
        return {'audio': waveform, 'label': label}`,
  }
}