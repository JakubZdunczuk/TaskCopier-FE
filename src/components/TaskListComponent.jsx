import React, {useEffect, useState} from "react";
import {Button} from "react-native";
import {createTask, projectsList, tasksList} from "../services/TaskService";

function TaskListComponent() {
    const [tasks, setTasks] = useState([])
    const [link, setLink] = useState([])
    const [projects, setProjects] = useState([])

    useEffect(() => {
        getTasks();

        projectsList().then((response) => {
            setProjects(response.data);
        }).catch(error => {
            console.error(error);
        })
    }, []);


    function getTasks() {
        tasksList().then((response) => {
            setTasks(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function clickButton(task) {
        let projectId = task.project.externalId === "10000" ? "10001" : "10000";
        createTask(task, projectId).then((response) => {
            setLink({...response.data, copiedTaskId: task.id});
            console.log(response);
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
                        <th>projectName</th>
                        <th>description</th>
                        <th>actions</th>
                        <th>links to copied task</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        tasks.map(task =>
                            <tr key={task.id}>
                                <td>{task.externalId}</td>
                                <td>{task.title}</td>
                                <td>{task.project.name}</td>
                                <td>{task.description}</td>
                                <td>
                                    {/*@TODO: choosing where to copy*/}
                                    {/*<select name="selectedProjectId" value ={}>*/}
                                    {/*    <option value="" disabled="true">Choose where to copy</option>*/}
                                    {/*    {projects.map(project =>*/}
                                    {/*        <option key={project.id}*/}
                                    {/*                disabled={project.externalId === task.project.externalId}*/}
                                    {/*                value={project.externalId}>*/}
                                    {/*            {project.key}*/}
                                    {/*        </option>)*/}
                                    {/*    }*/}
                                    {/*</select>*/}
                                    <div className="row-cols-1">
                                        <Button
                                            title={checkIfTaskIsCopied(task, link) ? "You just copied this task!" : "Copy task to chosen project"}
                                            onPress={() => clickButton(task)}
                                            disabled={checkIfTaskIsCopied(task, link)}
                                            type="submit">
                                        </Button>
                                    </div>
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