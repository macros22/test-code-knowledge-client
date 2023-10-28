import cloneDeep from 'lodash/cloneDeep';
// export const deepCopy = (a: any) => JSON.parse(JSON.stringify(a));

export const deepCopy = a => cloneDeep(a);
