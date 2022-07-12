import { CommonConstants } from '../constants/CommonConstants';

export const getResourceKey = (actionOrConsequenceKey: string) => {
    return `${actionOrConsequenceKey}${CommonConstants.CONSEQUENCE_KEY_RESOURCE_SUFFIX}`.replace(
        /\./g,
        '_'
    );
};

export const getI18nKey = (actionOrConsequenceKey: string) => {
    return `${actionOrConsequenceKey}${CommonConstants.CONSEQUENCE_KEY_I18N_SUFFIX}`.replace(
        /\./g,
        '_'
    );
};
