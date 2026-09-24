const engine = require('../../utils/engine');

const IDENTITIES = ['全部', '领导', '同事', '客户', '朋友', '家人', '长辈', '其他'];

Page({
  data: {
    list: [],
    total: 0,
    q: '',
    ids: IDENTITIES.map((x, i) => ({ n: x, on: i === 0 })),
    sortIdx: 0,
    sorts: ['热度', '最近往来', '欠债最多']
  },
  onShow() {
    this.refresh();
  },
  refresh() {
    const S = engine.getState();
    const q = this.data.q.trim();
    const idIdx = this.data.ids.findIndex(x => x.on);
    const ident = IDENTITIES[idIdx];
    let list = S.persons
      .filter(p => {
        if (ident !== '全部' && p.identity !== ident) return false;
        if (!q) return true;
        const hay = (p.name + (p.identity || '') + (p.tags || []).join('') + (p.note || '')).toLowerCase();
        return hay.includes(q.toLowerCase());
      })
      .map(p => {
        const m = engine.computePerson(p);
        const last = S.events.filter(e => e.personId === p.id).reduce((mx, e) => Math.max(mx, e.time), 0);
        return {
          id: p.id, name: p.name, identity: p.identity || '朋友',
          tags: (p.tags || []).slice(0, 3), note: p.note || '',
          heat: Math.round(m.heat), debt: Math.round(m.debt), eventCount: m.eventCount,
          lastText: last ? engine.timeAgo(last) : '尚无往来'
        };
      });
    const sortBy = this.data.sorts[this.data.sortIdx];
    if (sortBy === '最近往来') {
      list.sort((a, b) => this.lastTs(b) - this.lastTs(a));
    } else if (sortBy === '欠债最多') {
      list.sort((a, b) => b.debt - a.debt);
    } else {
      list.sort((a, b) => b.heat - a.heat);
    }
    this.setData({ list, total: S.persons.length });
  },
  lastTs(p) {
    const S = engine.getState();
    return S.events.filter(e => e.personId === p.id).reduce((mx, e) => Math.max(mx, e.time), 0);
  },
  onInput(e) { this.setData({ q: e.detail.value }); this.refresh(); },
  tapIdent(e) {
    const i = e.currentTarget.dataset.i;
    const ids = this.data.ids.map((x, k) => ({ n: x.n, on: k === i }));
    this.setData({ ids }); this.refresh();
  },
  tapSort(e) {
    this.setData({ sortIdx: e.currentTarget.dataset.i }); this.refresh();
  },
  openDetail(e) { wx.navigateTo({ url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id }); },
  addPerson() { wx.navigateTo({ url: '/pages/detail/detail?mode=add' }); }
});
