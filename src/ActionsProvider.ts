import { Action } from '@mykaarma/actions-framework/src/types/Action';
import { ActionRule } from '@mykaarma/actions-framework/src/types/ActionRule';
import { ActionsProvider } from '@mykaarma/actions-framework/src/types/ActionsProvider';
import { Actor } from '@mykaarma/actions-framework/src/types/Actor';
import { Location } from '@mykaarma/actions-framework/src/types/Location';
import { MkSessionDTO } from '@mykaarma/actions-framework/src/types/mkSession/MkSessionDTO';
import { Resource } from '@mykaarma/actions-framework/src/types/Resource';

// uncomment below line if you want to test
// import { dummyAction } from './actions/DummyAction';
const actionRules: ActionRule[] = [
    // dummyAction
];

const communicationsActionsProvider: ActionsProvider = {
    fetchActions: async (mkSession, location, actor, resource) => {
        const results = await Promise.allSettled(
            actionRules.map((rule) =>
                fetchActionFromRule(rule, mkSession, location, actor, resource)
            )
        );
        const successResults = results.filter(
            (result) =>
                result.status === 'fulfilled' && result.value !== undefined
        ) as PromiseFulfilledResult<Action>[];
        const actions = successResults.map((result) => result.value);
        return actions;
    },
};

const fetchActionFromRule = async (
    rule: ActionRule,
    mkSession: MkSessionDTO,
    location: Location,
    actor: Actor,
    resource: Resource
): Promise<Action | undefined> => {
    try {
        const props = { mkSession };
        const validatedConsequencesKeys = await rule.validatedConsequenceKeys(
            location,
            actor,
            resource,
            props
        );
        if (validatedConsequencesKeys?.length) {
            const validatedConsequences = rule.consequences.filter(
                (consequence) =>
                    validatedConsequencesKeys.filter(
                        (consequenceKey) => consequenceKey === consequence.key
                    ).length !== 0
            );
            if (validatedConsequences.length) {
                return {
                    ...rule.action,
                    consequences: validatedConsequences,
                };
            }
        }
    } catch (e) {
        console.error(
            'error while validating rule',
            rule,
            location,
            actor,
            resource,
            e
        );
        throw e;
    }
    return undefined;
};

export default communicationsActionsProvider;
