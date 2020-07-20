export default (type: string, ...argNames: any[]) => {
    return (...args: any[]) => {
        let action: any = { type };
        argNames.forEach((arg, index) => action[arg] = args[index]);
        return action;
    };
};
