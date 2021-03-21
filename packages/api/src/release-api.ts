import { Octokit } from '@octokit/rest'
import { ReleasePullStatus } from './constants'

class ReleaseApi {
  private readonly owner: string;
  private readonly octokit: Octokit;

  constructor ({ token, owner }) {
    this.owner = owner
    this.octokit = new Octokit({
      auth: token,
      log: {
        debug: () => {},
        info: console.log,
        warn: console.warn,
        error: console.error
      }
    })
  }

  async getReleasePull (repoName, releaseName) {
    const { data: pulls } = await this.octokit.pulls.list({
      owner: this.owner,
      repo: repoName,
      state: 'all'
    })

    const pull = pulls.find(r => r.head.ref === releaseName)

    if (pull == null) {
      const { data: branches } = await this.octokit.repos.listBranches({
        owner: this.owner,
        repo: repoName
        // protected: true
      })

      // В случае, когда ни пул-реквеста, ни ветки не было найдено - считать, что данный
      // репозиторий не входит в релиз.
      const hasReleaseBranch = !!branches.find(b => b.name === releaseName)
      if (!hasReleaseBranch) {
        return null
      }

      return {
        repoName,
        id: repoName,
        title: '',
        status: ReleasePullStatus.NOT_CREATED
      }
    }

    return {
      repoName,
      title: pull.title,
      status: (() => {
        const hasReleaseLabel = pull.labels.find(l => l.name)
        const state = pull.state
        const merged = !!pull.merged_at

        if (state === 'closed') {
          return merged ? ReleasePullStatus.MERGED : ReleasePullStatus.DECLINED
        }

        if (state === 'open') {
          return hasReleaseLabel ? ReleasePullStatus.ACTIVE : ReleasePullStatus.INACTIVE
        }

        // По идеи, мы никогда сюда не попадем, т.к. у пул-реквеста может быть только
        // два статуса: 'closed' & 'open'.
        return null
      })()
    }
  }

  getReleasePulls (repoNames, releaseName) {

  }
}

export default ReleaseApi
