var t = Object.defineProperty,
	e = new WeakMap(),
	n = (t) => e.get(t),
	o = (t, n) => e.set((n.t = t), n),
	l = (t, e) => e in t,
	s = (t, e) => (0, console.error)(t, e),
	r = new Map(),
	i = new Map(),
	c = 'slot-fb{display:contents}slot-fb[hidden]{display:none}',
	u = 'undefined' != typeof window ? window : {},
	a = u.document || { head: {} },
	f = {
		o: 0,
		l: '',
		jmp: (t) => t(),
		raf: (t) => requestAnimationFrame(t),
		ael: (t, e, n, o) => t.addEventListener(e, n, o),
		rel: (t, e, n, o) => t.removeEventListener(e, n, o),
		ce: (t, e) => new CustomEvent(t, e)
	},
	h = (t) => Promise.resolve(t),
	p = (() => {
		try {
			return new CSSStyleSheet(), 'function' == typeof new CSSStyleSheet().replaceSync;
		} catch (t) {}
		return !1;
	})(),
	m = !1,
	d = [],
	y = [],
	$ = (t, e) => (n) => {
		t.push(n), m || ((m = !0), e && 4 & f.o ? v(b) : f.raf(b));
	},
	w = (t) => {
		for (let e = 0; e < t.length; e++)
			try {
				t[e](performance.now());
			} catch (t) {
				s(t);
			}
		t.length = 0;
	},
	b = () => {
		w(d), w(y), (m = d.length > 0) && f.raf(b);
	},
	v = (t) => h().then(t),
	S = $(y, !0),
	g = {},
	j = (t) => 'object' == (t = typeof t) || 'function' === t;
function E(t) {
	var e, n, o;
	return null !=
		(o =
			null == (n = null == (e = t.head) ? void 0 : e.querySelector('meta[name="csp-nonce"]'))
				? void 0
				: n.getAttribute('content'))
		? o
		: void 0;
}
((e, n) => {
	for (var o in n) t(e, o, { get: n[o], enumerable: !0 });
})({}, { err: () => k, map: () => C, ok: () => O, unwrap: () => x, unwrapErr: () => P });
var O = (t) => ({ isOk: !0, isErr: !1, value: t }),
	k = (t) => ({ isOk: !1, isErr: !0, value: t });
function C(t, e) {
	if (t.isOk) {
		const n = e(t.value);
		return n instanceof Promise ? n.then((t) => O(t)) : O(n);
	}
	if (t.isErr) return k(t.value);
	throw 'should never get here';
}
var M,
	x = (t) => {
		if (t.isOk) return t.value;
		throw t.value;
	},
	P = (t) => {
		if (t.isErr) return t.value;
		throw t.value;
	},
	A = (t, e, ...n) => {
		let o = null,
			l = !1,
			s = !1;
		const r = [],
			i = (e) => {
				for (let n = 0; n < e.length; n++)
					(o = e[n]),
						Array.isArray(o)
							? i(o)
							: null != o &&
								'boolean' != typeof o &&
								((l = 'function' != typeof t && !j(o)) && (o += ''),
								l && s ? (r[r.length - 1].i += o) : r.push(l ? H(null, o) : o),
								(s = l));
			};
		if ((i(n), e)) {
			const t = e.className || e.class;
			t &&
				(e.class =
					'object' != typeof t
						? t
						: Object.keys(t)
								.filter((e) => t[e])
								.join(' '));
		}
		const c = H(t, null);
		return (c.u = e), r.length > 0 && (c.h = r), c;
	},
	H = (t, e) => ({ o: 0, p: t, i: e, m: null, h: null, u: null }),
	R = {},
	T = new WeakMap(),
	D = (t) => 'sc-' + t.$,
	F = (t, e, n, o, s, r) => {
		if (n !== o) {
			let i = l(t, e),
				c = e.toLowerCase();
			if ('class' === e) {
				const e = t.classList,
					l = N(n),
					s = N(o);
				e.remove(...l.filter((t) => t && !s.includes(t))), e.add(...s.filter((t) => t && !l.includes(t)));
			} else if ('style' === e) {
				for (const e in n)
					(o && null != o[e]) || (e.includes('-') ? t.style.removeProperty(e) : (t.style[e] = ''));
				for (const e in o)
					(n && o[e] === n[e]) || (e.includes('-') ? t.style.setProperty(e, o[e]) : (t.style[e] = o[e]));
			} else if (i || 'o' !== e[0] || 'n' !== e[1]) {
				const l = j(o);
				if ((i || (l && null !== o)) && !s)
					try {
						if (t.tagName.includes('-')) t[e] = o;
						else {
							const l = null == o ? '' : o;
							'list' === e
								? (i = !1)
								: (null != n && t[e] == l) ||
									('function' == typeof t.__lookupSetter__(e) ? (t[e] = l) : t.setAttribute(e, l));
						}
					} catch (t) {}
				null == o || !1 === o
					? (!1 === o && '' !== t.getAttribute(e)) || t.removeAttribute(e)
					: (!i || 4 & r || s) && !l && t.setAttribute(e, (o = !0 === o ? '' : o));
			} else if (((e = '-' === e[2] ? e.slice(3) : l(u, c) ? c.slice(2) : c[2] + e.slice(3)), n || o)) {
				const l = e.endsWith(U);
				(e = e.replace(W, '')), n && f.rel(t, e, n, l), o && f.ael(t, e, o, l);
			}
		}
	},
	L = /\s/,
	N = (t) => (t ? t.split(L) : []),
	U = 'Capture',
	W = RegExp(U + '$'),
	q = (t, e, n) => {
		const o = 11 === e.m.nodeType && e.m.host ? e.m.host : e.m,
			l = (t && t.u) || g,
			s = e.u || g;
		for (const t of G(Object.keys(l))) t in s || F(o, t, l[t], void 0, n, e.o);
		for (const t of G(Object.keys(s))) F(o, t, l[t], s[t], n, e.o);
	};
