import { Injectable } from "@angular/core"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs"
import { Task } from "src/app/Task"

const HttpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
  /* Got an error:  
    ----Type 'Observable<ArrayBuffer>' is not assignable to type 'Observable<Task>', Type 'ArrayBuffer' is missing the following properties from type 'Task': text, day, reminder----
    and this is surprisingly the answer*/
  observe: "response" as "body",
}

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private apiUrl = "Http://localhost:5000/tasks"
  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl)
  }

  deleteTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`
    return this.http.delete<Task>(url)
  }

  updateTaskReminder(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`
    return this.http.put<Task>(url, task, HttpOptions)
  }

  addTask(task: Task): Observable<Task> {
    console.log(task)
    return this.http.post<Task>(this.apiUrl, task, HttpOptions)
  }
}
