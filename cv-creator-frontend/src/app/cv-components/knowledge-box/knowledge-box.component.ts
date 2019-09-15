import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AppState } from 'src/app/store/reducers';
import { KnowledgeService } from './knowledge.service';
import { SubSink } from 'subsink';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { EventEmitData } from 'src/app/shared/interfaces/event-emit-data.interface';
import { animationStandardEnterLeave } from 'src/app/shared/animations/animations';
import { KnowledgeEntity, cloneKnowledgeEntity } from 'src/app/store/knowledge/knowlege.entity';
import * as KnowledgeActions from './../../store/knowledge/knowledge.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-knowledge-box',
  templateUrl: './knowledge-box.component.html',
  styleUrls: ['./knowledge-box.component.scss'],
  animations: [animationStandardEnterLeave()],
})
export class KnowledgeBoxComponent implements OnInit, OnDestroy {
  @Input() dragDisabled = false;
  @Input() editDisabled = false;

  readonly dropListData = ['know-dropList1', 'know-dropList2', 'know-dropList3', 'know-dropList4'];
  readonly dropListConnectors = [
    'know-dropList2 know-dropList3 know-dropList4',
    'know-dropList1 know-dropList3 know-dropList4',
    'know-dropList1 know-dropList2 know-dropList4',
    'know-dropList1 know-dropList2 know-dropList3'
  ];

  readonly headers = ['Languages', 'Frameworks', 'Knowledge', 'IDE'];

  entities: KnowledgeEntity[];
  entiyCols: KnowledgeEntity[][];
  isLoading$: Observable<boolean>;

  maxCols: number;
  maxRows: number;

  private subs = new SubSink();

  constructor(private store: Store<AppState>, private knowledgeService: KnowledgeService) {
  }

  ngOnInit() {
    this.isLoading$ = this.knowledgeService.loading$;

    this.subs.add(this.knowledgeService.entities$.subscribe(data => {
      this.entiyCols = [];
      this.entities = data
        .map(entity => Object.assign({}, entity))
        .sort((a, b) => a.position > b.position ? 1 : a.position === b.position ? 0 : -1);
      this.makeCols();
      this.updateNumberOfGroups();
    }));

    this.subs.add(this.store.select(state => state.knowledgeState).subscribe(
      data => {
        this.maxCols = data.maxCols;
        this.maxRows = data.maxRows;
      }
    ));

    // obseolete, only for reference
    // this.store.dispatch(KnowledgeActions.loadRequest());
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  trackByFn(index) {
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
    const newEntites: KnowledgeEntity[] = this.prepareEntitesForSend();
    this.store.dispatch(KnowledgeActions.updateManyRequest({ entities: newEntites }));
  }

  onBlur(): void {
    this.store.dispatch(KnowledgeActions.selectEntity({ entityId: -1 }));
  }

  onFocus(data: EventEmitData): void {
    setTimeout(() => {
      this.store.dispatch(KnowledgeActions.selectEntity({ entityId: data.id }));
    }, 200);
  }

  onAddEntity(col: KnowledgeEntity[], index: number): void {
    const newEntity = new KnowledgeEntity();
    newEntity.type = index;
    newEntity.position = col.length;
    this.knowledgeService.add(newEntity);
  }

  onAddCol(): void {
    const newEntity = new KnowledgeEntity();
    newEntity.type = this.entiyCols.length;
    newEntity.position = 0;
    this.knowledgeService.add(newEntity);
  }

  onSubmit(data: EventEmitData): void {
    const newEntity: KnowledgeEntity = this.entities.find(entity => entity.id === data.id);
    newEntity.content = data.content.toString();
    this.knowledgeService.update(newEntity);
  }

  onDelete(data: EventEmitData): void {
    this.knowledgeService.delete(data.id);

    setTimeout(() => {
      const newEntites: KnowledgeEntity[] = this.prepareEntitesForSend();
      if (newEntites.length <= 0) {
        return;
      }
      this.store.dispatch(KnowledgeActions.updateManyRequest({ entities: newEntites }));
    }, 100);
  }

  onChange(): void {
    // console.log('change');
  }

  onUpdate(): void {
    // console.log('update');
  }

  private makeCols() {
    this.entities.map(entity => {
      const currentCol = entity.type;
      if (this.entiyCols[currentCol] === undefined) {
        this.entiyCols[currentCol] = [];
      }
      this.entiyCols[currentCol].push(entity);
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
    const newEntites: KnowledgeEntity[] = [];

    const newCols = this.entiyCols.concat();
    newCols.forEach((col, key) => {
      if (col.length <= 0) {
        newCols.splice(key, 1);
      }
    });

    newCols.forEach((col, key) => {
      let idx = 0;
      col.forEach(entity => {
        const newEntity = cloneKnowledgeEntity(entity);
        newEntity.position = idx++;
        newEntity.type = key;
        newEntites.push(newEntity);
      });
    });
    return newEntites;
  }
}
