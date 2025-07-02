export type Losses1 = {
  'RegressionLosses': 
  | 'torch.nn.MSELoss(reduction)'
  | 'torch.nn.L1Loss(reduction)'
  | 'torch.nn.SmoothL1Loss(reduction, beta)'
  | 'torch.nn.HuberLoss(reduction, delta)',

  'Segmentation Losses': 
  | 'torch.nn.functional.binary_cross_entropy_with_logits (with dice loss implementation)'
  | 'torch.nn.functional.cross_entropy (with focal loss implementation)',

  'Classification Losses': 
  | 'torch.nn.CrossEntropyLoss(weight, reduction)'
  | 'torch.nn.BCELoss(weight, reduction)'
  | 'torch.nn.BCEWithLogitsLoss(weight, reduction, pos_weight)'
  | 'torch.nn.NLLLoss(weight, reduction)'
  | 'torch.nn.MarginRankingLoss(margin, reduction)',

  'Adversarial Losses': 
  | 'Minimax GAN Loss'
  | 'Wasserstein Loss'
  | 'Least Squares Loss',

  'Embedding Losses': 
  | 'torch.nn.TripletMarginLoss(margin, p, eps, swap, reduction)'
  | 'torch.nn.CosineEmbeddingLoss(margin, reduction)'
  | 'torch.nn.MultiMarginLoss(p, margin, weight, reduction)',

  'Customizable Losses': 
  | 'Custom Loss Function (with code template)'
}

export type Optimizers1 = {
  'Gradient Descent-Based': 
  | 'torch.optim.SGD(params, lr, momentum, weight_decay, nesterov)',

  'Second-Order Methods': 
  | 'torch.optim.LBFGS(params, lr, max_iter, max_eval, tolerance_grad, tolerance_change)',

  'Other Optimizers': 
  | 'torch.optim.SparseAdam(params, lr, betas, eps)'
  | 'torch.optim.ASGD(params, lr, lambd, alpha, t0, weight_decay)',

  'Adaptive Methods': 
  | 'torch.optim.Adam(params, lr, betas, eps, weight_decay, amsgrad)'
  | 'torch.optim.AdamW(params, lr, betas, eps, weight_decay)'
  | 'torch.optim.Adamax(params, lr, betas, eps, weight_decay)'
  | 'torch.optim.RMSprop(params, lr, alpha, eps, weight_decay, momentum)'
  | 'torch.optim.Adagrad(params, lr, lr_decay, weight_decay, eps)'
  | 'torch.optim.Adadelta(params, lr, rho, eps, weight_decay)',

  'Regularization-Based': 
  | 'torch.optim.NAdam(params, lr, betas, eps, weight_decay, momentum_decay)'
  | 'torch.optim.RAdam(params, lr, betas, eps, weight_decay)'
}
