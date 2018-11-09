// 路由懒加载
const index = resolve => require(['@/components/index'], resolve);
const game = resolve => require(['@/components/game'], resolve);
const gifts = resolve => require(['@/components/gifts'], resolve);
const job = resolve => require(['@/components/job'], resolve);
const jobDetail = resolve => require(['@/components/jobDetail'], resolve);
const jobTable = resolve => require(['@/components/jobTable'], resolve);
const about = resolve => require(['@/components/about'], resolve);
const detail = resolve => require(['@/components/detail'], resolve);
const center = resolve => require(['@/components/center'], resolve);

export default {
  index,
  game,
  gifts,
  job,
  jobDetail,
  jobTable,
  about,
  detail,
  center,
}
