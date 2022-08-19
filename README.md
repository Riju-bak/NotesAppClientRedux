# Notes Redux App 

The notes-client but, this time some states will be managed by redux


Redux state is stored in a `store`

The state of the store is changed with `actions`. Actions are objects, which have at least a field determining the type of the action.
```
{
  type: 'INCREMENT'
}
```

`Dispatcher` manages the `actions`. It ensures that an action is completed before another is dispatched. 

![](https://facebook.github.io/flux/img/overview/flux-simple-f8-diagram-1300w.png)

![](https://facebook.github.io/flux/img/overview/flux-simple-f8-diagram-with-client-action-1300w.png)

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
