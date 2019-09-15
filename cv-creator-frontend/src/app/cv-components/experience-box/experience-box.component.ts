import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { ExperienceService } from './experience.service';
import { SubSink } from 'subsink';
import { ExperienceEntity, cloneExperienceEntity } from 'src/app/store/experience/experience.entity';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { animationStandardEnterLeave } from 'src/app/shared/animations/animations';
import { EventEmitData } from 'src/app/shared/interfaces/event-emit-data.interface';
import * as ExperienceActions from './../../store/experience/experience.actions';

@Component({
  selector: 'app-experience-box',
  templateUrl: './experience-box.component.html',
  styleUrls: ['./experience-box.component.scss'],
  animations: [animationStandardEnterLeave()],
})
export class ExperienceBoxComponent implements OnInit, OnDestroy {
  @Input() dragDisabled = false;
  @Input() editDisabled = false;

  readonly dropListData = ['prog-dropList1', 'prog-dropList2'];
  readonly dropListConnectors = ['prog-dropList2', 'prog-dropList1'];
  readonly headers = [''];

  entities: ExperienceEntity[];
  entityCols: ExperienceEntity[][];

  maxCols: number;
  maxRows: number;

  private subs = new SubSink();

  constructor(private store: Store<AppState>, private experienceService: ExperienceService) {
  }

  ngOnInit() {
    this.subs.add(this.experienceService.entities$.subscribe(data => {
      this.entityCols = [];
      this.entities = data
        .map(entity => Object.assign({}, entity))
        .sort((a, b) => a.position > b.position ? 1 : a.position === b.position ? 0 : -1);
      this.makeCols();
      this.updateNumberOfGroups();
    }));

    this.subs.add(this.store.select(state => state.experienceState).subscribe(
      data => {
        this.maxCols = data.maxCols;
        this.maxRows = data.maxRows;
      }
    ));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  trackByFn(index, item) {
    return index;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

    const newEntites: ExperienceEntity[] = this.prepareEntitesForSend();
    this.store.dispatch(ExperienceActions.updateManyRequest({ entities: this.entities }));
  }

  onBlur(data: EventEmitData): void {
    this.store.dispatch(ExperienceActions.selectEntity({ entityId: -1 }));
  }

  onFocus(data: EventEmitData): void {
    setTimeout(() => {
      this.store.dispatch(ExperienceActions.selectEntity({ entityId: data.id }));
    }, 200);
  }

  onAddEntity(type: number): void {
    const newEntity = new ExperienceEntity();
    newEntity.position = this.entities.length + 1;
    newEntity.type = 0;
    this.experienceService.add(newEntity);
  }

  onSubmitHeader(data: EventEmitData): void {
    const newEntity: ExperienceEntity = this.entities.find(entity => entity.id === data.id);
    newEntity.header = data.content.toString();
    this.experienceService.update(newEntity);
  }

  onSubmitDescription(data: EventEmitData): void {
    const newEntity: ExperienceEntity = this.entities.find(entity => entity.id === data.id);
    newEntity.description = data.content.toString();
    this.experienceService.update(newEntity);
  }

  onDelete(data: EventEmitData): void {
    this.experienceService.delete(data.id);

    setTimeout(() => {
      const newEntites: ExperienceEntity[] = this.prepareEntitesForSend();
      if (newEntites.length <= 0) {
        return;
      }
      this.store.dispatch(ExperienceActions.updateManyRequest({ entities: newEntites }));
    }, 100);
  }

  private makeCols() {
    this.entities.map(entity => {
      const currentCol = entity.type;
      if (this.entityCols[currentCol] === undefined) {
        this.entityCols[currentCol] = [];
      }
      this.entityCols[currentCol].push(entity);
      return entity;
    });
  }

  private updateNumberOfGroups(): void {
    let numberOfGroups = 0;
    this.entities.forEach(entity => {
      if (numberOfGroups < entity.type) {
        numberOfGroups = entity.type;
      }
    });
  }

  private prepareEntitesForSend() {
    const newEntites: ExperienceEntity[] = [];
    const newCols = this.entityCols.concat();

    newCols.forEach((col, key) => {
      if (col.length <= 0) {
        newCols.splice(key, 1);
      }
    });

    newCols.forEach((col, key) => {
      let idx = 0;
      col.forEach(entity => {
        const newEntity = cloneExperienceEntity(entity);
        newEntity.position = idx++;
        newEntity.type = key;
        newEntites.push(newEntity);
      });
    });

    return newEntites;
  }
}
