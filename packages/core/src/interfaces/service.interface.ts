export interface ServiceInterface {
    new(...args: any[]): any;
    singleton?: boolean;
    config?: any;
    service?: ServiceInterface;
}
