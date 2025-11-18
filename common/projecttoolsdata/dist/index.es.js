var t = /* @__PURE__ */ ((e) => (e.INTERN = "Intern", e.JUNIOR = "Junior", e.MIDLEVEL = "Mid-level", e.SENIOR = "Senior", e.LEAD = "Lead", e.PRINCIPAL = "Principal", e))(t || {}), n = /* @__PURE__ */ ((e) => (e.LANGUAGE = "Programming Language", e.FRAMEWORK = "Framework", e.SERVICE = "Service", e.LIBRARY = "Library", e.DATABASE = "Database", e.TOOL = "Tool", e.PLATFORM = "Platform", e.OTHER = "Other", e))(n || {}), a = /* @__PURE__ */ ((e) => (e.FRONTEND = "Frontend", e.BACKEND = "Backend", e.DATABASE = "Database", e.INFRA = "Infrastructure", e.NETWORK = "Network", e.SECURITY = "Security", e.NONE = "None", e.OTHER = "Other", e))(a || {}), V = { exports: {} }, pe = V.exports, W;
function le() {
  return W || (W = 1, (function(e, r) {
    (function(i, s) {
      s(r);
    })(pe, (function(i) {
      function s(o, c) {
        var d = c !== void 0 ? o : 0, u = c !== void 0 ? c : o;
        if (d > u)
          throw new Error("Invalid values: Minimum boundary on rnd() cannot be higher than maximum boundary: " + d + " - " + u);
        return d === u ? d : Math.floor(Math.random() * (u + 1 - d)) + d;
      }
      function p(o) {
        return o[Math.floor(Math.random() * o.length)];
      }
      function m(o, c, d, u, l) {
        function h($) {
          return !(typeof u == "number" && $ < u || typeof l == "number" && $ > l);
        }
        for (var y = o, L = d * 2, P = 0; P < c; P++) {
          var B = s(0, L) - d;
          h(y + B) && (y += B);
        }
        return y;
      }
      function f(o, c, d) {
        if (o > c)
          throw new Error("Invalid value: Minimum cannot be higher than max value. " + o + " - " + c);
        var u = d !== void 0 ? d : 5;
        if (u < 0 || u > 10)
          throw new Error("Invalid ramp value " + u + ": Must be between 0 and 10");
        if (u === 0)
          return s(o, c);
        var l = Math.round(o + (c - o) / 2), h = 11 - u, y = 1 - u / 10, L = Math.round(l * y / 2);
        return m(l, h, L, o, c);
      }
      function g() {
        for (var o = 0, c = 0, d = arguments.length; c < d; c++) o += arguments[c].length;
        for (var u = Array(o), l = 0, c = 0; c < d; c++)
          for (var h = arguments[c], y = 0, L = h.length; y < L; y++, l++)
            u[l] = h[y];
        return u;
      }
      function E(o) {
        for (var c = g(o), d = []; c.length > 0; ) {
          var u = s(0, c.length - 1);
          d.push(c.splice(u, 1)[0]);
        }
        return d;
      }
      function b(o) {
        if (o < 0 || o > 100)
          throw new Error("Invalid value " + o + ". Valid range is between 0-100");
        var c = Math.floor(Math.random() * 100);
        return o > c;
      }
      function S(o, c) {
        var d = Array.isArray(c) ? c : c.rolls;
        return d.reduce(function(u, l) {
          return l >= o ? u + 1 : u;
        }, 0);
      }
      function C(o) {
        var c = Array.isArray(o) ? o : o.rolls;
        return c.reduce(function(d, u) {
          return d + u;
        }, 0);
      }
      function T(o) {
        var c = /(\d*)d(\d+)([\+\-]*)(\d*)/im, d = o.replace(" ", "").match(c), u = Number(d[1] || 1), l = Number(d[2]), h = Number(d[4] || 0), y = d[3] === "-" ? h * -1 : h * 1, L = A(l, u), P = C(L) + y, B = {
          sum: P,
          rolls: L,
          dieType: l
        };
        return B;
      }
      function A(o, c) {
        for (var d = c === void 0 ? 1 : c, u = [], l = 0; l < d; l++)
          u.push(s(1, o));
        return u;
      }
      function re(o) {
        return A(4, o);
      }
      function te(o) {
        return A(6, o);
      }
      function ne(o) {
        return A(8, o);
      }
      function ae(o) {
        return A(10, o);
      }
      function ie(o) {
        return A(12, o);
      }
      function oe(o) {
        return A(20, o);
      }
      function se(o) {
        return A(100, o);
      }
      function ce(o, c) {
        var d = s(o, c), u = c !== void 0 ? c.toString().length : o.toString().length, l = d.toString();
        return l.padStart(u, "0");
      }
      function de(o, c, d) {
        if (d === void 0 && (d = !1), d && o.length <= c)
          return g(o);
        var u = [];
        if (d)
          for (; u.length < c; ) {
            var l = p(o);
            u.includes(l) || u.push(l);
          }
        else
          for (var h = 0; h < c; h++)
            d || u.push(p(o));
        return u;
      }
      var ue = {
        d4: re,
        d6: te,
        d8: ne,
        d10: ae,
        d12: ie,
        d20: oe,
        d100: se,
        roll: T
      };
      i.Dice = ue, i.arnd = p, i.arnds = de, i.chance = b, i.nrnd = f, i.padrnd = ce, i.rnd = s, i.shuffle = E, i.successPool = S, i.sumPool = C, Object.defineProperty(i, "__esModule", { value: !0 });
    }));
  })(V, V.exports)), V.exports;
}
le();
class ge extends Error {
}
class v extends ge {
  constructor() {
    super("Zone is an abstract class");
  }
}
class z {
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
  offsetName(r, i) {
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
  formatOffset(r, i) {
    throw new v();
  }
  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to compute the offset
   * @return {number}
   */
  offset(r) {
    throw new v();
  }
  /**
   * Return whether this Zone is equal to another zone
   * @abstract
   * @param {Zone} otherZone - the zone to compare
   * @return {boolean}
   */
  equals(r) {
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
const G = /* @__PURE__ */ new Map();
function me(e) {
  let r = G.get(e);
  return r === void 0 && (r = new Intl.DateTimeFormat("en-US", {
    hour12: !1,
    timeZone: e,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    era: "short"
  }), G.set(e, r)), r;
}
const fe = {
  year: 0,
  month: 1,
  day: 2,
  era: 3,
  hour: 4,
  minute: 5,
  second: 6
};
function Ae(e, r) {
  const i = e.format(r).replace(/\u200E/g, ""), s = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(i), [, p, m, f, g, E, b, S] = s;
  return [f, p, m, g, E, b, S];
}
function he(e, r) {
  const i = e.formatToParts(r), s = [];
  for (let p = 0; p < i.length; p++) {
    const { type: m, value: f } = i[p], g = fe[m];
    m === "era" ? s[g] = f : U(g) || (s[g] = parseInt(f, 10));
  }
  return s;
}
const K = /* @__PURE__ */ new Map();
class x extends z {
  /**
   * @param {string} name - Zone name
   * @return {IANAZone}
   */
  static create(r) {
    let i = K.get(r);
    return i === void 0 && K.set(r, i = new x(r)), i;
  }
  /**
   * Reset local caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  static resetCache() {
    K.clear(), G.clear();
  }
  /**
   * Returns whether the provided string is a valid specifier. This only checks the string's format, not that the specifier identifies a known zone; see isValidZone for that.
   * @param {string} s - The string to check validity on
   * @example IANAZone.isValidSpecifier("America/New_York") //=> true
   * @example IANAZone.isValidSpecifier("Sport~~blorp") //=> false
   * @deprecated For backward compatibility, this forwards to isValidZone, better use `isValidZone()` directly instead.
   * @return {boolean}
   */
  static isValidSpecifier(r) {
    return this.isValidZone(r);
  }
  /**
   * Returns whether the provided string identifies a real zone
   * @param {string} zone - The string to check
   * @example IANAZone.isValidZone("America/New_York") //=> true
   * @example IANAZone.isValidZone("Fantasia/Castle") //=> false
   * @example IANAZone.isValidZone("Sport~~blorp") //=> false
   * @return {boolean}
   */
  static isValidZone(r) {
    if (!r)
      return !1;
    try {
      return new Intl.DateTimeFormat("en-US", { timeZone: r }).format(), !0;
    } catch {
      return !1;
    }
  }
  constructor(r) {
    super(), this.zoneName = r, this.valid = x.isValidZone(r);
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
  offsetName(r, { format: i, locale: s }) {
    return Le(r, i, s, this.name);
  }
  /**
   * Returns the offset's value as a string
   * @override
   * @param {number} ts - Epoch milliseconds for which to get the offset
   * @param {string} format - What style of offset to return.
   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
   * @return {string}
   */
  formatOffset(r, i) {
    return k(this.offset(r), i);
  }
  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   * @override
   * @param {number} ts - Epoch milliseconds for which to compute the offset
   * @return {number}
   */
  offset(r) {
    if (!this.valid) return NaN;
    const i = new Date(r);
    if (isNaN(i)) return NaN;
    const s = me(this.name);
    let [p, m, f, g, E, b, S] = s.formatToParts ? he(s, i) : Ae(s, i);
    g === "BC" && (p = -Math.abs(p) + 1);
    const C = Ee({
      year: p,
      month: m,
      day: f,
      hour: E === 24 ? 0 : E,
      minute: b,
      second: S,
      millisecond: 0
    });
    let T = +i;
    const A = T % 1e3;
    return T -= A >= 0 ? A : 1e3 + A, (C - T) / (60 * 1e3);
  }
  /**
   * Return whether this Zone is equal to another zone
   * @override
   * @param {Zone} otherZone - the zone to compare
   * @return {boolean}
   */
  equals(r) {
    return r.type === "iana" && r.name === this.name;
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
let J = null;
class N extends z {
  /**
   * Get a singleton instance of UTC
   * @return {FixedOffsetZone}
   */
  static get utcInstance() {
    return J === null && (J = new N(0)), J;
  }
  /**
   * Get an instance with a specified offset
   * @param {number} offset - The offset in minutes
   * @return {FixedOffsetZone}
   */
  static instance(r) {
    return r === 0 ? N.utcInstance : new N(r);
  }
  /**
   * Get an instance of FixedOffsetZone from a UTC offset string, like "UTC+6"
   * @param {string} s - The offset string to parse
   * @example FixedOffsetZone.parseSpecifier("UTC+6")
   * @example FixedOffsetZone.parseSpecifier("UTC+06")
   * @example FixedOffsetZone.parseSpecifier("UTC-6:00")
   * @return {FixedOffsetZone}
   */
  static parseSpecifier(r) {
    if (r) {
      const i = r.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
      if (i)
        return new N(q(i[1], i[2]));
    }
    return null;
  }
  constructor(r) {
    super(), this.fixed = r;
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
    return this.fixed === 0 ? "UTC" : `UTC${k(this.fixed, "narrow")}`;
  }
  /**
   * The IANA name of this zone, i.e. `Etc/UTC` or `Etc/GMT+/-nn`
   *
   * @override
   * @type {string}
   */
  get ianaName() {
    return this.fixed === 0 ? "Etc/UTC" : `Etc/GMT${k(-this.fixed, "narrow")}`;
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
  formatOffset(r, i) {
    return k(this.fixed, i);
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
  equals(r) {
    return r.type === "fixed" && r.fixed === this.fixed;
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
function U(e) {
  return typeof e > "u";
}
function F(e, r = 2) {
  const i = e < 0;
  let s;
  return i ? s = "-" + ("" + -e).padStart(r, "0") : s = ("" + e).padStart(r, "0"), s;
}
function Y(e) {
  if (!(U(e) || e === null || e === ""))
    return parseInt(e, 10);
}
function ye(e) {
  if (!(U(e) || e === null || e === "")) {
    const r = parseFloat("0." + e) * 1e3;
    return Math.floor(r);
  }
}
function Ee(e) {
  let r = Date.UTC(
    e.year,
    e.month - 1,
    e.day,
    e.hour,
    e.minute,
    e.second,
    e.millisecond
  );
  return e.year < 100 && e.year >= 0 && (r = new Date(r), r.setUTCFullYear(e.year, e.month - 1, e.day)), +r;
}
function Le(e, r, i, s = null) {
  const p = new Date(e), m = {
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  };
  s && (m.timeZone = s);
  const f = { timeZoneName: r, ...m }, g = new Intl.DateTimeFormat(i, f).formatToParts(p).find((E) => E.type.toLowerCase() === "timezonename");
  return g ? g.value : null;
}
function q(e, r) {
  let i = parseInt(e, 10);
  Number.isNaN(i) && (i = 0);
  const s = parseInt(r, 10) || 0, p = i < 0 || Object.is(i, -0) ? -s : s;
  return i * 60 + p;
}
function k(e, r) {
  const i = Math.trunc(Math.abs(e / 60)), s = Math.trunc(Math.abs(e % 60)), p = e >= 0 ? "+" : "-";
  switch (r) {
    case "short":
      return `${p}${F(i, 2)}:${F(s, 2)}`;
    case "narrow":
      return `${p}${i}${s > 0 ? `:${s}` : ""}`;
    case "techie":
      return `${p}${F(i, 2)}${F(s, 2)}`;
    default:
      throw new RangeError(`Value format ${r} is out of range for property format`);
  }
}
const Z = /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;
function I(...e) {
  const r = e.reduce((i, s) => i + s.source, "");
  return RegExp(`^${r}$`);
}
function D(...e) {
  return (r) => e.reduce(
    ([i, s, p], m) => {
      const [f, g, E] = m(r, p);
      return [{ ...i, ...f }, g || s, E];
    },
    [{}, null, 1]
  ).slice(0, 2);
}
function Q(...e) {
  return (r, i) => {
    const s = {};
    let p;
    for (p = 0; p < e.length; p++)
      s[e[p]] = Y(r[i + p]);
    return [s, null, i + p];
  };
}
const H = /(?:([Zz])|([+-]\d\d)(?::?(\d\d))?)/, ve = `(?:${H.source}?(?:\\[(${Z.source})\\])?)?`, _ = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/, X = RegExp(`${_.source}${ve}`), j = RegExp(`(?:[Tt]${X.source})?`), Ne = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/, Re = /(\d{4})-?W(\d\d)(?:-?(\d))?/, Ie = /(\d{4})-?(\d{3})/, De = Q("weekYear", "weekNumber", "weekDay"), Oe = Q("year", "ordinal"), be = /(\d{4})-(\d\d)-(\d\d)/, ee = RegExp(
  `${_.source} ?(?:${H.source}|(${Z.source}))?`
), Se = RegExp(`(?: ${ee.source})?`);
function R(e, r, i) {
  const s = e[r];
  return U(s) ? i : Y(s);
}
function Te(e, r) {
  return [{
    year: R(e, r),
    month: R(e, r + 1, 1),
    day: R(e, r + 2, 1)
  }, null, r + 3];
}
function O(e, r) {
  return [{
    hours: R(e, r, 0),
    minutes: R(e, r + 1, 0),
    seconds: R(e, r + 2, 0),
    milliseconds: ye(e[r + 3])
  }, null, r + 4];
}
function w(e, r) {
  const i = !e[r] && !e[r + 1], s = q(e[r + 1], e[r + 2]), p = i ? null : N.instance(s);
  return [{}, p, r + 3];
}
function M(e, r) {
  const i = e[r] ? x.create(e[r]) : null;
  return [{}, i, r + 1];
}
I(Ne, j);
I(Re, j);
I(Ie, j);
I(X);
D(
  Te,
  O,
  w,
  M
);
D(
  De,
  O,
  w,
  M
);
D(
  Oe,
  O,
  w,
  M
);
D(
  O,
  w,
  M
);
D(O);
I(be, Se);
I(ee);
D(
  O,
  w,
  M
);
const we = [
  // Management
  {
    id: "role-manager-project",
    name: "Project Manager",
    groups: ["Management"],
    seniorities: [t.MIDLEVEL, t.SENIOR, t.LEAD],
    description: "Oversees project planning, execution, and delivery, ensuring goals are met on time and within budget."
  },
  {
    id: "role-manager-product",
    name: "Product Manager",
    groups: ["Management"],
    seniorities: [t.MIDLEVEL, t.SENIOR, t.LEAD],
    description: "Defines product vision, strategy, and roadmap, and coordinates cross-functional teams to deliver product success."
  },
  {
    id: "role-manager-scrum",
    name: "Scrum Master",
    groups: ["Management"],
    seniorities: [t.JUNIOR, t.MIDLEVEL, t.SENIOR],
    description: "Facilitates Agile processes, removes impediments, and supports the Scrum team in delivering value."
  },
  {
    id: "role-services-manager",
    name: "Services Manager",
    groups: ["Management"],
    seniorities: [t.MIDLEVEL, t.SENIOR],
    description: "Manages service delivery, client relationships, and ensures high-quality support and operations."
  },
  {
    id: "role-release-manager",
    name: "Release Manager",
    groups: ["Management"],
    seniorities: [t.MIDLEVEL, t.SENIOR],
    description: "Coordinates software releases, deployment schedules, and ensures smooth delivery to production."
  },
  // Developers
  {
    id: "role-dev-frontend",
    name: "Frontend Developer",
    groups: ["Developers"],
    seniorities: [
      t.JUNIOR,
      t.MIDLEVEL,
      t.SENIOR,
      t.LEAD,
      t.PRINCIPAL
    ],
    description: "Builds and maintains user interfaces and client-side logic for web and mobile applications."
  },
  {
    id: "role-dev-backend",
    name: "Backend Developer",
    groups: ["Developers"],
    seniorities: [
      t.JUNIOR,
      t.MIDLEVEL,
      t.SENIOR,
      t.LEAD,
      t.PRINCIPAL
    ],
    description: "Develops server-side logic, APIs, and database interactions to support application functionality."
  },
  {
    id: "role-dev-fullstack",
    name: "Fullstack Developer",
    groups: ["Developers"],
    seniorities: [
      t.JUNIOR,
      t.MIDLEVEL,
      t.SENIOR,
      t.LEAD,
      t.PRINCIPAL
    ],
    description: "Works across both frontend and backend, delivering end-to-end solutions for applications."
  },
  // QA
  {
    id: "role-qa-tester",
    name: "QA Tester",
    groups: ["QA"],
    seniorities: [t.JUNIOR, t.MIDLEVEL, t.SENIOR],
    description: "Tests software to identify bugs, ensure quality, and verify requirements are met."
  },
  {
    id: "role-qa-automation",
    name: "QA Automation Engineer",
    groups: ["QA"],
    seniorities: [t.MIDLEVEL, t.SENIOR, t.LEAD],
    description: "Designs, develops, and maintains automated test scripts and frameworks."
  },
  // Design
  {
    id: "role-design-ux",
    name: "UX Designer",
    groups: ["Design"],
    seniorities: [t.JUNIOR, t.MIDLEVEL, t.SENIOR],
    description: "Researches and designs user experiences to ensure products are intuitive and user-friendly."
  },
  {
    id: "role-design-ui",
    name: "UI Designer",
    groups: ["Design"],
    seniorities: [t.JUNIOR, t.MIDLEVEL, t.SENIOR],
    description: "Creates visually appealing and effective user interfaces for digital products."
  },
  {
    id: "role-design-graphic",
    name: "Graphic Designer",
    groups: ["Design"],
    seniorities: [t.JUNIOR, t.MIDLEVEL, t.SENIOR],
    description: "Designs graphics, illustrations, and visual assets for branding and communication."
  },
  {
    id: "role-services-designer",
    name: "Services Designer",
    groups: ["Design"],
    seniorities: [t.MIDLEVEL, t.SENIOR],
    description: "Designs and optimizes service processes and customer journeys for better experiences."
  },
  // DevOps
  {
    id: "role-devops-engineer",
    name: "DevOps Engineer",
    groups: ["DevOps"],
    seniorities: [t.MIDLEVEL, t.SENIOR, t.LEAD],
    description: "Implements CI/CD pipelines, manages infrastructure, and ensures reliable deployments."
  },
  {
    id: "role-devops-security",
    name: "Security Engineer",
    groups: ["DevOps"],
    seniorities: [t.SENIOR, t.LEAD, t.PRINCIPAL],
    description: "Secures systems, applications, and infrastructure against threats and vulnerabilities."
  },
  // Architecture
  {
    id: "role-arch-software",
    name: "Software Architect",
    groups: ["Architecture"],
    seniorities: [t.MIDLEVEL, t.SENIOR, t.LEAD, t.PRINCIPAL],
    description: "Designs software systems, sets technical direction, and ensures architectural integrity."
  },
  {
    id: "role-arch-systems",
    name: "Systems Architect",
    groups: ["Architecture"],
    seniorities: [t.MIDLEVEL, t.SENIOR, t.LEAD, t.PRINCIPAL],
    description: "Designs and integrates complex IT systems and infrastructure."
  },
  {
    id: "role-arch-cloud",
    name: "Cloud Architect",
    groups: ["Architecture"],
    seniorities: [t.MIDLEVEL, t.SENIOR, t.LEAD, t.PRINCIPAL],
    description: "Architects cloud solutions, manages cloud infrastructure, and ensures scalability and security."
  },
  {
    id: "role-arch-data",
    name: "Data Architect",
    groups: ["Architecture"],
    seniorities: [t.MIDLEVEL, t.SENIOR, t.LEAD, t.PRINCIPAL],
    description: "Designs data models, databases, and data flows for effective data management."
  },
  {
    id: "role-arch-enterprise",
    name: "Enterprise Architect",
    groups: ["Architecture"],
    seniorities: [t.MIDLEVEL, t.SENIOR, t.LEAD, t.PRINCIPAL],
    description: "Aligns IT strategy with business goals, overseeing enterprise-wide architecture."
  },
  {
    id: "role-arch-security",
    name: "Security Architect",
    groups: ["Architecture"],
    seniorities: [t.MIDLEVEL, t.SENIOR, t.LEAD, t.PRINCIPAL],
    description: "Designs security architecture and policies to protect systems and data."
  },
  {
    id: "role-arch-solution",
    name: "Solution Architect",
    groups: ["Architecture"],
    seniorities: [t.MIDLEVEL, t.SENIOR, t.LEAD, t.PRINCIPAL],
    description: "Designs end-to-end solutions, integrating systems and technologies to meet business needs."
  },
  // Other
  {
    id: "role-business-analyst",
    name: "Business Analyst",
    groups: [],
    seniorities: [t.MIDLEVEL, t.SENIOR],
    description: "Analyzes business processes, gathers requirements, and bridges the gap between stakeholders and development teams."
  },
  {
    id: "role-dev-intern",
    name: "Development Intern",
    groups: [],
    seniorities: [t.INTERN],
    description: "Assists development teams with basic tasks and learns software development practices."
  },
  {
    id: "role-technical-writer",
    name: "Technical Writer",
    groups: [],
    seniorities: [t.JUNIOR, t.MIDLEVEL, t.SENIOR],
    description: "Creates and maintains technical documentation, manuals, and guides for products and systems."
  }
], Me = [
  // FRONTEND
  {
    guid: "tech-react",
    name: "React",
    description: "A JavaScript library for building user interfaces",
    category: [n.LIBRARY],
    appLayer: [a.FRONTEND]
  },
  {
    guid: "tech-angular",
    name: "Angular",
    description: "A TypeScript-based open-source web application framework.",
    category: [n.FRAMEWORK],
    appLayer: [a.FRONTEND]
  },
  {
    guid: "tech-vue",
    name: "Vue",
    description: "A progressive JavaScript framework for building user interfaces.",
    category: [n.FRAMEWORK],
    appLayer: [a.FRONTEND]
  },
  {
    guid: "tech-svelte",
    name: "Svelte",
    description: "A compiler that generates minimal and highly optimized JavaScript for building UIs.",
    category: [n.FRAMEWORK],
    appLayer: [a.FRONTEND]
  },
  {
    guid: "tech-material-design",
    name: "Material Design",
    description: "A design system developed by Google for building visually appealing UIs.",
    category: [n.LIBRARY],
    appLayer: [a.FRONTEND]
  },
  {
    guid: "tech-mantine",
    name: "Mantine",
    description: "A modern React component library for building UIs.",
    category: [n.LIBRARY],
    appLayer: [a.FRONTEND]
  },
  {
    guid: "tech-redux",
    name: "Redux",
    description: "A predictable state container for JavaScript apps.",
    category: [n.LIBRARY],
    appLayer: [a.FRONTEND]
  },
  {
    guid: "tech-jotai",
    name: "Jotai",
    description: "A primitive and flexible state management library for React.",
    category: [n.LIBRARY],
    appLayer: [a.FRONTEND]
  },
  {
    guid: "tech-zustand",
    name: "Zustand",
    description: "A small, fast, and scalable state-management solution for React.",
    category: [n.LIBRARY],
    appLayer: [a.FRONTEND]
  },
  {
    guid: "tech-valtio",
    name: "Valtio",
    description: "A proxy-state library for React state management.",
    category: [n.LIBRARY],
    appLayer: [a.FRONTEND]
  },
  // FRONTEND & BACKEND
  {
    guid: "tech-vite",
    name: "Vite",
    description: "A fast build tool and development server for modern web projects.",
    category: [n.TOOL],
    appLayer: [a.FRONTEND, a.BACKEND]
  },
  {
    guid: "tech-typescript",
    name: "TypeScript",
    description: "A strongly typed programming language that builds on JavaScript.",
    category: [n.LANGUAGE],
    appLayer: [a.FRONTEND, a.BACKEND]
  },
  {
    guid: "tech-javascript",
    name: "JavaScript",
    description: "A high-level, interpreted programming language for web development.",
    category: [n.LANGUAGE],
    appLayer: [a.FRONTEND, a.BACKEND]
  },
  // BACKEND
  {
    guid: "tech-java",
    name: "Java",
    description: "A high-level, class-based, object-oriented programming language.",
    category: [n.LANGUAGE],
    appLayer: [a.BACKEND]
  },
  {
    guid: "tech-nodejs",
    name: "Node.js",
    description: "JavaScript runtime built on Chrome's V8 JavaScript engine",
    category: [n.PLATFORM],
    appLayer: [a.BACKEND]
  },
  {
    guid: "tech-spring-boot",
    name: "Spring Boot",
    description: "A framework for building stand-alone, production-grade Spring-based applications.",
    category: [n.FRAMEWORK],
    appLayer: [a.BACKEND]
  },
  {
    guid: "tech-webflux",
    name: "WebFlux",
    description: "A reactive-stack web framework, part of Spring Framework.",
    category: [n.FRAMEWORK],
    appLayer: [a.BACKEND]
  },
  {
    guid: "tech-python",
    name: "Python",
    description: "A high-level, interpreted programming language known for its readability and versatility.",
    category: [n.LANGUAGE],
    appLayer: [a.BACKEND]
  },
  {
    guid: "tech-django",
    name: "Django",
    description: "A high-level Python web framework that encourages rapid development and clean, pragmatic design.",
    category: [n.FRAMEWORK],
    appLayer: [a.BACKEND]
  },
  {
    guid: "tech-expressjs",
    name: "Express.js",
    description: "A minimal and flexible Node.js web application framework.",
    category: [n.FRAMEWORK],
    appLayer: [a.BACKEND]
  },
  {
    guid: "tech-nestjs",
    name: "NestJS",
    description: "A progressive Node.js framework for building efficient, reliable and scalable server-side applications.",
    category: [n.FRAMEWORK],
    appLayer: [a.BACKEND]
  },
  {
    guid: "tech-csharp",
    name: "C#",
    description: "A modern, object-oriented programming language developed by Microsoft for building a wide range of applications.",
    category: [n.LANGUAGE],
    appLayer: [a.BACKEND]
  },
  {
    guid: "tech-go",
    name: "Go",
    description: "An open source programming language designed for simplicity, reliability, and efficiency.",
    category: [n.LANGUAGE],
    appLayer: [a.BACKEND]
  },
  {
    guid: "tech-cpp",
    name: "C++",
    description: "A general-purpose programming language created as an extension of the C programming language.",
    category: [n.LANGUAGE],
    appLayer: [a.BACKEND]
  },
  {
    guid: "tech-scala",
    name: "Scala",
    description: "A strong static type, functional and object-oriented programming language for the JVM.",
    category: [n.LANGUAGE],
    appLayer: [a.BACKEND]
  },
  {
    guid: "tech-kotlin",
    name: "Kotlin",
    description: "A modern programming language that makes developers happier. Used for JVM, Android, and backend development.",
    category: [n.LANGUAGE],
    appLayer: [a.BACKEND]
  },
  {
    guid: "tech-rust",
    name: "Rust",
    description: "A language empowering everyone to build reliable and efficient software.",
    category: [n.LANGUAGE],
    appLayer: [a.BACKEND]
  },
  {
    guid: "tech-php",
    name: "PHP",
    description: "A popular general-purpose scripting language that is especially suited to web development.",
    category: [n.LANGUAGE],
    appLayer: [a.BACKEND]
  },
  {
    guid: "tech-rabbitmq",
    name: "RabbitMQ",
    description: "An open-source message-broker software that implements the Advanced Message Queuing Protocol.",
    category: [n.TOOL],
    appLayer: [a.BACKEND]
  },
  // BACKEND AND DATABASE
  {
    guid: "tech-kafka",
    name: "Kafka",
    description: "A distributed event streaming platform for high-performance data pipelines.",
    category: [n.TOOL],
    appLayer: [a.BACKEND, a.DATABASE]
  },
  {
    guid: "tech-hibernate",
    name: "Hibernate",
    description: "An object-relational mapping tool for the Java programming language.",
    category: [n.LIBRARY],
    appLayer: [a.BACKEND, a.DATABASE]
  },
  // DATABASE
  {
    guid: "tech-mongodb",
    name: "MongoDB",
    description: "A NoSQL database program that uses JSON-like documents",
    category: [n.DATABASE],
    appLayer: [a.DATABASE]
  },
  {
    guid: "tech-postgresql",
    name: "PostgreSQL",
    description: "A powerful, open source object-relational database system.",
    category: [n.DATABASE],
    appLayer: [a.DATABASE]
  },
  {
    guid: "tech-oracle",
    name: "Oracle",
    description: "A multi-model database management system produced and marketed by Oracle Corporation.",
    category: [n.DATABASE],
    appLayer: [a.DATABASE]
  },
  {
    guid: "tech-sql-server",
    name: "SQL Server",
    description: "A relational database management system developed by Microsoft.",
    category: [n.DATABASE],
    appLayer: [a.DATABASE]
  },
  {
    guid: "tech-mysql",
    name: "MySQL",
    description: "An open-source relational database management system.",
    category: [n.DATABASE],
    appLayer: [a.DATABASE]
  },
  {
    guid: "tech-redis",
    name: "Redis",
    description: "An in-memory data structure store, used as a database, cache, and message broker.",
    category: [n.DATABASE],
    appLayer: [a.DATABASE]
  },
  // INFRA
  {
    guid: "tech-aws",
    name: "AWS",
    description: "Amazon Web Services - Cloud computing services",
    category: [n.PLATFORM, n.SERVICE],
    appLayer: [a.INFRA]
  },
  {
    guid: "tech-docker",
    name: "Docker",
    description: "Platform for developing, shipping, and running applications in containers",
    category: [n.TOOL],
    appLayer: [a.INFRA]
  },
  {
    guid: "tech-kubernetes",
    name: "Kubernetes",
    description: "An open-source system for automating deployment, scaling, and management of containerized applications.",
    category: [n.TOOL],
    appLayer: [a.INFRA]
  },
  {
    guid: "tech-docker-compose",
    name: "Docker Compose",
    description: "A tool for defining and running multi-container Docker applications.",
    category: [n.TOOL],
    appLayer: [a.INFRA]
  },
  {
    guid: "tech-terraform",
    name: "Terraform",
    description: "An open-source infrastructure as code software tool for building, changing, and versioning infrastructure.",
    category: [n.TOOL],
    appLayer: [a.INFRA]
  },
  {
    guid: "tech-pulumi",
    name: "Pulumi",
    description: "An infrastructure as code tool for creating, deploying, and managing cloud infrastructure.",
    category: [n.TOOL],
    appLayer: [a.INFRA]
  },
  {
    guid: "tech-ansible",
    name: "Ansible",
    description: "An open-source software provisioning, configuration management, and application-deployment tool.",
    category: [n.TOOL],
    appLayer: [a.INFRA]
  },
  {
    guid: "tech-azure",
    name: "Azure",
    description: "Microsoft Azure - Cloud computing services.",
    category: [n.PLATFORM, n.SERVICE],
    appLayer: [a.INFRA]
  },
  {
    guid: "tech-google-cloud",
    name: "Google Cloud",
    description: "Google Cloud Platform - Cloud computing services.",
    category: [n.PLATFORM, n.SERVICE],
    appLayer: [a.INFRA]
  },
  {
    guid: "tech-vmware",
    name: "VMWare",
    description: "A provider of cloud computing and virtualization technology.",
    category: [n.PLATFORM],
    appLayer: [a.INFRA]
  },
  {
    guid: "tech-linux",
    name: "Linux",
    description: "An open-source family of Unix-like operating systems.",
    category: [n.PLATFORM],
    appLayer: [a.INFRA]
  },
  {
    guid: "tech-windows-server",
    name: "Windows Server",
    description: "A group of server operating systems released by Microsoft.",
    category: [n.PLATFORM],
    appLayer: [a.INFRA]
  },
  // SECURITY
  {
    guid: "tech-oauth2",
    name: "OAuth2",
    description: "An open standard for access delegation commonly used for token-based authentication and authorization.",
    category: [n.SERVICE, n.TOOL],
    appLayer: [a.SECURITY]
  },
  {
    guid: "tech-keycloak",
    name: "Keycloak",
    description: "An open-source identity and access management solution.",
    category: [n.SERVICE, n.TOOL],
    appLayer: [a.SECURITY]
  },
  {
    guid: "tech-okta",
    name: "Okta",
    description: "A cloud-based identity and access management service.",
    category: [n.SERVICE],
    appLayer: [a.SECURITY]
  },
  {
    guid: "tech-kerberos",
    name: "Kerberos",
    description: "A network authentication protocol designed to provide strong authentication for client/server applications.",
    category: [n.TOOL],
    appLayer: [a.SECURITY]
  },
  {
    guid: "tech-entra-id",
    name: "EntraID",
    description: "Microsoft Entra ID (formerly Azure Active Directory) is a cloud-based identity and access management service.",
    category: [n.SERVICE],
    appLayer: [a.SECURITY]
  },
  {
    guid: "tech-auth0",
    name: "Auth0",
    description: "A flexible, drop-in solution to add authentication and authorization services to applications.",
    category: [n.SERVICE],
    appLayer: [a.SECURITY]
  },
  {
    guid: "tech-snyk",
    name: "Snyk",
    description: "A developer security platform for finding, prioritizing, and fixing vulnerabilities in code, dependencies, containers, and IaC.",
    category: [n.TOOL],
    appLayer: [a.SECURITY]
  },
  // NETWORK
  {
    guid: "tech-nginx",
    name: "NGINX",
    description: "A high-performance HTTP server, reverse proxy, and load balancer.",
    category: [n.TOOL, n.PLATFORM],
    appLayer: [a.NETWORK]
  },
  {
    guid: "tech-cloudflare",
    name: "Cloudflare",
    description: "A global network designed to make everything you connect to the Internet secure, private, fast, and reliable.",
    category: [n.SERVICE],
    appLayer: [a.NETWORK]
  },
  {
    guid: "tech-tomcat",
    name: "Tomcat",
    description: "An open-source implementation of the Java Servlet, JavaServer Pages, and Java Expression Language technologies.",
    category: [n.PLATFORM],
    appLayer: [a.NETWORK]
  },
  {
    guid: "tech-jetty",
    name: "Jetty",
    description: "A Java-based HTTP (Web) server and Java Servlet container.",
    category: [n.PLATFORM],
    appLayer: [a.NETWORK]
  },
  {
    guid: "tech-iis",
    name: "IIS",
    description: "Internet Information Services (IIS) is an extensible web server created by Microsoft for use with Windows NT family.",
    category: [n.PLATFORM],
    appLayer: [a.NETWORK]
  },
  // NONE (Tools/Services not tied to a specific layer)
  {
    guid: "tech-vitest",
    name: "Vitest",
    description: "A blazing fast unit test framework powered by Vite.",
    category: [n.TOOL],
    appLayer: [a.NONE]
  },
  {
    guid: "tech-git",
    name: "Git",
    description: "A distributed version-control system for tracking changes in source code.",
    category: [n.TOOL],
    appLayer: [a.NONE]
  },
  {
    guid: "tech-gitlab",
    name: "GitLab",
    description: "A web-based DevOps lifecycle tool that provides a Git repository manager.",
    category: [n.SERVICE, n.TOOL],
    appLayer: [a.NONE]
  },
  {
    guid: "tech-github",
    name: "GitHub",
    description: "A code hosting platform for version control and collaboration.",
    category: [n.SERVICE, n.TOOL],
    appLayer: [a.NONE]
  },
  {
    guid: "tech-jenkins",
    name: "Jenkins",
    description: "An open-source automation server for building, testing, and deploying software.",
    category: [n.TOOL],
    appLayer: [a.NONE]
  }
  // BACKEND/INFRA (Multiple layers)
];
export {
  we as DATA_PROJECT_ROLES,
  Me as DATA_TECHNOLOGIES
};