function G(t) {
	return t.includes('ref') ? [...t.filter((t) => 'ref' !== t), 'ref'] : t;
}
var V = !1,
	_ = (t, e, n) => {
		const o = e.h[n];
		let l,
			s,
			r = 0;
		if (null !== o.i) l = o.m = a.createTextNode(o.i);
		else if (((l = o.m = a.createElement(o.p)), q(null, o, V), l.getRootNode().querySelector('body'), o.h))
			for (r = 0; r < o.h.length; ++r) (s = _(t, o, r)), s && l.appendChild(s);
		return (l['s-hn'] = M), l;
	},
	z = (t, e, n, o, l, s) => {
		let r,
			i = t;
		for (i.shadowRoot && i.tagName === M && (i = i.shadowRoot); l <= s; ++l)
			o[l] && ((r = _(null, n, l)), r && ((o[l].m = r), K(i, r, e)));
	},
	B = (t, e, n) => {
		for (let o = e; o <= n; ++o) {
			const e = t[o];
			if (e) {
				const t = e.m;
				t && t.remove();
			}
		}
	},
	I = (t, e) => t.p === e.p,
	J = (t, e, n = !1) => {
		const o = (e.m = t.m),
			l = t.h,
			s = e.h,
			r = e.i;
		null === r
			? (q(t, e, V),
				null !== l && null !== s
					? ((t, e, n, o, l = !1) => {
							let s,
								r = 0,
								i = 0,
								c = e.length - 1,
								u = e[0],
								a = e[c],
								f = o.length - 1,
								h = o[0],
								p = o[f];
							for (; r <= c && i <= f; )
								null == u
									? (u = e[++r])
									: null == a
										? (a = e[--c])
										: null == h
											? (h = o[++i])
											: null == p
												? (p = o[--f])
												: I(u, h)
													? (J(u, h, l), (u = e[++r]), (h = o[++i]))
													: I(a, p)
														? (J(a, p, l), (a = e[--c]), (p = o[--f]))
														: I(u, p)
															? (J(u, p, l), K(t, u.m, a.m.nextSibling), (u = e[++r]), (p = o[--f]))
															: I(a, h)
																? (J(a, h, l), K(t, a.m, u.m), (a = e[--c]), (h = o[++i]))
																: ((s = _(e && e[i], n, i)), (h = o[++i]), s && K(u.m.parentNode, s, u.m));
							r > c ? z(t, null == o[f + 1] ? null : o[f + 1].m, n, o, i, f) : i > f && B(e, r, c);
						})(o, l, e, s, n)
					: null !== s
						? (null !== t.i && (o.textContent = ''), z(o, null, e, s, 0, s.length - 1))
						: !n && null !== l && B(l, 0, l.length - 1))
			: t.i !== r && (o.data = r);
	},
	K = (t, e, n) => (null == t ? void 0 : t.insertBefore(e, n)),
	Q = (t, e) => {
		e && !t.v && e['s-p'] && e['s-p'].push(new Promise((e) => (t.v = e)));
	},
	X = (t, e) => {
		if (((t.o |= 16), !(4 & t.o))) return Q(t, t.S), S(() => Y(t, e));
		t.o |= 512;
	},
	Y = (t, e) => {
		const n = t.t;
		if (!n)
			throw Error(
				`Can't render component <${t.$hostElement$.tagName.toLowerCase()} /> with invalid Stencil runtime! Make sure this imported component is compiled with a \`externalRuntime: true\` flag. For more information, please refer to https://stenciljs.com/docs/custom-elements#externalruntime`
			);
		let o;
		return e && (o = st(n, 'componentWillLoad')), Z(o, () => et(t, n, e));
	},
	Z = (t, e) =>
		tt(t)
			? t.then(e).catch((t) => {
					console.error(t), e();
				})
			: e(),
	tt = (t) => t instanceof Promise || (t && t.then && 'function' == typeof t.then),
	et = async (t, e, n) => {
		var o;
		const l = t.$hostElement$,
			s = l['s-rc'];
		n &&
			((t) => {
				const e = t.j,
					n = t.$hostElement$,
					o = e.o,
					l = ((t, e) => {
						var n;
						const o = D(e),
							l = i.get(o);
						if (((t = 11 === t.nodeType ? t : a), l))
							if ('string' == typeof l) {
								let s,
									r = T.get((t = t.head || t));
								if ((r || T.set(t, (r = new Set())), !r.has(o))) {
									{
										(s = a.createElement('style')), (s.innerHTML = l);
										const o = null != (n = f.O) ? n : E(a);
										if ((null != o && s.setAttribute('nonce', o), !(1 & e.o)))
											if ('HEAD' === t.nodeName) {
												const e = t.querySelectorAll('link[rel=preconnect]'),
													n = e.length > 0 ? e[e.length - 1].nextSibling : document.querySelector('style');
												t.insertBefore(s, n);
											} else 'host' in t ? t.prepend(s) : t.append(s);
										1 & e.o && 'HEAD' !== t.nodeName && t.insertBefore(s, null);
									}
									4 & e.o && (s.innerHTML += c), r && r.add(o);
								}
							} else
								t.adoptedStyleSheets.includes(l) || (t.adoptedStyleSheets = [...t.adoptedStyleSheets, l]);
						return o;
					})(n.shadowRoot ? n.shadowRoot : n.getRootNode(), e);
				10 & o && 2 & o && ((n['s-sc'] = l), n.classList.add(l + '-h'));
			})(t);
		nt(t, e, l, n), s && (s.map((t) => t()), (l['s-rc'] = void 0));
		{
			const e = null != (o = l['s-p']) ? o : [],
				n = () => ot(t);
			0 === e.length ? n() : (Promise.all(e).then(n), (t.o |= 4), (e.length = 0));
		}
	},
	nt = (t, e, n, o) => {
		try {
			(e = e.render()),
				(t.o &= -17),
				(t.o |= 2),
				((t, e, n = !1) => {
					const o = t.$hostElement$,
						l = t.j,
						s = t.k || H(null, null),
						r = ((t) => t && t.p === R)(e) ? e : A(null, null, e);
					if (((M = o.tagName), n && r.u))
						for (const t of Object.keys(r.u))
							o.hasAttribute(t) && !['key', 'ref', 'style', 'class'].includes(t) && (r.u[t] = o[t]);
					(r.p = null), (r.o |= 4), (t.k = r), (r.m = s.m = o.shadowRoot || o), J(s, r, n);
				})(t, e, o);
		} catch (e) {
			s(e, t.$hostElement$);
		}
		return null;
	},
	ot = (t) => {
		const e = t.$hostElement$,
			n = t.S;
		64 & t.o || ((t.o |= 64), rt(e), t.C(e), n || lt()),
			t.v && (t.v(), (t.v = void 0)),
			512 & t.o && v(() => X(t, !1)),
			(t.o &= -517);
	},
	lt = () => {
		rt(a.documentElement),
			v(() =>
				((t) => {
					const e = f.ce('appload', { detail: { namespace: 'wc-fin' } });
					return t.dispatchEvent(e), e;
				})(u)
			);
	},
	st = (t, e, n) => {
		if (t && t[e])
			try {
				return t[e](n);
			} catch (t) {
				s(t);
			}
	},
	rt = (t) => t.classList.add('hydrated'),
	it = (t, e, o) => {
		var l, s;
		const r = t.prototype;
		if (e.M) {
			const i = Object.entries(null != (l = e.M) ? l : {});
			if (
				(i.map(([t, [l]]) => {
					(31 & l || (2 & o && 32 & l)) &&
						Object.defineProperty(r, t, {
							get() {
								return ((t, e) => n(this).P.get(e))(0, t);
							},
							set(o) {
								((t, e, o, l) => {
									const s = n(t);
									if (!s)
										throw Error(
											`Couldn't find host element for "${l.$}" as it is unknown to this Stencil runtime. This usually happens when integrating a 3rd party Stencil component with another Stencil component or application. Please reach out to the maintainers of the 3rd party Stencil component or report this on the Stencil Discord server (https://chat.stenciljs.com) or comment on this similar [GitHub issue](https://github.com/ionic-team/stencil/issues/5457).`
										);
									const r = s.P.get(e),
										i = s.o,
										c = s.t;
									(o = ((t, e) =>
										null == t || j(t)
											? t
											: 4 & e
												? 'false' !== t && ('' === t || !!t)
												: 2 & e
													? parseFloat(t)
													: 1 & e
														? t + ''
														: t)(o, l.M[e][0])),
										(8 & i && void 0 !== r) ||
											o === r ||
											(Number.isNaN(r) && Number.isNaN(o)) ||
											(s.P.set(e, o), c && 2 == (18 & i) && X(s, !1));
								})(this, t, o, e);
							},
							configurable: !0,
							enumerable: !0
						});
				}),
				1 & o)
			) {
				const o = new Map();
				(r.attributeChangedCallback = function (t, l, s) {
					f.jmp(() => {
						var i;
						const c = o.get(t);
						if (this.hasOwnProperty(c)) (s = this[c]), delete this[c];
						else {
							if (r.hasOwnProperty(c) && 'number' == typeof this[c] && this[c] == s) return;
							if (null == c) {
								const o = n(this),
									r = null == o ? void 0 : o.o;
								if (r && !(8 & r) && 128 & r && s !== l) {
									const n = o.t,
										r = null == (i = e.A) ? void 0 : i[t];
									null == r ||
										r.forEach((e) => {
											null != n[e] && n[e].call(n, s, l, t);
										});
								}
								return;
							}
						}
						this[c] = (null !== s || 'boolean' != typeof this[c]) && s;
					});
				}),
					(t.observedAttributes = Array.from(
						new Set([
							...Object.keys(null != (s = e.A) ? s : {}),
							...i
								.filter(([t, e]) => 15 & e[0])
								.map(([t, e]) => {
									const n = e[1] || t;
									return o.set(n, t), n;
								})
						])
					));
			}
		}
		return t;
	},
	ct = (t, o = {}) => {
		var l;
		const h = [],
			m = o.exclude || [],
			d = u.customElements,
			y = a.head,
			$ = y.querySelector('meta[charset]'),
			w = a.createElement('style'),
			b = [];
		let v,
			S = !0;
		Object.assign(f, o), (f.l = new URL(o.resourcesUrl || './', a.baseURI).href);
		let g = !1;
		if (
			(t.map((t) => {
				t[1].map((o) => {
					const l = { o: o[0], $: o[1], M: o[2], H: o[3] };
					4 & l.o && (g = !0), (l.M = o[2]);
					const c = l.$,
						u = class extends HTMLElement {
							constructor(t) {
								if (
									(super(t),
									(this.hasRegisteredEventListeners = !1),
									((t, n) => {
										const o = { o: 0, $hostElement$: t, j: n, P: new Map() };
										(o.R = new Promise((t) => (o.C = t))), (t['s-p'] = []), (t['s-rc'] = []), e.set(t, o);
									})((t = this), l),
									1 & l.o)
								)
									if (t.shadowRoot) {
										if ('open' !== t.shadowRoot.mode)
											throw Error(
												`Unable to re-use existing shadow root for ${l.$}! Mode is set to ${t.shadowRoot.mode} but Stencil only supports open shadow roots.`
											);
									} else t.attachShadow({ mode: 'open' });
							}
							connectedCallback() {
								this.hasRegisteredEventListeners || (this.hasRegisteredEventListeners = !0),
									v && (clearTimeout(v), (v = null)),
									S
										? b.push(this)
										: f.jmp(() =>
												((t) => {
													if (!(1 & f.o)) {
														const e = n(t),
															o = e.j,
															l = () => {};
														if (1 & e.o)
															(null == e ? void 0 : e.t) ||
																((null == e ? void 0 : e.R) && e.R.then(() => {}));
														else {
															e.o |= 1;
															{
																let n = t;
																for (; (n = n.parentNode || n.host); )
																	if (n['s-p']) {
																		Q(e, (e.S = n));
																		break;
																	}
															}
															o.M &&
																Object.entries(o.M).map(([e, [n]]) => {
																	if (31 & n && t.hasOwnProperty(e)) {
																		const n = t[e];
																		delete t[e], (t[e] = n);
																	}
																}),
																(async (t, e, n) => {
																	let o;
																	if (!(32 & e.o)) {
																		if (((e.o |= 32), n.T)) {
																			const t = ((t) => {
																				const e = t.$.replace(/-/g, '_'),
																					n = t.T;
																				if (!n) return;
																				const o = r.get(n);
																				return o
																					? o[e]
																					: import(`./${n}.entry.js`).then((t) => (r.set(n, t), t[e]), s);
																				/*!__STENCIL_STATIC_IMPORT_SWITCH__*/
																			})(n);
																			if (t && 'then' in t) {
																				const e = () => {};
																				(o = await t), e();
																			} else o = t;
																			if (!o) throw Error(`Constructor for "${n.$}#${e.D}" was not found`);
																			o.isProxied || (it(o, n, 2), (o.isProxied = !0));
																			const l = () => {};
																			e.o |= 8;
																			try {
																				new o(e);
																			} catch (t) {
																				s(t);
																			}
																			(e.o &= -9), l();
																		} else
																			(o = t.constructor),
																				customElements.whenDefined(t.localName).then(() => (e.o |= 128));
																		if (o && o.style) {
																			let t;
																			'string' == typeof o.style && (t = o.style);
																			const e = D(n);
																			if (!i.has(e)) {
																				const o = () => {};
																				((t, e, n) => {
																					let o = i.get(t);
																					p && n
																						? ((o = o || new CSSStyleSheet()),
																							'string' == typeof o ? (o = e) : o.replaceSync(e))
																						: (o = e),
																						i.set(t, o);
																				})(e, t, !!(1 & n.o)),
																					o();
																			}
																		}
																	}
																	const l = e.S,
																		c = () => X(e, !0);
																	l && l['s-rc'] ? l['s-rc'].push(c) : c();
																})(t, e, o);
														}
														l();
													}
												})(this)
											);
							}
							disconnectedCallback() {
								f.jmp(() =>
									(async () => {
										if (!(1 & f.o)) {
											const t = n(this);
											(null == t ? void 0 : t.t) || ((null == t ? void 0 : t.R) && t.R.then(() => {}));
										}
									})()
								);
							}
							componentOnReady() {
								return n(this).R;
							}
						};
					(l.T = t[0]), m.includes(c) || d.get(c) || (h.push(c), d.define(c, it(u, l, 1)));
				});
			}),
			h.length > 0 &&
				(g && (w.textContent += c),
				(w.textContent += h.sort() + '{visibility:hidden}.hydrated{visibility:inherit}'),
				w.innerHTML.length))
		) {
			w.setAttribute('data-styles', '');
			const t = null != (l = f.O) ? l : E(a);
			null != t && w.setAttribute('nonce', t), y.insertBefore(w, $ ? $.nextSibling : y.firstChild);
		}
		(S = !1), b.length ? b.map((t) => t.connectedCallback()) : f.jmp(() => (v = setTimeout(lt, 30)));
	},
	ut = (t) => (f.O = t);
export { ct as b, A as h, h as p, o as r, ut as s };
