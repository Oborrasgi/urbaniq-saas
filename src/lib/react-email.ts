import { render } from "@react-email/components";
import React, { createElement } from "react";

/**  ==============================================================================================
 * Renders a React email component to HTML
 *
 * @template Props - The type of props expected by the component
 * @param {React.FunctionComponent<Props> | React.ComponentClass<Props>} Component - The React component to render
 * @param {Props} props The props to pass to the component
 * @returns A Promise that resolves to the rendered HTML
 *
 * @example
 * ```typescript
 * const html = await renderEmail(WelcomeEmail, { userName: "John" });
 * ```
 *  ==============================================================================================
 */
export async function renderEmail<Props extends object>(
  Component: React.FunctionComponent<Props> | React.ComponentClass<Props>,
  props: Props
): Promise<string> {
  return await render(createElement(Component, props));
}
