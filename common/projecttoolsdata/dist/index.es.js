var e = /* @__PURE__ */ ((u) => (u.INTERN = "Intern", u.JUNIOR = "Junior", u.MIDLEVEL = "Mid-level", u.SENIOR = "Senior", u.LEAD = "Lead", u.PRINCIPAL = "Principal", u))(e || {}), E = { exports: {} }, k = E.exports, L;
function q() {
  return L || (L = 1, (function(u, D) {
    (function(o, c) {
      c(D);
    })(k, (function(o) {
      function c(r, n) {
        var i = n !== void 0 ? r : 0, s = n !== void 0 ? n : r;
        if (i > s)
          throw new Error("Invalid values: Minimum boundary on rnd() cannot be higher than maximum boundary: " + i + " - " + s);
        return i === s ? i : Math.floor(Math.random() * (s + 1 - i)) + i;
      }
      function I(r) {
        return r[Math.floor(Math.random() * r.length)];
      }
      function A(r, n, i, s, t) {
        function a(h) {
          return !(typeof s == "number" && h < s || typeof t == "number" && h > t);
        }
        for (var d = r, p = i * 2, g = 0; g < n; g++) {
          var m = c(0, p) - i;
          a(d + m) && (d += m);
        }
        return d;
      }
      function N(r, n, i) {
        if (r > n)
          throw new Error("Invalid value: Minimum cannot be higher than max value. " + r + " - " + n);
        var s = i !== void 0 ? i : 5;
        if (s < 0 || s > 10)
          throw new Error("Invalid ramp value " + s + ": Must be between 0 and 10");
        if (s === 0)
          return c(r, n);
        var t = Math.round(r + (n - r) / 2), a = 11 - s, d = 1 - s / 10, p = Math.round(t * d / 2);
        return A(t, a, p, r, n);
      }
      function v() {
        for (var r = 0, n = 0, i = arguments.length; n < i; n++) r += arguments[n].length;
        for (var s = Array(r), t = 0, n = 0; n < i; n++)
          for (var a = arguments[n], d = 0, p = a.length; d < p; d++, t++)
            s[t] = a[d];
        return s;
      }
      function R(r) {
        for (var n = v(r), i = []; n.length > 0; ) {
          var s = c(0, n.length - 1);
          i.push(n.splice(s, 1)[0]);
        }
        return i;
      }
      function M(r) {
        if (r < 0 || r > 100)
          throw new Error("Invalid value " + r + ". Valid range is between 0-100");
        var n = Math.floor(Math.random() * 100);
        return r > n;
      }
      function y(r, n) {
        var i = Array.isArray(n) ? n : n.rolls;
        return i.reduce(function(s, t) {
          return t >= r ? s + 1 : s;
        }, 0);
      }
      function f(r) {
        var n = Array.isArray(r) ? r : r.rolls;
        return n.reduce(function(i, s) {
          return i + s;
        }, 0);
      }
      function O(r) {
        var n = /(\d*)d(\d+)([\+\-]*)(\d*)/im, i = r.replace(" ", "").match(n), s = Number(i[1] || 1), t = Number(i[2]), a = Number(i[4] || 0), d = i[3] === "-" ? a * -1 : a * 1, p = l(t, s), g = f(p) + d, m = {
          sum: g,
          rolls: p,
          dieType: t
        };
        return m;
      }
      function l(r, n) {
        for (var i = n === void 0 ? 1 : n, s = [], t = 0; t < i; t++)
          s.push(c(1, r));
        return s;
      }
      function S(r) {
        return l(4, r);
      }
      function b(r) {
        return l(6, r);
      }
      function P(r) {
        return l(8, r);
      }
      function V(r) {
        return l(10, r);
      }
      function w(r) {
        return l(12, r);
      }
      function C(r) {
        return l(20, r);
      }
      function J(r) {
        return l(100, r);
      }
      function U(r, n) {
        var i = c(r, n), s = n !== void 0 ? n.toString().length : r.toString().length, t = i.toString();
        return t.padStart(s, "0");
      }
      function x(r, n, i) {
        if (i === void 0 && (i = !1), i && r.length <= n)
          return v(r);
        var s = [];
        if (i)
          for (; s.length < n; ) {
            var t = I(r);
            s.includes(t) || s.push(t);
          }
        else
          for (var a = 0; a < n; a++)
            i || s.push(I(r));
        return s;
      }
      var T = {
        d4: S,
        d6: b,
        d8: P,
        d10: V,
        d12: w,
        d20: C,
        d100: J,
        roll: O
      };
      o.Dice = T, o.arnd = I, o.arnds = x, o.chance = M, o.nrnd = N, o.padrnd = U, o.rnd = c, o.shuffle = R, o.successPool = y, o.sumPool = f, Object.defineProperty(o, "__esModule", { value: !0 });
    }));
  })(E, E.exports)), E.exports;
}
q();
const j = [
  // Management
  {
    id: "role-manager-project",
    name: "Project Manager",
    groups: ["Management"],
    seniorities: [e.MIDLEVEL, e.SENIOR, e.LEAD],
    description: "Oversees project planning, execution, and delivery, ensuring goals are met on time and within budget."
  },
  {
    id: "role-manager-product",
    name: "Product Manager",
    groups: ["Management"],
    seniorities: [e.MIDLEVEL, e.SENIOR, e.LEAD],
    description: "Defines product vision, strategy, and roadmap, and coordinates cross-functional teams to deliver product success."
  },
  {
    id: "role-manager-scrum",
    name: "Scrum Master",
    groups: ["Management"],
    seniorities: [e.JUNIOR, e.MIDLEVEL, e.SENIOR],
    description: "Facilitates Agile processes, removes impediments, and supports the Scrum team in delivering value."
  },
  {
    id: "role-services-manager",
    name: "Services Manager",
    groups: ["Management"],
    seniorities: [e.MIDLEVEL, e.SENIOR],
    description: "Manages service delivery, client relationships, and ensures high-quality support and operations."
  },
  {
    id: "role-release-manager",
    name: "Release Manager",
    groups: ["Management"],
    seniorities: [e.MIDLEVEL, e.SENIOR],
    description: "Coordinates software releases, deployment schedules, and ensures smooth delivery to production."
  },
  // Developers
  {
    id: "role-dev-frontend",
    name: "Frontend Developer",
    groups: ["Developers"],
    seniorities: [
      e.JUNIOR,
      e.MIDLEVEL,
      e.SENIOR,
      e.LEAD,
      e.PRINCIPAL
    ],
    description: "Builds and maintains user interfaces and client-side logic for web and mobile applications."
  },
  {
    id: "role-dev-backend",
    name: "Backend Developer",
    groups: ["Developers"],
    seniorities: [
      e.JUNIOR,
      e.MIDLEVEL,
      e.SENIOR,
      e.LEAD,
      e.PRINCIPAL
    ],
    description: "Develops server-side logic, APIs, and database interactions to support application functionality."
  },
  {
    id: "role-dev-fullstack",
    name: "Fullstack Developer",
    groups: ["Developers"],
    seniorities: [
      e.JUNIOR,
      e.MIDLEVEL,
      e.SENIOR,
      e.LEAD,
      e.PRINCIPAL
    ],
    description: "Works across both frontend and backend, delivering end-to-end solutions for applications."
  },
  // QA
  {
    id: "role-qa-tester",
    name: "QA Tester",
    groups: ["QA"],
    seniorities: [e.JUNIOR, e.MIDLEVEL, e.SENIOR],
    description: "Tests software to identify bugs, ensure quality, and verify requirements are met."
  },
  {
    id: "role-qa-automation",
    name: "QA Automation Engineer",
    groups: ["QA"],
    seniorities: [e.MIDLEVEL, e.SENIOR, e.LEAD],
    description: "Designs, develops, and maintains automated test scripts and frameworks."
  },
  // Design
  {
    id: "role-design-ux",
    name: "UX Designer",
    groups: ["Design"],
    seniorities: [e.JUNIOR, e.MIDLEVEL, e.SENIOR],
    description: "Researches and designs user experiences to ensure products are intuitive and user-friendly."
  },
  {
    id: "role-design-ui",
    name: "UI Designer",
    groups: ["Design"],
    seniorities: [e.JUNIOR, e.MIDLEVEL, e.SENIOR],
    description: "Creates visually appealing and effective user interfaces for digital products."
  },
  {
    id: "role-design-graphic",
    name: "Graphic Designer",
    groups: ["Design"],
    seniorities: [e.JUNIOR, e.MIDLEVEL, e.SENIOR],
    description: "Designs graphics, illustrations, and visual assets for branding and communication."
  },
  {
    id: "role-services-designer",
    name: "Services Designer",
    groups: ["Design"],
    seniorities: [e.MIDLEVEL, e.SENIOR],
    description: "Designs and optimizes service processes and customer journeys for better experiences."
  },
  // DevOps
  {
    id: "role-devops-engineer",
    name: "DevOps Engineer",
    groups: ["DevOps"],
    seniorities: [e.MIDLEVEL, e.SENIOR, e.LEAD],
    description: "Implements CI/CD pipelines, manages infrastructure, and ensures reliable deployments."
  },
  {
    id: "role-devops-security",
    name: "Security Engineer",
    groups: ["DevOps"],
    seniorities: [e.SENIOR, e.LEAD, e.PRINCIPAL],
    description: "Secures systems, applications, and infrastructure against threats and vulnerabilities."
  },
  // Architecture
  {
    id: "role-arch-software",
    name: "Software Architect",
    groups: ["Architecture"],
    seniorities: [e.MIDLEVEL, e.SENIOR, e.LEAD, e.PRINCIPAL],
    description: "Designs software systems, sets technical direction, and ensures architectural integrity."
  },
  {
    id: "role-arch-systems",
    name: "Systems Architect",
    groups: ["Architecture"],
    seniorities: [e.MIDLEVEL, e.SENIOR, e.LEAD, e.PRINCIPAL],
    description: "Designs and integrates complex IT systems and infrastructure."
  },
  {
    id: "role-arch-cloud",
    name: "Cloud Architect",
    groups: ["Architecture"],
    seniorities: [e.MIDLEVEL, e.SENIOR, e.LEAD, e.PRINCIPAL],
    description: "Architects cloud solutions, manages cloud infrastructure, and ensures scalability and security."
  },
  {
    id: "role-arch-data",
    name: "Data Architect",
    groups: ["Architecture"],
    seniorities: [e.MIDLEVEL, e.SENIOR, e.LEAD, e.PRINCIPAL],
    description: "Designs data models, databases, and data flows for effective data management."
  },
  {
    id: "role-arch-enterprise",
    name: "Enterprise Architect",
    groups: ["Architecture"],
    seniorities: [e.MIDLEVEL, e.SENIOR, e.LEAD, e.PRINCIPAL],
    description: "Aligns IT strategy with business goals, overseeing enterprise-wide architecture."
  },
  {
    id: "role-arch-security",
    name: "Security Architect",
    groups: ["Architecture"],
    seniorities: [e.MIDLEVEL, e.SENIOR, e.LEAD, e.PRINCIPAL],
    description: "Designs security architecture and policies to protect systems and data."
  },
  {
    id: "role-arch-solution",
    name: "Solution Architect",
    groups: ["Architecture"],
    seniorities: [e.MIDLEVEL, e.SENIOR, e.LEAD, e.PRINCIPAL],
    description: "Designs end-to-end solutions, integrating systems and technologies to meet business needs."
  },
  // Other
  {
    id: "role-business-analyst",
    name: "Business Analyst",
    groups: [],
    seniorities: [e.MIDLEVEL, e.SENIOR],
    description: "Analyzes business processes, gathers requirements, and bridges the gap between stakeholders and development teams."
  },
  {
    id: "role-dev-intern",
    name: "Development Intern",
    groups: [],
    seniorities: [e.INTERN],
    description: "Assists development teams with basic tasks and learns software development practices."
  },
  {
    id: "role-technical-writer",
    name: "Technical Writer",
    groups: [],
    seniorities: [e.JUNIOR, e.MIDLEVEL, e.SENIOR],
    description: "Creates and maintains technical documentation, manuals, and guides for products and systems."
  }
];
export {
  j as DATA_PROJECT_ROLES
};
