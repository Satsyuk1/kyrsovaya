import Grid from '@mui/material/Grid'
import { useEffect } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import {
  createActionSetDone,
  createActionSetInProgress,
  createActionSetToDo,
  createActionSetUser,
} from '../redux/actions/actions'
import { Board } from './Board'
import { usersToDo, usersData, stateInStore } from '../types/types'

export default function ToDo() {
  const dispatch = useDispatch()
  const state = useStore()

  const selectorStateToDo: any = useSelector<stateInStore>((state) => state.toDo)
  const selectorStateInProgress: any = useSelector<stateInStore>((state) => state.inProgress)

  async function fetchGetData(url: string, check: boolean = false) {
    const toDoUrl = url

    try {
      const response = await fetch(toDoUrl, {
        method: 'GET',
      })
      const data: Array<usersToDo | usersData> = await response.json()

      // console.log('data: ', data)

      dispatch(check ? createActionSetToDo(data) : createActionSetUser(data))
    } catch (err) {
      console.log('Not Found: ', err)
    }
  }

  useEffect(() => {
    fetchGetData('https://jsonplaceholder.typicode.com/todos', true)
    fetchGetData('https://jsonplaceholder.typicode.com/users')
  }, [])

  function moveTicketNext(indexFromToDo: number): void {
    const arr: any = state.getState()

    dispatch(createActionSetInProgress([...arr.inProgress, selectorStateToDo[indexFromToDo]]))
    dispatch(
      createActionSetToDo(
        selectorStateToDo.filter((item: Array<object>) => item !== selectorStateToDo[indexFromToDo])
      )
    )
  }
  function moveTicketNextInProgress(indexFromInProgress: number): void {
    const arr: any = state.getState()

    dispatch(createActionSetDone([...arr.done, selectorStateInProgress[indexFromInProgress]]))
    dispatch(
      createActionSetInProgress(
        selectorStateInProgress.filter(
          (item: Array<object>) => item !== selectorStateInProgress[indexFromInProgress]
        )
      )
    )
  }

  return (
    <Grid container spacing={2}>
      <Board moveTicketNext={moveTicketNext} moveTicketNextInProgress={moveTicketNextInProgress} />
    </Grid>
  )
}
