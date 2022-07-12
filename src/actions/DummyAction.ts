import { ActionRule } from '@mykaarma/actions-framework/src/types/ActionRule';
import { ImplementationType } from '@mykaarma/actions-framework/src/types/Consequence';
import { MkSessionDTO } from '@mykaarma/actions-framework/src/types/mkSession/MkSessionDTO';
import { CommonConstants } from '../constants/CommonConstants';
import { getI18nKey, getResourceKey } from '../utils/Utils';

const ACTION_KEY = 'action.key';

const CONSEQUENCE_KEYS = {
    dummyConsequence: 'action.consequence.key',
};

export const dummyAction: ActionRule = {
    validatedConsequenceKeys: async (location, actor, resource, props) => {
        console.log(
            'validating whether to show dummyAction',
            location,
            actor,
            resource,
            props
        );
        const mkSession = props?.mkSession as MkSessionDTO;
        if (!mkSession) {
            console.warn('could not find mkSession', props);
            return [];
        }
        // validate location, actor, resouce for the action and return the consequence keys
        return [CONSEQUENCE_KEYS.dummyConsequence];
    },
    action: {
        key: ACTION_KEY,
        i18nDefaultDisplayName: 'Action Name',
        iconUrl: 'https://static.mykaarma.com/res/lib/icons/md/person.svg',
        i18nKey: getI18nKey(ACTION_KEY),
        resourceKey: getResourceKey(ACTION_KEY),
    },
    consequences: [
        {
            key: CONSEQUENCE_KEYS.dummyConsequence,
            i18nDefaultDisplayName: 'Consequence Name',
            iconUrl: 'https://static.mykaarma.com/res/lib/icons/md/person.svg',
            i18nKey: getI18nKey(CONSEQUENCE_KEYS.dummyConsequence),
            resourceKey: getResourceKey(CONSEQUENCE_KEYS.dummyConsequence),
            implementation: {
                type: ImplementationType.JS_MODULE,
                identifier: `${CommonConstants.BASE_URL}ViewCustomerInDealerAppCustomerTab.es.js`,
            },
        },
    ],
};
