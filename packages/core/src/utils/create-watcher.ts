import { ComponentWrapperInstanceInterface } from "../interfaces/component-wrapper-instance.interface";
import { doCreateWatcher } from "./do-create-watcher";

export function createWatcher(
    valueCaller: () => any,
    element: HTMLElement,
    iComponentWrapper: ComponentWrapperInstanceInterface,
    updateCallback: (value: any) => void
) {
    doCreateWatcher(valueCaller, element, iComponentWrapper, updateCallback, false);
}