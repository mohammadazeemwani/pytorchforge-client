import React from 'react';
import CodeMirror, { ViewUpdate } from '@uiw/react-codemirror';
import {python} from '@codemirror/lang-python'
import { cn } from '~/utils/general';
import type { UseFormReturn } from 'react-hook-form';
import type { PipelineDL } from '~/types/pipelineDL';
import { getDefaultDataLoadingCode } from '~/helpers/pipelineDL';
import { monokai } from '@uiw/codemirror-theme-monokai';
import { gruvboxLight } from '@uiw/codemirror-theme-gruvbox-dark'
import { useTheme } from '~/providers/Theme.provider';


type DataLoadingEditorProps = {
  form: UseFormReturn<PipelineDL>,
  className?: string
}

export function DataLoadingEditor({ form, className }: DataLoadingEditorProps) {
  const mainTask = form.watch('mainTask');
  const subTask = form.watch('subTask')
  const code = React.useMemo(() => {
    const formValue = form.getValues('dataLoading')
    if (!formValue) {
      const defaultCode = getDefaultDataLoadingCode(mainTask, subTask)
      form.setValue('dataLoading', defaultCode)
      return defaultCode;
    } else {
      return formValue
    }

  }, [mainTask, subTask])
  const { theme } = useTheme()
  const editorTheme = theme === 'dark' ? monokai : gruvboxLight
  
  const [value, setValue] = React.useState(code);
  const onChange = React.useCallback((val: string, viewUpdate: ViewUpdate) => {
    // console.log('val:', val);
    form.setValue('dataLoading', val)
    setValue(val);
  }, []);

  /**
   * for styleing of editor, we are chainging .cm-editor and .cm-scroller classes in app.css
   */
  
  return (
    <CodeMirror 
      value={value}
      theme={editorTheme}
      extensions={[
        python(),
      ]} 
      onChange={onChange}
      className={cn(
        '',
        className
      )}
    />
  );
}