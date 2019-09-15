import { EntityMetadataMap } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
    Hobby: {},
    Experience: {},
    Knowledge: {},
    Progression: {},
    Image: {},
};

const pluralNames = {
    Hobby: 'Hobbies',
    Experience: 'Experiences',
    Knowledge: 'Knowledges',
    Progression: 'Progressions',
    Image: 'Images',
};

export const entityConfig = {
    entityMetadata,
    pluralNames
};
