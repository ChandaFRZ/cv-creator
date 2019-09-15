import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { SubSink } from 'subsink';
import { ProgressionService } from './progression.service';
import { animationStandardEnterLeave } from 'src/app/shared/animations/animations';
import { EventEmitData } from 'src/app/shared/interfaces/event-emit-data.interface';
import { ProgressionEntity, cloneProgressionEntity } from 'src/app/store/progression/progression.entity';
import * as ProgressionActions from './../../store/progression/progression.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-progression-box',
  templateUrl: './progression-box.component.html',
  styleUrls: ['./progression-box.component.scss'],
  animations: [animationStandardEnterLeave()],
})
export class ProgressionBoxComponent implements OnInit, OnDestroy {
  @Input() dragDisabled = false;
  @Input() editDisabled = false;

  readonly dropListData = ['prog-dropList1', 'prog-dropList2'];
  readonly dropListConnectors = ['prog-dropList2', 'prog-dropList1'];
  readonly headers = ['EDUCATION', 'CAREER PROGRESSION'];

  entities: ProgressionEntity[];
  entityCols: ProgressionEntity[][];
  isLoading$: Observable<boolean>;

  maxCols: number;
  maxRows: number;

  private subs = new SubSink();

  constructor(private store: Store<AppState>, private progressionService: ProgressionService) {
  }

  ngOnInit() {
    this.isLoading$ = this.progressionService.loading$;
    this.isLoading$.subscribe(result => console.log(result));

    this.subs.add(this.progressionService.entities$.subscribe(data => {
      this.entityCols = [];
      this.entities = data
        .map(entity => Object.assign({}, entity))
        .sort((a, b) => a.position > b.position ? 1 : a.position === b.position ? 0 : -1);
      this.makeCols();
      this.updateNumberOfGroups();
    }));

    this.subs.add(this.store.select(state => state.progressionState).subscribe(
      data => {
        this.maxCols = data.maxCols;
        this.maxRows = data.maxRows;
      }
    ));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  trackByFn(index): number {
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

    const newEntites: ProgressionEntity[] = this.prepareEntitesForSend();
    this.store.dispatch(ProgressionActions.updateManyRequest({ entities: newEntites }));
  }

  onBlur(): void {
    this.store.dispatch(ProgressionActions.selectEntity({ entityId: -1 }));
  }

  onFocus(data: EventEmitData): void {
    setTimeout(() => {
      this.store.dispatch(ProgressionActions.selectEntity({ entityId: data.id }));
    }, 1000);
  }

  onAddEntity(col: ProgressionEntity[], index: number): void {
    const newEntity = new ProgressionEntity();
    newEntity.type = index;
    newEntity.position = col.length;
    this.progressionService.add(newEntity);
  }

  onAddCol(): void {
    const newEntity = new ProgressionEntity();
    newEntity.type = this.entityCols.length;
    newEntity.position = 0;
    this.progressionService.add(newEntity);
  }

  onSubmitYear(data: EventEmitData): void {
    const newEntity: ProgressionEntity = this.entities.find(entity => entity.id === data.id);
    newEntity.year = data.content.toString();
    this.progressionService.update(newEntity);
  }

  onSubmitHeader(data: EventEmitData): void {
    const newEntity: ProgressionEntity = this.entities.find(entity => entity.id === data.id);
    newEntity.header = data.content.toString();
    this.progressionService.update(newEntity);
  }

  onSubmitDescription(data: EventEmitData): void {
    const newEntity: ProgressionEntity = this.entities.find(entity => entity.id === data.id);
    newEntity.description = data.content.toString();
    this.progressionService.update(newEntity);
  }

  onDelete(data: EventEmitData): void {
    this.progressionService.delete(data.id);

    setTimeout(() => {
      const newEntites: ProgressionEntity[] = this.prepareEntitesForSend();
      if (newEntites.length <= 0) {
        return;
      }
      this.store.dispatch(ProgressionActions.updateManyRequest({ entities: newEntites }));
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
    const newEntites: ProgressionEntity[] = [];
    const newCols = this.entityCols.concat();

    newCols.forEach((col, key) => {
      if (col.length <= 0) {
        newCols.splice(key, 1);
      }
    });

    newCols.forEach((col, key) => {
      let idx = 0;
      col.forEach(entity => {
        const newEntity = cloneProgressionEntity(entity);
        newEntity.position = idx++;
        newEntity.type = key;
        newEntites.push(newEntity);
      });
    });

    return newEntites;
  }
}
