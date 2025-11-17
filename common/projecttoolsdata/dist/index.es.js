var r = /* @__PURE__ */ ((t) => (t.INTERN = "Intern", t.JUNIOR = "Junior", t.MIDLEVEL = "Mid-level", t.SENIOR = "Senior", t.LEAD = "Lead", t.PRINCIPAL = "Principal", t))(r || {}), C = { exports: {} }, ce = C.exports, B;
function de() {
  return B || (B = 1, (function(t, e) {
    (function(n, s) {
      s(e);
    })(ce, (function(n) {
      function s(i, a) {
        var o = a !== void 0 ? i : 0, u = a !== void 0 ? a : i;
        if (o > u)
          throw new Error("Invalid values: Minimum boundary on rnd() cannot be higher than maximum boundary: " + o + " - " + u);
        return o === u ? o : Math.floor(Math.random() * (u + 1 - o)) + o;
      }
      function c(i) {
        return i[Math.floor(Math.random() * i.length)];
      }
      function m(i, a, o, u, d) {
        function g(k) {
          return !(typeof u == "number" && k < u || typeof d == "number" && k > d);
        }
        for (var h = i, I = o * 2, V = 0; V < a; V++) {
          var x = s(0, I) - o;
          g(h + x) && (h += x);
        }
        return h;
      }
      function p(i, a, o) {
        if (i > a)
          throw new Error("Invalid value: Minimum cannot be higher than max value. " + i + " - " + a);
        var u = o !== void 0 ? o : 5;
        if (u < 0 || u > 10)
          throw new Error("Invalid ramp value " + u + ": Must be between 0 and 10");
        if (u === 0)
          return s(i, a);
        var d = Math.round(i + (a - i) / 2), g = 11 - u, h = 1 - u / 10, I = Math.round(d * h / 2);
        return m(d, g, I, i, a);
      }
      function l() {
        for (var i = 0, a = 0, o = arguments.length; a < o; a++) i += arguments[a].length;
        for (var u = Array(i), d = 0, a = 0; a < o; a++)
          for (var g = arguments[a], h = 0, I = g.length; h < I; h++, d++)
            u[d] = g[h];
        return u;
      }
      function E(i) {
        for (var a = l(i), o = []; a.length > 0; ) {
          var u = s(0, a.length - 1);
          o.push(a.splice(u, 1)[0]);
        }
        return o;
      }
      function y(i) {
        if (i < 0 || i > 100)
          throw new Error("Invalid value " + i + ". Valid range is between 0-100");
        var a = Math.floor(Math.random() * 100);
        return i > a;
      }
      function M(i, a) {
        var o = Array.isArray(a) ? a : a.rolls;
        return o.reduce(function(u, d) {
          return d >= i ? u + 1 : u;
        }, 0);
      }
      function b(i) {
        var a = Array.isArray(i) ? i : i.rolls;
        return a.reduce(function(o, u) {
          return o + u;
        }, 0);
      }
      function R(i) {
        var a = /(\d*)d(\d+)([\+\-]*)(\d*)/im, o = i.replace(" ", "").match(a), u = Number(o[1] || 1), d = Number(o[2]), g = Number(o[4] || 0), h = o[3] === "-" ? g * -1 : g * 1, I = f(d, u), V = b(I) + h, x = {
          sum: V,
          rolls: I,
          dieType: d
        };
        return x;
      }
      function f(i, a) {
        for (var o = a === void 0 ? 1 : a, u = [], d = 0; d < o; d++)
          u.push(s(1, i));
        return u;
      }
      function K(i) {
        return f(4, i);
      }
      function ee(i) {
        return f(6, i);
      }
      function re(i) {
        return f(8, i);
      }
      function te(i) {
        return f(10, i);
      }
      function ne(i) {
        return f(12, i);
      }
      function ie(i) {
        return f(20, i);
      }
      function se(i) {
        return f(100, i);
      }
      function ae(i, a) {
        var o = s(i, a), u = a !== void 0 ? a.toString().length : i.toString().length, d = o.toString();
        return d.padStart(u, "0");
      }
      function oe(i, a, o) {
        if (o === void 0 && (o = !1), o && i.length <= a)
          return l(i);
        var u = [];
        if (o)
          for (; u.length < a; ) {
            var d = c(i);
            u.includes(d) || u.push(d);
          }
        else
          for (var g = 0; g < a; g++)
            o || u.push(c(i));
        return u;
      }
      var ue = {
        d4: K,
        d6: ee,
        d8: re,
        d10: te,
        d12: ne,
        d20: ie,
        d100: se,
        roll: R
      };
      n.Dice = ue, n.arnd = c, n.arnds = oe, n.chance = y, n.nrnd = p, n.padrnd = ae, n.rnd = s, n.shuffle = E, n.successPool = M, n.sumPool = b, Object.defineProperty(n, "__esModule", { value: !0 });
    }));
  })(C, C.exports)), C.exports;
}
de();
class le extends Error {
}
class v extends le {
  constructor() {
    super("Zone is an abstract class");
  }
}
class j {
  /**
   * The type of zone
   * @abstract
   * @type {string}
   */
  get type() {
    throw new v();
  }
  /**
   * The name of this zone.
   * @abstract
   * @type {string}
   */
  get name() {
    throw new v();
  }
  /**
   * The IANA name of this zone.
   * Defaults to `name` if not overwritten by a subclass.
   * @abstract
   * @type {string}
   */
  get ianaName() {
    return this.name;
  }
  /**
   * Returns whether the offset is known to be fixed for the whole year.
   * @abstract
   * @type {boolean}
   */
  get isUniversal() {
    throw new v();
  }
  /**
   * Returns the offset's common name (such as EST) at the specified timestamp
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to get the name
   * @param {Object} opts - Options to affect the format
   * @param {string} opts.format - What style of offset to return. Accepts 'long' or 'short'.
   * @param {string} opts.locale - What locale to return the offset name in.
   * @return {string}
   */
  offsetName(e, n) {
    throw new v();
  }
  /**
   * Returns the offset's value as a string
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to get the offset
   * @param {string} format - What style of offset to return.
   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
   * @return {string}
   */
  formatOffset(e, n) {
    throw new v();
  }
  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to compute the offset
   * @return {number}
   */
  offset(e) {
    throw new v();
  }
  /**
   * Return whether this Zone is equal to another zone
   * @abstract
   * @param {Zone} otherZone - the zone to compare
   * @return {boolean}
   */
  equals(e) {
    throw new v();
  }
  /**
   * Return whether this Zone is valid.
   * @abstract
   * @type {boolean}
   */
  get isValid() {
    throw new v();
  }
}
const q = /* @__PURE__ */ new Map();
function me(t) {
  let e = q.get(t);
  return e === void 0 && (e = new Intl.DateTimeFormat("en-US", {
    hour12: !1,
    timeZone: t,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    era: "short"
  }), q.set(t, e)), e;
}
const pe = {
  year: 0,
  month: 1,
  day: 2,
  era: 3,
  hour: 4,
  minute: 5,
  second: 6
};
function fe(t, e) {
  const n = t.format(e).replace(/\u200E/g, ""), s = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(n), [, c, m, p, l, E, y, M] = s;
  return [p, c, m, l, E, y, M];
}
function ge(t, e) {
  const n = t.formatToParts(e), s = [];
  for (let c = 0; c < n.length; c++) {
    const { type: m, value: p } = n[c], l = pe[m];
    m === "era" ? s[l] = p : U(l) || (s[l] = parseInt(p, 10));
  }
  return s;
}
const J = /* @__PURE__ */ new Map();
class $ extends j {
  /**
   * @param {string} name - Zone name
   * @return {IANAZone}
   */
  static create(e) {
    let n = J.get(e);
    return n === void 0 && J.set(e, n = new $(e)), n;
  }
  /**
   * Reset local caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  static resetCache() {
    J.clear(), q.clear();
  }
  /**
   * Returns whether the provided string is a valid specifier. This only checks the string's format, not that the specifier identifies a known zone; see isValidZone for that.
   * @param {string} s - The string to check validity on
   * @example IANAZone.isValidSpecifier("America/New_York") //=> true
   * @example IANAZone.isValidSpecifier("Sport~~blorp") //=> false
   * @deprecated For backward compatibility, this forwards to isValidZone, better use `isValidZone()` directly instead.
   * @return {boolean}
   */
  static isValidSpecifier(e) {
    return this.isValidZone(e);
  }
  /**
   * Returns whether the provided string identifies a real zone
   * @param {string} zone - The string to check
   * @example IANAZone.isValidZone("America/New_York") //=> true
   * @example IANAZone.isValidZone("Fantasia/Castle") //=> false
   * @example IANAZone.isValidZone("Sport~~blorp") //=> false
   * @return {boolean}
   */
  static isValidZone(e) {
    if (!e)
      return !1;
    try {
      return new Intl.DateTimeFormat("en-US", { timeZone: e }).format(), !0;
    } catch {
      return !1;
    }
  }
  constructor(e) {
    super(), this.zoneName = e, this.valid = $.isValidZone(e);
  }
  /**
   * The type of zone. `iana` for all instances of `IANAZone`.
   * @override
   * @type {string}
   */
  get type() {
    return "iana";
  }
  /**
   * The name of this zone (i.e. the IANA zone name).
   * @override
   * @type {string}
   */
  get name() {
    return this.zoneName;
  }
  /**
   * Returns whether the offset is known to be fixed for the whole year:
   * Always returns false for all IANA zones.
   * @override
   * @type {boolean}
   */
  get isUniversal() {
    return !1;
  }
  /**
   * Returns the offset's common name (such as EST) at the specified timestamp
   * @override
   * @param {number} ts - Epoch milliseconds for which to get the name
   * @param {Object} opts - Options to affect the format
   * @param {string} opts.format - What style of offset to return. Accepts 'long' or 'short'.
   * @param {string} opts.locale - What locale to return the offset name in.
   * @return {string}
   */
  offsetName(e, { format: n, locale: s }) {
    return Ie(e, n, s, this.name);
  }
  /**
   * Returns the offset's value as a string
   * @override
   * @param {number} ts - Epoch milliseconds for which to get the offset
   * @param {string} format - What style of offset to return.
   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
   * @return {string}
   */
  formatOffset(e, n) {
    return T(this.offset(e), n);
  }
  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   * @override
   * @param {number} ts - Epoch milliseconds for which to compute the offset
   * @return {number}
   */
  offset(e) {
    if (!this.valid) return NaN;
    const n = new Date(e);
    if (isNaN(n)) return NaN;
    const s = me(this.name);
    let [c, m, p, l, E, y, M] = s.formatToParts ? ge(s, n) : fe(s, n);
    l === "BC" && (c = -Math.abs(c) + 1);
    const b = Ee({
      year: c,
      month: m,
      day: p,
      hour: E === 24 ? 0 : E,
      minute: y,
      second: M,
      millisecond: 0
    });
    let R = +n;
    const f = R % 1e3;
    return R -= f >= 0 ? f : 1e3 + f, (b - R) / (60 * 1e3);
  }
  /**
   * Return whether this Zone is equal to another zone
   * @override
   * @param {Zone} otherZone - the zone to compare
   * @return {boolean}
   */
  equals(e) {
    return e.type === "iana" && e.name === this.name;
  }
  /**
   * Return whether this Zone is valid.
   * @override
   * @type {boolean}
   */
  get isValid() {
    return this.valid;
  }
}
let Z = null;
class D extends j {
  /**
   * Get a singleton instance of UTC
   * @return {FixedOffsetZone}
   */
  static get utcInstance() {
    return Z === null && (Z = new D(0)), Z;
  }
  /**
   * Get an instance with a specified offset
   * @param {number} offset - The offset in minutes
   * @return {FixedOffsetZone}
   */
  static instance(e) {
    return e === 0 ? D.utcInstance : new D(e);
  }
  /**
   * Get an instance of FixedOffsetZone from a UTC offset string, like "UTC+6"
   * @param {string} s - The offset string to parse
   * @example FixedOffsetZone.parseSpecifier("UTC+6")
   * @example FixedOffsetZone.parseSpecifier("UTC+06")
   * @example FixedOffsetZone.parseSpecifier("UTC-6:00")
   * @return {FixedOffsetZone}
   */
  static parseSpecifier(e) {
    if (e) {
      const n = e.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
      if (n)
        return new D(Q(n[1], n[2]));
    }
    return null;
  }
  constructor(e) {
    super(), this.fixed = e;
  }
  /**
   * The type of zone. `fixed` for all instances of `FixedOffsetZone`.
   * @override
   * @type {string}
   */
  get type() {
    return "fixed";
  }
  /**
   * The name of this zone.
   * All fixed zones' names always start with "UTC" (plus optional offset)
   * @override
   * @type {string}
   */
  get name() {
    return this.fixed === 0 ? "UTC" : `UTC${T(this.fixed, "narrow")}`;
  }
  /**
   * The IANA name of this zone, i.e. `Etc/UTC` or `Etc/GMT+/-nn`
   *
   * @override
   * @type {string}
   */
  get ianaName() {
    return this.fixed === 0 ? "Etc/UTC" : `Etc/GMT${T(-this.fixed, "narrow")}`;
  }
  /**
   * Returns the offset's common name at the specified timestamp.
   *
   * For fixed offset zones this equals to the zone name.
   * @override
   */
  offsetName() {
    return this.name;
  }
  /**
   * Returns the offset's value as a string
   * @override
   * @param {number} ts - Epoch milliseconds for which to get the offset
   * @param {string} format - What style of offset to return.
   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
   * @return {string}
   */
  formatOffset(e, n) {
    return T(this.fixed, n);
  }
  /**
   * Returns whether the offset is known to be fixed for the whole year:
   * Always returns true for all fixed offset zones.
   * @override
   * @type {boolean}
   */
  get isUniversal() {
    return !0;
  }
  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   *
   * For fixed offset zones, this is constant and does not depend on a timestamp.
   * @override
   * @return {number}
   */
  offset() {
    return this.fixed;
  }
  /**
   * Return whether this Zone is equal to another zone (i.e. also fixed and same offset)
   * @override
   * @param {Zone} otherZone - the zone to compare
   * @return {boolean}
   */
  equals(e) {
    return e.type === "fixed" && e.fixed === this.fixed;
  }
  /**
   * Return whether this Zone is valid:
   * All fixed offset zones are valid.
   * @override
   * @type {boolean}
   */
  get isValid() {
    return !0;
  }
}
function U(t) {
  return typeof t > "u";
}
function P(t, e = 2) {
  const n = t < 0;
  let s;
  return n ? s = "-" + ("" + -t).padStart(e, "0") : s = ("" + t).padStart(e, "0"), s;
}
function F(t) {
  if (!(U(t) || t === null || t === ""))
    return parseInt(t, 10);
}
function he(t) {
  if (!(U(t) || t === null || t === "")) {
    const e = parseFloat("0." + t) * 1e3;
    return Math.floor(e);
  }
}
function Ee(t) {
  let e = Date.UTC(
    t.year,
    t.month - 1,
    t.day,
    t.hour,
    t.minute,
    t.second,
    t.millisecond
  );
  return t.year < 100 && t.year >= 0 && (e = new Date(e), e.setUTCFullYear(t.year, t.month - 1, t.day)), +e;
}
function Ie(t, e, n, s = null) {
  const c = new Date(t), m = {
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  };
  s && (m.timeZone = s);
  const p = { timeZoneName: e, ...m }, l = new Intl.DateTimeFormat(n, p).formatToParts(c).find((E) => E.type.toLowerCase() === "timezonename");
  return l ? l.value : null;
}
function Q(t, e) {
  let n = parseInt(t, 10);
  Number.isNaN(n) && (n = 0);
  const s = parseInt(e, 10) || 0, c = n < 0 || Object.is(n, -0) ? -s : s;
  return n * 60 + c;
}
function T(t, e) {
  const n = Math.trunc(Math.abs(t / 60)), s = Math.trunc(Math.abs(t % 60)), c = t >= 0 ? "+" : "-";
  switch (e) {
    case "short":
      return `${c}${P(n, 2)}:${P(s, 2)}`;
    case "narrow":
      return `${c}${n}${s > 0 ? `:${s}` : ""}`;
    case "techie":
      return `${c}${P(n, 2)}${P(s, 2)}`;
    default:
      throw new RangeError(`Value format ${e} is out of range for property format`);
  }
}
const G = /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;
function N(...t) {
  const e = t.reduce((n, s) => n + s.source, "");
  return RegExp(`^${e}$`);
}
function A(...t) {
  return (e) => t.reduce(
    ([n, s, c], m) => {
      const [p, l, E] = m(e, c);
      return [{ ...n, ...p }, l || s, E];
    },
    [{}, null, 1]
  ).slice(0, 2);
}
function W(...t) {
  return (e, n) => {
    const s = {};
    let c;
    for (c = 0; c < t.length; c++)
      s[t[c]] = F(e[n + c]);
    return [s, null, n + c];
  };
}
const _ = /(?:([Zz])|([+-]\d\d)(?::?(\d\d))?)/, ve = `(?:${_.source}?(?:\\[(${G.source})\\])?)?`, X = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/, Y = RegExp(`${X.source}${ve}`), z = RegExp(`(?:[Tt]${Y.source})?`), De = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/, Le = /(\d{4})-?W(\d\d)(?:-?(\d))?/, Ne = /(\d{4})-?(\d{3})/, Ae = W("weekYear", "weekNumber", "weekDay"), we = W("year", "ordinal"), ye = /(\d{4})-(\d\d)-(\d\d)/, H = RegExp(
  `${X.source} ?(?:${_.source}|(${G.source}))?`
), Me = RegExp(`(?: ${H.source})?`);
function L(t, e, n) {
  const s = t[e];
  return U(s) ? n : F(s);
}
function Re(t, e) {
  return [{
    year: L(t, e),
    month: L(t, e + 1, 1),
    day: L(t, e + 2, 1)
  }, null, e + 3];
}
function w(t, e) {
  return [{
    hours: L(t, e, 0),
    minutes: L(t, e + 1, 0),
    seconds: L(t, e + 2, 0),
    milliseconds: he(t[e + 3])
  }, null, e + 4];
}
function S(t, e) {
  const n = !t[e] && !t[e + 1], s = Q(t[e + 1], t[e + 2]), c = n ? null : D.instance(s);
  return [{}, c, e + 3];
}
function O(t, e) {
  const n = t[e] ? $.create(t[e]) : null;
  return [{}, n, e + 1];
}
N(De, z);
N(Le, z);
N(Ne, z);
N(Y);
A(
  Re,
  w,
  S,
  O
);
A(
  Ae,
  w,
  S,
  O
);
A(
  we,
  w,
  S,
  O
);
A(
  w,
  S,
  O
);
A(w);
N(ye, Me);
N(H);
A(
  w,
  S,
  O
);
const Se = [
  // Management
  {
    id: "role-manager-project",
    name: "Project Manager",
    groups: ["Management"],
    seniorities: [r.MIDLEVEL, r.SENIOR, r.LEAD],
    description: "Oversees project planning, execution, and delivery, ensuring goals are met on time and within budget."
  },
  {
    id: "role-manager-product",
    name: "Product Manager",
    groups: ["Management"],
    seniorities: [r.MIDLEVEL, r.SENIOR, r.LEAD],
    description: "Defines product vision, strategy, and roadmap, and coordinates cross-functional teams to deliver product success."
  },
  {
    id: "role-manager-scrum",
    name: "Scrum Master",
    groups: ["Management"],
    seniorities: [r.JUNIOR, r.MIDLEVEL, r.SENIOR],
    description: "Facilitates Agile processes, removes impediments, and supports the Scrum team in delivering value."
  },
  {
    id: "role-services-manager",
    name: "Services Manager",
    groups: ["Management"],
    seniorities: [r.MIDLEVEL, r.SENIOR],
    description: "Manages service delivery, client relationships, and ensures high-quality support and operations."
  },
  {
    id: "role-release-manager",
    name: "Release Manager",
    groups: ["Management"],
    seniorities: [r.MIDLEVEL, r.SENIOR],
    description: "Coordinates software releases, deployment schedules, and ensures smooth delivery to production."
  },
  // Developers
  {
    id: "role-dev-frontend",
    name: "Frontend Developer",
    groups: ["Developers"],
    seniorities: [
      r.JUNIOR,
      r.MIDLEVEL,
      r.SENIOR,
      r.LEAD,
      r.PRINCIPAL
    ],
    description: "Builds and maintains user interfaces and client-side logic for web and mobile applications."
  },
  {
    id: "role-dev-backend",
    name: "Backend Developer",
    groups: ["Developers"],
    seniorities: [
      r.JUNIOR,
      r.MIDLEVEL,
      r.SENIOR,
      r.LEAD,
      r.PRINCIPAL
    ],
    description: "Develops server-side logic, APIs, and database interactions to support application functionality."
  },
  {
    id: "role-dev-fullstack",
    name: "Fullstack Developer",
    groups: ["Developers"],
    seniorities: [
      r.JUNIOR,
      r.MIDLEVEL,
      r.SENIOR,
      r.LEAD,
      r.PRINCIPAL
    ],
    description: "Works across both frontend and backend, delivering end-to-end solutions for applications."
  },
  // QA
  {
    id: "role-qa-tester",
    name: "QA Tester",
    groups: ["QA"],
    seniorities: [r.JUNIOR, r.MIDLEVEL, r.SENIOR],
    description: "Tests software to identify bugs, ensure quality, and verify requirements are met."
  },
  {
    id: "role-qa-automation",
    name: "QA Automation Engineer",
    groups: ["QA"],
    seniorities: [r.MIDLEVEL, r.SENIOR, r.LEAD],
    description: "Designs, develops, and maintains automated test scripts and frameworks."
  },
  // Design
  {
    id: "role-design-ux",
    name: "UX Designer",
    groups: ["Design"],
    seniorities: [r.JUNIOR, r.MIDLEVEL, r.SENIOR],
    description: "Researches and designs user experiences to ensure products are intuitive and user-friendly."
  },
  {
    id: "role-design-ui",
    name: "UI Designer",
    groups: ["Design"],
    seniorities: [r.JUNIOR, r.MIDLEVEL, r.SENIOR],
    description: "Creates visually appealing and effective user interfaces for digital products."
  },
  {
    id: "role-design-graphic",
    name: "Graphic Designer",
    groups: ["Design"],
    seniorities: [r.JUNIOR, r.MIDLEVEL, r.SENIOR],
    description: "Designs graphics, illustrations, and visual assets for branding and communication."
  },
  {
    id: "role-services-designer",
    name: "Services Designer",
    groups: ["Design"],
    seniorities: [r.MIDLEVEL, r.SENIOR],
    description: "Designs and optimizes service processes and customer journeys for better experiences."
  },
  // DevOps
  {
    id: "role-devops-engineer",
    name: "DevOps Engineer",
    groups: ["DevOps"],
    seniorities: [r.MIDLEVEL, r.SENIOR, r.LEAD],
    description: "Implements CI/CD pipelines, manages infrastructure, and ensures reliable deployments."
  },
  {
    id: "role-devops-security",
    name: "Security Engineer",
    groups: ["DevOps"],
    seniorities: [r.SENIOR, r.LEAD, r.PRINCIPAL],
    description: "Secures systems, applications, and infrastructure against threats and vulnerabilities."
  },
  // Architecture
  {
    id: "role-arch-software",
    name: "Software Architect",
    groups: ["Architecture"],
    seniorities: [r.MIDLEVEL, r.SENIOR, r.LEAD, r.PRINCIPAL],
    description: "Designs software systems, sets technical direction, and ensures architectural integrity."
  },
  {
    id: "role-arch-systems",
    name: "Systems Architect",
    groups: ["Architecture"],
    seniorities: [r.MIDLEVEL, r.SENIOR, r.LEAD, r.PRINCIPAL],
    description: "Designs and integrates complex IT systems and infrastructure."
  },
  {
    id: "role-arch-cloud",
    name: "Cloud Architect",
    groups: ["Architecture"],
    seniorities: [r.MIDLEVEL, r.SENIOR, r.LEAD, r.PRINCIPAL],
    description: "Architects cloud solutions, manages cloud infrastructure, and ensures scalability and security."
  },
  {
    id: "role-arch-data",
    name: "Data Architect",
    groups: ["Architecture"],
    seniorities: [r.MIDLEVEL, r.SENIOR, r.LEAD, r.PRINCIPAL],
    description: "Designs data models, databases, and data flows for effective data management."
  },
  {
    id: "role-arch-enterprise",
    name: "Enterprise Architect",
    groups: ["Architecture"],
    seniorities: [r.MIDLEVEL, r.SENIOR, r.LEAD, r.PRINCIPAL],
    description: "Aligns IT strategy with business goals, overseeing enterprise-wide architecture."
  },
  {
    id: "role-arch-security",
    name: "Security Architect",
    groups: ["Architecture"],
    seniorities: [r.MIDLEVEL, r.SENIOR, r.LEAD, r.PRINCIPAL],
    description: "Designs security architecture and policies to protect systems and data."
  },
  {
    id: "role-arch-solution",
    name: "Solution Architect",
    groups: ["Architecture"],
    seniorities: [r.MIDLEVEL, r.SENIOR, r.LEAD, r.PRINCIPAL],
    description: "Designs end-to-end solutions, integrating systems and technologies to meet business needs."
  },
  // Other
  {
    id: "role-business-analyst",
    name: "Business Analyst",
    groups: [],
    seniorities: [r.MIDLEVEL, r.SENIOR],
    description: "Analyzes business processes, gathers requirements, and bridges the gap between stakeholders and development teams."
  },
  {
    id: "role-dev-intern",
    name: "Development Intern",
    groups: [],
    seniorities: [r.INTERN],
    description: "Assists development teams with basic tasks and learns software development practices."
  },
  {
    id: "role-technical-writer",
    name: "Technical Writer",
    groups: [],
    seniorities: [r.JUNIOR, r.MIDLEVEL, r.SENIOR],
    description: "Creates and maintains technical documentation, manuals, and guides for products and systems."
  }
];
export {
  Se as DATA_PROJECT_ROLES
};
