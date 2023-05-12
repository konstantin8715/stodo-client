import { Task } from "./Task";

export interface Subject {
  id: number;
  title: string;
  createdAt: string;
  tasks?: Task[];

  // constructor(public id: number, public title: string, public createdAt: string) {
  //   this.id = id;
  //   this.title = title;
  //   this.createdAt = createdAt;
  // }
}
