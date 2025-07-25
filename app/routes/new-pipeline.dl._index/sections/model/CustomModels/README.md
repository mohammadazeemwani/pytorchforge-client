This directory contains the sections and fields for configuring custom models.

**Key Changes:**

The code in this directory has been modified to support dynamic indexing of custom models. This allows for multiple custom models to be configured within the pipeline.

**How to Modify a Custom Model Parameter Section:**

When modifying a custom model parameter section (e.g., `Conv1d`, `AvgPool2d`), follow these steps:

1.  **Section File (`*.section.tsx`):**
    *   **Import `CustomModelsFieldProps`:** Ensure the section file imports the `CustomModelsFieldProps` type from `../../customModels-section.mapper`.
    *   **Add `index` prop:** Update the component signature to include the `index` prop:

        ```typescript
        export function MySection({
          className,
          form,
          index,
          ...delegated
        }: CustomModelsFieldProps) {
        ```
    *   **Update `getFieldState` and `resetField`:** Modify the `getFieldState` and `resetField` calls to use dynamic indexing:

        ```typescript
        const { error } = form.getFieldState(`customModels.${index}`, form.formState);

        const resetSection = React.useCallback(() => {
          form.resetField(`customModels.${index}`);
          setResetKey(k => k+1);
        }, [form, index]);
        ```
    *   **Pass `index` to Field Components:** Ensure that the `index` prop is passed to all child `*Field` components:

        ```typescript
        <MyField form={form} index={index} />
        ```

2.  **Field Files (`*.field.tsx`):**
    *   **Add `index` to Props:** Add `index: number` to the props type definition:

        ```typescript
        type MyFieldProps = {
          form: UseFormReturn<PipelineDL>,
          index: number
        } & React.ComponentProps<"div">;
        ```
    *   **Destructure `index`:** Destructure the `index` prop in the component signature:

        ```typescript
        export function MyField({
          className,
          form,
          index,
          ...delegated
        }: MyFieldProps) {
        ```
    *   **Update `name` Prop:** Update the `name` prop in the `FormField` component to use dynamic indexing:

        ```typescript
        <FormField
          control={form.control}
          name={`customModels.${index}.props.my_field_name`}
          render={({ field }) => (
            // ...
          )}
        />
        ```

**General Notes:**

*   Always use the provided `index` prop to dynamically generate field names and access form state.
*   Ensure that all child components within a section receive the `index` prop.
*   This pattern ensures that each custom model instance has its own isolated configuration.
