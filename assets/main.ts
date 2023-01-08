import { createComponent as _$createComponent } from "solid-js/web";
import { ssr as _$ssr } from "solid-js/web";
import { escape as _$escape } from "solid-js/web";
import { ssrHydrationKey as _$ssrHydrationKey } from "solid-js/web";
import { render } from "solid-js/web";
import { createSignal } from "solid-js";

const _tmpl$ = ["<button", " type=\"button\">", "</button>"];
function Counter() {
  const [count, setCount] = createSignal(1);
  const increment = () => setCount(count() + 1);
  // @ts-ignore
  return _$ssr(_tmpl$, _$ssrHydrationKey(), _$escape(count()));
}
// @ts-ignore
render(() => _$createComponent(Counter, {}), document.getElementById("app"));