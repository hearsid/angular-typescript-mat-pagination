import {Component, ViewEncapsulation, Input, Output, EventEmitter, OnInit} from "@angular/core";
import * as Immutable from "immutable";

interface ItemPerPageMap {
    key: string;
    value: number;
}
@Component({
    selector: 'material-pagination',
    templateUrl: './pagination.html',
    styleUrls: ['./pagination.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class MdPagination implements OnInit {
    @Input() showPrevNext: boolean;
    @Input() itemsPerPage: number;
    @Input() totalItems: number;
    @Input() range: number;
    @Output() onChange: EventEmitter<any> = new EventEmitter<any>();



    itemsToShowList: ItemPerPageMap[] = [];
    itemPerPageMap: ItemPerPageMap;
    selectedTotalItems: number;
    activePage: number;

    totalPages: number;
    constructor() {
        this.activePage = 1;
        let optnMap = Immutable.List([{
            key: '10 Per Page',
            value: 10
        },
        {
            key: '20 Per Page',
            value: 20
        },
        {
            key: '50 Per Page',
            value: 50
        }
        ]);
        optnMap.forEach((single, index) => {
            this.itemPerPageMap = { key: single.key, value: single.value };
            this.itemsToShowList.push(this.itemPerPageMap);
        });

        this.selectedTotalItems = this.itemsToShowList[0].value;
    }

    ngOnInit(): void {
        // calculate the totalItems/itemsPerPage
        let totalPages = this.totalItems / this.itemsPerPage;
        this.totalPages = totalPages;
        // number to array
        // total page  number to show in the pagination bar
        let range = this.range;


    }

    changePage(pageNumber): void {
        // if the pageNumber comes as << or >> signs handle it
        if (typeof (pageNumber) == "number") {
            this.activePage = pageNumber;
        }
        else if (typeof (pageNumber) == "string") {
            switch (pageNumber.charCodeAt(0)) {
                case 171:
                    this.activePage -= 1;
                    break;

                case 187:
                    this.activePage += 1;
                    break;

                default:
                    this.activePage = this.activePage;
                    break;

            }
        }

        else {
            this.activePage = pageNumber;
        }

        // change the total pages based on the activepage and based on range
        this.totalPages
        this.onChange.emit({ pageNumber: this.activePage, pageSize: this.itemsPerPage });
    }

    changeTotalItems() {
        this.itemsPerPage = this.selectedTotalItems;
        this.onChange.emit({ pageNumber: this.activePage, pageSize: this.itemsPerPage });

    }

}
