import { Component, OnInit, OnDestroy } from '@angular/core';
import { animationStandardEnterLeave } from 'src/app/shared/animations/animations';
import { IAddressEntity } from 'src/app/store/address/address.entity';
import { ExperienceEntity } from 'src/app/store/experience/experience.entity';
import { IProgressionEntity } from 'src/app/store/progression/progression.entity';
import { IKnowledgeEntity } from 'src/app/store/knowledge/knowlege.entity';
import { IHobbyEntity } from 'src/app/store/hobby/hobby.entity';
import { ProgressBarService } from 'src/app/core/components/progress-bar/progress-bar.service';
import { ExperienceService } from 'src/app/cv-components/experience-box/experience.service';
import { HobbyService } from 'src/app/cv-components/hobby-box/hobby.service';
import { ProgressionService } from 'src/app/cv-components/progression-box/progression.service';
import { KnowledgeService } from 'src/app/cv-components/knowledge-box/knowledge.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ImageService } from 'src/app/cv-components/image-box/image.service';
import { ImageEntity, ImageType } from 'src/app/store/image/image.entity';
import { SubSink } from 'subsink';
import { selectLastModifiedDate } from 'src/app/store/auth/auth.selectors';
import * as SharedActions from '../../store/shared/shared.actions';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss'],
  animations: [animationStandardEnterLeave()],
})
export class PublicComponent implements OnInit, OnDestroy {

  isLoggedIn = false;
  isLoading: boolean;
  itemsLoaded = 0;
  maxItems = 5;

  address: IAddressEntity;
  experiences: ExperienceEntity[][];
  progressions: IProgressionEntity[][];
  knowledges: IKnowledgeEntity[][];
  hobbies: IHobbyEntity[][];

  userImage: ImageEntity;
  logoImage: ImageEntity;

  modifiedDate = this.store.select(selectLastModifiedDate);

  private subs = new SubSink();

  readonly progressionHeaders = ['EDUCATION',
    'CAREER PROGRESSION'];
  readonly experienceHeaders = [];
  readonly knowledgeHeaders = ['Languages',
    'Frameworks',
    'Knowledge',
    'IDE'];
  readonly hobbyHeaders = ['Languages',
    'Frameworks',
    'Knowledge',
    'IDE'];

  constructor(public progressionBarService: ProgressBarService,
              private experienceService: ExperienceService,
              private hobbyService: HobbyService,
              private progressionService: ProgressionService,
              private knowledgeService: KnowledgeService,
              private imageService: ImageService,
              private store: Store<AppState>,
              private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      if (params.pageName != null) {
        this.store.dispatch(SharedActions.publicPageRequest({
          pageName: params.pageName
        }));
      }
    });

    this.isLoggedIn = this.authService.isLoggedIn;
    this.subscriptions();
    this.progressionBarService.updateStateEnabled(true);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  trackByFn(index): number {
    return index;
  }

  subscriptions(): void {
    // this.images$ = this.store.select(state => state.imageState.images);
    this.subs.add(this.imageService.entities$.subscribe(
      data => {
        this.userImage = data.find(image => image.imageType === ImageType.user && !image.thumbnail);
        this.logoImage = data.find(image => image.imageType === ImageType.logo && !image.thumbnail);
      }
    ));

    this.subs.add(this.store.select(state => state.addresState.address).subscribe(address => {
      this.address = address;
      this.isLoading = false;
      this.progressionBarService.updateStateEnabled(false);
    }));

    this.subs.add(this.experienceService.entities$.subscribe(data => {
      this.experiences = this.makeCols(data
        .map(entity => Object.assign({}, entity))
        .sort((a, b) => a.position > b.position ? 1 : a.position === b.position ? 0 : -1));
    }));

    this.subs.add(this.knowledgeService.entities$.subscribe(data => {
      this.knowledges = this.makeCols(data
        .map(entity => Object.assign({}, entity))
        .sort((a, b) => a.position > b.position ? 1 : a.position === b.position ? 0 : -1));
    }));

    this.subs.add(this.progressionService.entities$.subscribe(data => {
      this.progressions = this.makeCols(data
        .map(entity => Object.assign({}, entity))
        .sort((a, b) => a.position > b.position ? 1 : a.position === b.position ? 0 : -1));
    }));

    this.subs.add(this.hobbyService.entities$.subscribe(data => {
      this.hobbies = this.makeCols(data
        .map(entity => Object.assign({}, entity))
        .sort((a, b) => a.position > b.position ? 1 : a.position === b.position ? 0 : -1));
    }));
  }

  private makeCols(entities: any[]): any[][] {
    const entityCols: any[][] = [];

    entities.map(entity => {
      const currentCol = entity.type;

      if (entityCols[currentCol] === undefined) {
        entityCols[currentCol] = [];
      }

      entityCols[currentCol].push(entity);
      return entity;
    }

    );
    return entityCols;
  }

  private updateProgressBar() {
    this.itemsLoaded++;
    this.progressionBarService.updateProgressionValue(100 / this.maxItems * this.itemsLoaded);
  }
}
