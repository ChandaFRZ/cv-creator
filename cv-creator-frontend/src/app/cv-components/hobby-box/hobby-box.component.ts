import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { HobbyService } from './hobby.service';
import { HobbyEntity, cloneHobbyEntity } from 'src/app/store/hobby/hobby.entity';
import { animationStandardEnterLeave } from 'src/app/shared/animations/animations';
import { SubSink } from 'subsink';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { EventEmitData } from 'src/app/shared/interfaces/event-emit-data.interface';
import * as HobbyActions from './../../store/hobby/hobby.actions';

@Component({
  selector: 'app-hobby-box',
  templateUrl: './hobby-box.component.html',
  styleUrls: ['./hobby-box.component.scss'],
  animations: [animationStandardEnterLeave()],
})
export class HobbyBoxComponent implements OnInit, OnDestroy {
  @Input() dragDisabled = false;
  @Input() editDisabled = false;

  readonly dropListData = ['hooby-dropList1', 'hooby-dropList2', 'hooby-dropList3', 'hooby-dropList4'];
  readonly dropListConnectors = [
    'hooby-dropList2 hooby-dropList3 hooby-dropList4',
    'hooby-dropList1 hooby-dropList3 hooby-dropList4',
    'hooby-dropList1 hooby-dropList2 hooby-dropList4',
    'hooby-dropList1 hooby-dropList2 hooby-dropList3'
  ];

  entities: HobbyEntity[];
  entiyCols: HobbyEntity[][];

  maxCols: number;
  maxRows: number;

  private subs = new SubSink();

  constructor(private store: Store<AppState>, private hobbyService: HobbyService) {
  }

  ngOnInit() {
    this.subs.add(this.hobbyService.entities$.subscribe(data => {
      this.entiyCols = [];
      this.entities = data
        .map(entity => Object.assign({}, entity))
        .sort((a, b) => a.position > b.position ? 1 : a.position === b.position ? 0 : -1);
      this.makeCols();
      this.updateNumberOfGroups();
    }));

    this.subs.add(this.store.select(state => state.hobbyState).subscribe(
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
    const newEntites: HobbyEntity[] = this.prepareEntitesForSend();
    this.store.dispatch(HobbyActions.updateManyRequest({ entities: newEntites }));
  }

  onBlur(): void {
    this.store.dispatch(HobbyActions.selectEntity({ entityId: -1 }));
  }

  onFocus(data: EventEmitData): void {
    setTimeout(() => {
      this.store.dispatch(HobbyActions.selectEntity({ entityId: data.id }));
    }, 200);
  }

  onAddEntity(col: HobbyEntity[], index: number): void {
    const newEntity = new HobbyEntity();
    newEntity.type = index;
    newEntity.position = col.length;
    this.hobbyService.add(newEntity);
  }

  onAddCol(): void {
    const newEntity = new HobbyEntity();
    newEntity.type = this.entiyCols.length;
    newEntity.position = 0;
    this.hobbyService.add(newEntity);
  }

  onSubmit(data: EventEmitData): void {
    const newEntity: HobbyEntity = this.entities.find(entity => entity.id === data.id);
    newEntity.name = data.content.toString();
    this.hobbyService.update(newEntity);
  }

  onDelete(data: EventEmitData): void {
    this.hobbyService.delete(data.id);

    setTimeout(() => {
      const newEntites: HobbyEntity[] = this.prepareEntitesForSend();
      if (newEntites.length <= 0) {
        return;
      }
      this.store.dispatch(HobbyActions.updateManyRequest({ entities: newEntites }));
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
    const newEntites: HobbyEntity[] = [];
    const newCols = this.entiyCols.concat();

    newCols.forEach((col, key) => {
      if (col.length <= 0) {
        newCols.splice(key, 1);
      }
    });

    newCols.forEach((col, key) => {
      let idx = 0;
      col.forEach(entity => {
        const newEntity = cloneHobbyEntity(entity);
        newEntity.position = idx++;
        newEntity.type = key;
        newEntites.push(newEntity);
      });
    });

    return newEntites;
  }
}
