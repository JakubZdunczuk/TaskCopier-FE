import React, {useEffect, useState} from "react";
import {Button} from "react-native";
import {copyTask, taskList} from "../services/TaskService";

function TaskListComponent() {
    const [tasks, setTasks] = useState([])
    const [link, setLink] = useState([])


    useEffect(() => {
        getTasks()
    }, []);

    function getTasks() {
            taskList().then((response) => {
                console.log(response)
                setTasks(response.data);
            }).catch(error => {
                console.error(error);
            })
    }


    function clickButton(task) {
        copyTask(task).then((response) => {
            console.log(response.data.self);
            setLink({...response.data, copiedTaskId: task.id});
            console.log(link)
        }).catch(error => {
            console.error(error);
        });

        getTasks();
    }

    let JIRA_BROWSE_LINK = 'https://jakubzdunczuk.atlassian.net/browse/';
    return (
        <div>
            <h3>Task List</h3>
            <h4>The table consists tasks from two projects in jakubzdunczuk.atlassian.net</h4>
            <div className="container">
                <table className="table table-bordered table-light">
                    <thead>
                    <tr>
                        <th>taskId</th>
                        <th>title</th>
                        <th>projectId</th>
                        <th>description</th>
                        <th>actions</th>
                        <th>links to copied task</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        tasks.map(task =>
                            <tr key={task.id}>
                                <td>{task.id}</td>
                                <td>{task.title}</td>
                                <td>{task.projectId}</td>
                                <td>{task.description}</td>
                                <td>
                                    <Button
                                        title={checkIfTaskIsCopied(task, link) ? "You just copied this task!" : "Copy task from one project to the second"}
                                        onPress={() => clickButton(task)}
                                        disabled={checkIfTaskIsCopied(task, link)}>
                                    </Button>
                                </td>
                                <td>
                                    <div className="row">
                                        <a href={checkIfTaskIsCopied(task, link) ? link.self : null}>{checkIfTaskIsCopied(task, link) ? link.self : ""}</a>
                                        <a href={checkIfTaskIsCopied(task, link) ? (JIRA_BROWSE_LINK + link.key) : null}>{checkIfTaskIsCopied(task, link) ? (JIRA_BROWSE_LINK + link.key) : ""}</a>
                                    </div>
                                </td>
                            </tr>)
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function checkIfTaskIsCopied(task, link) {
    return task.id === link.copiedTaskId;

}
export default TaskListComponent