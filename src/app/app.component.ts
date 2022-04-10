import {Component} from '@angular/core';
import {Socket} from "ngx-socket-io";
import {AuctionMetaData, Bid, Item} from "../lib/interfaces";
import { v4 as uuidV4 } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'auction-rts-ng';
  name = "";

  connectionId: string | null = null;

  isApproved = false;

  extraBidAmount = 0;
  bid: Bid | null = null;
  auctionMetaData: AuctionMetaData | null = null;

  acceptedBid: Bid | null = null;

  item: Item | null = null;

  constructor(private socket: Socket) {
  }

  ngOnInit(): void {
    this.connectionId = uuidV4();
    if (this.connectionId === null) {
      const uid = uuidV4();
      localStorage.setItem("connectionId", uid);
      this.connectionId = uid;
    }

    this.socket.fromEvent<Item>("updatedItem").subscribe((item) => {
      this.item = item;
    });

    this.socket.fromEvent<AuctionMetaData>("metaData").subscribe((data) => {
      this.auctionMetaData = data;
    });

    this.socket.fromEvent<Bid>("acceptedBid").subscribe((bid) => {
      this.acceptedBid = bid;
    });
    this.socket.fromEvent<Bid>("bidResult").subscribe((bid) => {
      this.bid = bid;
      if (bid.isApproved) {
        this.isApproved = bid.connectionId === this.connectionId;
      } else {}
    });
    this.socket.emit("joinBidding");
  }

  bidNow(): void {
    if (this.extraBidAmount > 0) {
      this.bid = {
        timestamp: new Date().getTime(),
        currentAmount: this.item?.currentAmount ?? 0,
        bidAmount: (this.item?.currentAmount ?? 0) + this.extraBidAmount,
        isApproved: false,
        connectionId: this.connectionId ?? "",
        name: this.name
      };
      this.socket.emit("bid", this.bid);
    }
  }
}
