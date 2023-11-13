import './App.css'
import {Component} from 'react'
import {v4} from 'uuid'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
    isClicked: false,
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
    isClicked: false,
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
    isClicked: false,
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
    isClicked: false,
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
    isClicked: false,
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
    isClicked: false,
  },
]

// Replace your code here
const TagItem = props => {
  const {tagDetails, filteredTasks} = props
  const {optionId, displayText, isClicked} = tagDetails
  const btnClass = isClicked ? 'active' : 'btn-filter'

  const onClickBtn = () => {
    filteredTasks(optionId)
  }

  return (
    <li className="li-container">
      <button type="button" onClick={onClickBtn} className={btnClass}>
        {displayText}
      </button>
    </li>
  )
}

const EachTask = props => {
  const {taskDetails} = props
  const {textInput, activeOptionId} = taskDetails
  const findItem = tagsList.find(each => each.optionId === activeOptionId)
  return (
    <li className="tasks-container">
      <p className="paragraph">{textInput}</p>
      <p className="task">{findItem.displayText}</p>
    </li>
  )
}

class App extends Component {
  state = {
    tasksList: [],
    activeOptionId: tagsList[0].optionId,
    textInput: '',
    activeBtnId: '',
    newList: tagsList,
  }

  onChangeTextInput = event => {
    this.setState({textInput: event.target.value})
  }

  onChangeActiveOptionId = event => {
    this.setState({activeOptionId: event.target.value})
  }

  getFormData = event => {
    event.preventDefault()

    const {textInput, activeOptionId} = this.state

    if (textInput === '') {
      alert('Enter the task')
    } else {
      const newTask = {
        uniqueKey: v4(),
        textInput,
        activeOptionId,
      }

      this.setState(prevState => ({
        tasksList: [...prevState.tasksList, newTask],
        textInput: '',
        activeOptionId: tagsList[0].optionId,
      }))
    }
  }

  filteredTasks = btnId => {
    const {newList} = this.state
    const findItem = newList.find(each => each.optionId === btnId)
    if (findItem.isClicked === false) {
      const filteredList = newList.map(each => {
        if (each.optionId === btnId) {
          return {...each, isClicked: true}
        }
        return {...each, isClicked: false}
      })
      console.log(filteredList)
      this.setState({newList: filteredList, activeBtnId: btnId})
    }
    if (findItem.isClicked === true) {
      const filteredList = newList.map(each => {
        if (each.optionId === btnId) {
          return {...each, isClicked: false}
        }
        return each
      })
      console.log(filteredList)
      this.setState({newList: filteredList, activeBtnId: ''})
    }
  }

  render() {
    const {
      tasksList,
      activeOptionId,
      textInput,
      activeBtnId,
      newList,
    } = this.state
    const responseList = tasksList.filter(each =>
      each.activeOptionId.includes(activeBtnId),
    )
    console.log(activeBtnId)

    return (
      <div className="my-app-container">
        <div className="input-container">
          <h1 className="my-header">Create a task!</h1>
          <form onSubmit={this.getFormData}>
            <div>
              <label htmlFor="text" className="label">
                Task
              </label>
              <br />
              <input
                id="text"
                type="text"
                className="text-field"
                value={textInput}
                onChange={this.onChangeTextInput}
                placeholder="Enter the task here"
              />
            </div>
            <div>
              <label htmlFor="select" className="label">
                Tags
              </label>
              <br />
              <select
                value={activeOptionId}
                onChange={this.onChangeActiveOptionId}
                className="select"
                id="select"
              >
                {tagsList.map(eachTag => (
                  <option key={eachTag.optionId} value={eachTag.optionId}>
                    {eachTag.displayText}
                  </option>
                ))}
              </select>
              <br />
            </div>
            <div className="btn-container">
              <button type="submit" className="submit">
                Add Task
              </button>
            </div>
          </form>
        </div>
        <div className="my-task-container">
          <h1 className="tags">Tags</h1>
          <ul className="ul-container">
            {newList.map(eachTag => (
              <TagItem
                key={eachTag.optionId}
                tagDetails={eachTag}
                filteredTasks={this.filteredTasks}
              />
            ))}
          </ul>

          <h1 className="tags">Tasks</h1>
          {console.log(tasksList)}
          <ul>
            {responseList.length === 0 ? (
              <p className="errorMsg">No Tasks Added Yet</p>
            ) : (
              responseList.map(eachTask => (
                <EachTask key={eachTask.uniqueKey} taskDetails={eachTask} />
              ))
            )}
          </ul>
        </div>
      </div>
    )
  }
}
export default App
