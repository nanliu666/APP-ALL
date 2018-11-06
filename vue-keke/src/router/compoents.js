// 路由懒加载
const index = resolve => require(['@/components/index'], resolve);
const game = resolve => require(['@/components/game'], resolve);

export default {
  index,
  game,
}
