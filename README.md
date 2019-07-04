[![CircleCI](https://circleci.com/gh/cesareiv/todo/tree/master.svg?style=svg)](https://circleci.com/gh/cesareiv/todo/tree/master)

# Todo by 2003
A simple CRUD todo webapp using node.js and Docker containers. React JS frontend, Express backend and Mongo DB for persistent storage. Circle CI integration.

![Todo2003](https://www.dropbox.com/s/6icp1g8qc9k62p8/todo2013.gif?dl=0)

## Getting Started
You will need Docker Desktop installed to run this app. Defaults to a development enviornment. Visit https://www.docker.com/ to get started there.

## To Build
```bash
./compose.sh build
```

## To Run (foreground - requires CRTL+C)
```bash
./compose.sh up
```

## To access the front end web content
* http://localhost

## To Run tests (Mocha)
```bash
./compose.sh test
```

## To use
Add a task using the text input and big button
<br>Edit a task by clicking the task label and typing, hit 'enter' to submit changes
<br>Delete/Complete a task by clicking the "X" button to the right of the label
<br>Datastore is persistent

## Authors

* **Rich Hunter** - [cesareiv](https://github.com/cesareiv)

## License

This project is licensed under the GNU 3.0 License - see the [LICENSE.md](LICENSE.md) file for details

