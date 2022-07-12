import { ConsequenceImplementation } from '@mykaarma/actions-framework/src/types/ConsequenceImplementation';

const dummyActionConsequence: ConsequenceImplementation = async (
    actor,
    resource
) => {
    console.log('this is the consequence', actor, resource);
    return {
        success: true,
    };
};

export default dummyActionConsequence;
