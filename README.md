# SWUFE-OJ WebUI

modern online judge platform to judge anything

judge anything means you can use it as a Codeforce/Kaggle or any sort of leaderboard, ALL on a single platform.

## Features

### Customizable local judgement

A task can be judged by different metrics. In coding competitions, it can be time/memory/score based; in ML competitions, it can be R-squared/MAE/ACC based.

SWUFE-OJ provides a flexible way to customize judgement logic. You need to specify:

- a test set (labeled)
- expected input/output format (e.g. code, model/API url for input; stdout, predictions csv for output)
- a judge script.

The judge script is responsible for evaluating the submission on the test set and producing metrics. Built-in judger template includes:

| Judger Type    | Description                       |
| -------------- | --------------------------------- |
| Backend Judger | tests passed, performance metrics |
| ML Judger      | ACC                               |

The test set is invisible to users (or you can choose to make it visible). The judge script is required written in Python.

### Remote judge

A problem can be created locally or linked to a problem provided by a remote platform. This enable you to reuse and integrate existing problems/tasks on other platforms.

To enable remote judge, you MUST configure the remote platform in your backend adapter, e.g. prepare bot accounts for submission. We also support forward submission to remote platforms (use it as a proxy).

Supported remote platforms:

| Platform                                                                                           | Status |
| -------------------------------------------------------------------------------------------------- | ------ |
| ![Codeforce](https://codeforces.com/codeforces.org/s/53974/images/codeforces-sponsored-by-ton.png) | TODO   |
| ![Kaggle](https://www.kaggle.com/favicon.ico)                                                      | TODO   |

### Leaderboard

You can create contest or problem set to organize problems (problems should be the same type). Each contest/problem set has a leaderboard to show user rankings. 

Rankings are calculated based on problem metrics.

### Problem submission

An online text editor and a debug environment are provided for code submission. You can also upload code file for submission.

### Discussion Forum

Each problem has a discussion forum, where users can post questions, share solutions.

## Quick Start

### Install Dependencies

```bash
pnpm install
```

### Development

Start the development server (default runs at `http://localhost:3000`):

```bash
pnpm dev -o
```

### Production Build

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```
