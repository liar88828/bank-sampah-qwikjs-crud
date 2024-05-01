import { MaterialWork } from "./material";
import { type Constructor } from "~/type/global/global.type";

// export function PenyerahanWork<T extends Constructor<{}>>(SuperClass: T) {
//   return class extends SuperClass {
export class PenyerahanWork extends MaterialWork {}

export function ExportPenyerahanWork<T extends Constructor<{}>>(SuperClass: T) {
  return class extends SuperClass {};
}
