const engine = require('../../utils/engine');

const EVENTS = engine.EVENT_TYPES;
const TYPES = Object.keys(EVENTS).map(k => ({ key: k, label: EVENTS[k].label, w: EVENTS[k].weight, on: k === 'meal' }));

Page({
  data: {
    persons: [],
    personIdx: 0,
    types: TYPES,
    curType: 'meal',
    title: '',
    date: '',
    weight: 7,
    note: '',
    recent: [],
    canUndo: false
  },
  onShow() {
    this.refreshPersons();
    this.refreshRecent();
  },
  refreshPersons() {
    const S = engine.getState();
    const persons = S.persons.map(p => ({ id: p.id, name: p.name, identity: p.identity || '' }));
    let idx = this.data.personIdx;
    if (!persons.length) idx = 0;
    else if (idx >= persons.length) idx = 0;
    this.setData({ persons, personIdx: idx });
  },
  refreshRecent() {
    const S = engine.getState();
    const recent = S.events.slice().sort((a, b) => b.time - a.time).slice(0, 8).map(e => {
      const p = S.persons.find(x => x.id === e.personId);
      return {
        id: e.id, title: e.title, type: EVENTS[e.type] ? EVENTS[e.type].label : '其他',
        person: p ? p.name : '未知', weight: e.weight,
        timeText: engine.timeAgo(e.time)
      };
    });
    this.setData({ recent, canUndo: recent.length > 0 && recent[0].id === S.lastEventId });
  },
  onPersonChange(e) { this.setData({ personIdx: +e.detail.value }); },
  tapType(e) {
    const k = e.currentTarget.dataset.k;
    const types = this.data.types.map(t => ({ ...t, on: t.key === k }));
    this.setData({ types, curType: k });
  },
  onTitle(e) { this.setData({ title: e.detail.value }); },
  onDate(e) { this.setData({ date: e.detail.value }); },
  onNote(e) { this.setData({ note: e.detail.value }); },
  step(e) {
    const d = +e.currentTarget.dataset.d;
    this.setData({ weight: Math.max(-20, Math.min(20, this.data.weight + d)) });
  },
  submit() {
    const S = engine.getState();
    const p = this.data.persons[this.data.personIdx];
    if (!p) { wx.showToast({ title: '先添加人脉', icon: 'none' }); return; }
    const ev = {
      id: engine.uid(), personId: p.id, type: this.data.curType,
      title: (this.data.title || EVENTS[this.data.curType].label).trim(),
      time: this.data.date ? Math.min(new Date(this.data.date + 'T00:00:00').getTime(), Date.now()) : Date.now(),
      weight: this.data.weight,
      note: this.data.note.trim()
    };
    S.events.push(ev);
    S.lastEventId = ev.id;
    engine.save();
    this.setData({ title: '', date: '', note: '', weight: 7 });
    this.refreshRecent();
    wx.showToast({ title: '已记录', icon: 'success' });
  },
  undo() {
    const S = engine.getState();
    if (!S.lastEventId) return;
    S.events = S.events.filter(x => x.id !== S.lastEventId);
    S.lastEventId = null;
    engine.save();
    this.refreshRecent();
    wx.showToast({ title: '已撤销', icon: 'none' });
  },
  delEvent(e) {
    const S = engine.getState();
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '删除这条记录？',
      confirmText: '删除', confirmColor: '#b65f5f',
      success: (r) => {
        if (r.confirm) {
          S.events = S.events.filter(x => x.id !== id);
          engine.save();
          this.refreshRecent();
        }
      }
    });
  }
});
