import 'virtual:uno.css'
import type { App } from 'vue';
export default function onBeforeMountApp (app: App) {
  console.log(app);
}