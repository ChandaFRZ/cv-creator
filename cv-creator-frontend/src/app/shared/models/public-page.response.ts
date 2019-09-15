import { ExperienceEntity } from 'src/app/store/experience/experience.entity';
import { HobbyEntity } from 'src/app/store/hobby/hobby.entity';
import { AddressEntity } from 'src/app/store/address/address.entity';
import { ProgressionEntity } from 'src/app/store/progression/progression.entity';
import { KnowledgeEntity } from 'src/app/store/knowledge/knowlege.entity';
import { ImageEntity } from 'src/app/store/image/image.entity';

export interface IPublicPageResponse {
    address: AddressEntity;
    progressions: ProgressionEntity[];
    experiences: ExperienceEntity[];
    knowledges: KnowledgeEntity[];
    hobbies: HobbyEntity[];
    images: ImageEntity[];
    lastModifiedDate: Date;
}
