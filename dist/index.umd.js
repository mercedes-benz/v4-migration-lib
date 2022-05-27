!(function (t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? e(
        exports,
        require('uuid'),
        require('decimal.js'),
        require('web3'),
        require('fs'),
        require('save-file'),
        require('node-abort-controller'),
        require('cross-fetch'),
        require('buffer'),
        require('assert'),
        require('crypto'),
        require('stream'),
        require('events'),
        require('util'),
        require('string_decoder/'),
        require('path'),
        require('os'),
        require('@oceanprotocol/contracts/artifacts/Metadata.json'),
        require('lzma/src/lzma-c'),
        require('@oceanprotocol/contracts/artifacts/DTFactory.json'),
        require('@oceanprotocol/contracts/artifacts/DataTokenTemplate.json'),
        require('@ethereum-navigator/navigator'),
        require('crypto-js'),
        require('@oceanprotocol/contracts/artifacts/BPool.json'),
        require('@oceanprotocol/contracts/artifacts/BFactory.json'),
        require('@oceanprotocol/contracts/artifacts/FixedRateExchange.json'),
        require('@oceanprotocol/contracts/artifacts/Dispenser.json'),
        require('@oceanprotocol/contracts/artifacts/address.json'),
        require('axios')
      )
    : 'function' == typeof define && define.amd
    ? define(
        [
          'exports',
          'uuid',
          'decimal.js',
          'web3',
          'fs',
          'save-file',
          'node-abort-controller',
          'cross-fetch',
          'buffer',
          'assert',
          'crypto',
          'stream',
          'events',
          'util',
          'string_decoder/',
          'path',
          'os',
          '@oceanprotocol/contracts/artifacts/Metadata.json',
          'lzma/src/lzma-c',
          '@oceanprotocol/contracts/artifacts/DTFactory.json',
          '@oceanprotocol/contracts/artifacts/DataTokenTemplate.json',
          '@ethereum-navigator/navigator',
          'crypto-js',
          '@oceanprotocol/contracts/artifacts/BPool.json',
          '@oceanprotocol/contracts/artifacts/BFactory.json',
          '@oceanprotocol/contracts/artifacts/FixedRateExchange.json',
          '@oceanprotocol/contracts/artifacts/Dispenser.json',
          '@oceanprotocol/contracts/artifacts/address.json',
          'axios'
        ],
        e
      )
    : e(
        ((t || self).v4MigrationLib = {}),
        0,
        0,
        t.web3,
        t.fs,
        0,
        0,
        0,
        t.buffer,
        t.assert,
        t.crypto,
        t.stream,
        0,
        t.util,
        t.require$$5,
        t.path,
        t.os,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        t.axios
      )
})(
  this,
  function (
    t,
    e,
    r,
    i,
    n,
    o,
    s,
    a,
    h,
    u,
    f,
    d,
    l,
    c,
    p,
    m,
    b,
    g,
    v,
    y,
    w,
    M,
    _,
    S,
    A,
    k,
    x,
    E,
    R
  ) {
    function B(t) {
      return t && 'object' == typeof t && 'default' in t ? t : { default: t }
    }
    var I,
      N = /*#__PURE__*/ B(i),
      T = /*#__PURE__*/ B(n),
      P = /*#__PURE__*/ B(h),
      O = /*#__PURE__*/ B(u),
      q = /*#__PURE__*/ B(f),
      L = /*#__PURE__*/ B(d),
      z = /*#__PURE__*/ B(c),
      j = /*#__PURE__*/ B(p),
      C = /*#__PURE__*/ B(m),
      U = /*#__PURE__*/ B(b),
      D = /*#__PURE__*/ B(R)
    function Z() {
      return (
        (Z =
          Object.assign ||
          function (t) {
            for (var e = 1; e < arguments.length; e++) {
              var r = arguments[e]
              for (var i in r)
                Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i])
            }
            return t
          }),
        Z.apply(this, arguments)
      )
    }
    !(function (t) {
      ;(t[(t.None = -1)] = 'None'),
        (t[(t.Error = 0)] = 'Error'),
        (t[(t.Warn = 1)] = 'Warn'),
        (t[(t.Log = 2)] = 'Log'),
        (t[(t.Verbose = 3)] = 'Verbose')
    })(I || (I = {}))
    const F = new (class {
      constructor(t = I.Error) {
        ;(this.logLevel = void 0), (this.logLevel = t)
      }
      setLevel(t) {
        this.logLevel = t
      }
      bypass(...t) {
        this.dispatch('log', -Infinity, ...t)
      }
      debug(...t) {
        this.dispatch('debug', I.Verbose, ...t)
      }
      log(...t) {
        this.dispatch('log', I.Log, ...t)
      }
      warn(...t) {
        this.dispatch('warn', I.Warn, ...t)
      }
      error(...t) {
        this.dispatch('error', I.Error, ...t)
      }
      dispatch(t, e, ...r) {
        this.logLevel >= e && console[t](...r)
      }
    })()
    var K = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,
      H = Math.ceil,
      V = Math.floor,
      $ = '[BigNumber Error] ',
      W = $ + 'Number primitive has more than 15 significant digits: ',
      J = 1e14,
      G = 14,
      X = 9007199254740991,
      Y = [
        1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13
      ],
      Q = 1e7,
      tt = 1e9
    function et(t) {
      var e = 0 | t
      return t > 0 || t === e ? e : e - 1
    }
    function rt(t) {
      for (var e, r, i = 1, n = t.length, o = t[0] + ''; i < n; ) {
        for (e = t[i++] + '', r = G - e.length; r--; e = '0' + e);
        o += e
      }
      for (n = o.length; 48 === o.charCodeAt(--n); );
      return o.slice(0, n + 1 || 1)
    }
    function it(t, e) {
      var r,
        i,
        n = t.c,
        o = e.c,
        s = t.s,
        a = e.s,
        h = t.e,
        u = e.e
      if (!s || !a) return null
      if (((i = o && !o[0]), (r = n && !n[0]) || i)) return r ? (i ? 0 : -a) : s
      if (s != a) return s
      if (((r = s < 0), (i = h == u), !n || !o)) return i ? 0 : !n ^ r ? 1 : -1
      if (!i) return (h > u) ^ r ? 1 : -1
      for (a = (h = n.length) < (u = o.length) ? h : u, s = 0; s < a; s++)
        if (n[s] != o[s]) return (n[s] > o[s]) ^ r ? 1 : -1
      return h == u ? 0 : (h > u) ^ r ? 1 : -1
    }
    function nt(t, e, r, i) {
      if (t < e || t > r || t !== V(t))
        throw Error(
          $ +
            (i || 'Argument') +
            ('number' == typeof t
              ? t < e || t > r
                ? ' out of range: '
                : ' not an integer: '
              : ' not a primitive number: ') +
            String(t)
        )
    }
    function ot(t) {
      var e = t.c.length - 1
      return et(t.e / G) == e && t.c[e] % 2 != 0
    }
    function st(t, e) {
      return (
        (t.length > 1 ? t.charAt(0) + '.' + t.slice(1) : t) +
        (e < 0 ? 'e' : 'e+') +
        e
      )
    }
    function at(t, e, r) {
      var i, n
      if (e < 0) {
        for (n = r + '.'; ++e; n += r);
        t = n + t
      } else if (++e > (i = t.length)) {
        for (n = r, e -= i; --e; n += r);
        t += n
      } else e < i && (t = t.slice(0, e) + '.' + t.slice(e))
      return t
    }
    !(function t(e) {
      var r,
        i,
        n,
        o,
        s,
        a,
        h,
        u,
        f,
        d,
        l = (x.prototype = { constructor: x, toString: null, valueOf: null }),
        c = new x(1),
        p = 20,
        m = 4,
        b = -7,
        g = 21,
        v = -1e7,
        y = 1e7,
        w = !1,
        M = 1,
        _ = 0,
        S = {
          prefix: '',
          groupSize: 3,
          secondaryGroupSize: 0,
          groupSeparator: ',',
          decimalSeparator: '.',
          fractionGroupSize: 0,
          fractionGroupSeparator: ' ',
          suffix: ''
        },
        A = '0123456789abcdefghijklmnopqrstuvwxyz',
        k = !0
      function x(t, e) {
        var r,
          o,
          s,
          a,
          h,
          u,
          f,
          d,
          l = this
        if (!(l instanceof x)) return new x(t, e)
        if (null == e) {
          if (t && !0 === t._isBigNumber)
            return (
              (l.s = t.s),
              void (!t.c || t.e > y
                ? (l.c = l.e = null)
                : t.e < v
                ? (l.c = [(l.e = 0)])
                : ((l.e = t.e), (l.c = t.c.slice())))
            )
          if ((u = 'number' == typeof t) && 0 * t == 0) {
            if (((l.s = 1 / t < 0 ? ((t = -t), -1) : 1), t === ~~t)) {
              for (a = 0, h = t; h >= 10; h /= 10, a++);
              return void (a > y
                ? (l.c = l.e = null)
                : ((l.e = a), (l.c = [t])))
            }
            d = String(t)
          } else {
            if (!K.test((d = String(t)))) return n(l, d, u)
            l.s = 45 == d.charCodeAt(0) ? ((d = d.slice(1)), -1) : 1
          }
          ;(a = d.indexOf('.')) > -1 && (d = d.replace('.', '')),
            (h = d.search(/e/i)) > 0
              ? (a < 0 && (a = h),
                (a += +d.slice(h + 1)),
                (d = d.substring(0, h)))
              : a < 0 && (a = d.length)
        } else {
          if ((nt(e, 2, A.length, 'Base'), 10 == e && k))
            return I((l = new x(t)), p + l.e + 1, m)
          if (((d = String(t)), (u = 'number' == typeof t))) {
            if (0 * t != 0) return n(l, d, u, e)
            if (
              ((l.s = 1 / t < 0 ? ((d = d.slice(1)), -1) : 1),
              x.DEBUG && d.replace(/^0\.0*|\./, '').length > 15)
            )
              throw Error(W + t)
          } else l.s = 45 === d.charCodeAt(0) ? ((d = d.slice(1)), -1) : 1
          for (r = A.slice(0, e), a = h = 0, f = d.length; h < f; h++)
            if (r.indexOf((o = d.charAt(h))) < 0) {
              if ('.' == o) {
                if (h > a) {
                  a = f
                  continue
                }
              } else if (
                !s &&
                ((d == d.toUpperCase() && (d = d.toLowerCase())) ||
                  (d == d.toLowerCase() && (d = d.toUpperCase())))
              ) {
                ;(s = !0), (h = -1), (a = 0)
                continue
              }
              return n(l, String(t), u, e)
            }
          ;(u = !1),
            (a = (d = i(d, e, 10, l.s)).indexOf('.')) > -1
              ? (d = d.replace('.', ''))
              : (a = d.length)
        }
        for (h = 0; 48 === d.charCodeAt(h); h++);
        for (f = d.length; 48 === d.charCodeAt(--f); );
        if ((d = d.slice(h, ++f))) {
          if (((f -= h), u && x.DEBUG && f > 15 && (t > X || t !== V(t))))
            throw Error(W + l.s * t)
          if ((a = a - h - 1) > y) l.c = l.e = null
          else if (a < v) l.c = [(l.e = 0)]
          else {
            if (
              ((l.e = a),
              (l.c = []),
              (h = (a + 1) % G),
              a < 0 && (h += G),
              h < f)
            ) {
              for (h && l.c.push(+d.slice(0, h)), f -= G; h < f; )
                l.c.push(+d.slice(h, (h += G)))
              h = G - (d = d.slice(h)).length
            } else h -= f
            for (; h--; d += '0');
            l.c.push(+d)
          }
        } else l.c = [(l.e = 0)]
      }
      function E(t, e, r, i) {
        var n, o, s, a, h
        if ((null == r ? (r = m) : nt(r, 0, 8), !t.c)) return t.toString()
        if (((n = t.c[0]), (s = t.e), null == e))
          (h = rt(t.c)),
            (h =
              1 == i || (2 == i && (s <= b || s >= g))
                ? st(h, s)
                : at(h, s, '0'))
        else if (
          ((o = (t = I(new x(t), e, r)).e),
          (a = (h = rt(t.c)).length),
          1 == i || (2 == i && (e <= o || o <= b)))
        ) {
          for (; a < e; h += '0', a++);
          h = st(h, o)
        } else if (((e -= s), (h = at(h, o, '0')), o + 1 > a)) {
          if (--e > 0) for (h += '.'; e--; h += '0');
        } else if ((e += o - a) > 0)
          for (o + 1 == a && (h += '.'); e--; h += '0');
        return t.s < 0 && n ? '-' + h : h
      }
      function R(t, e) {
        for (var r, i = 1, n = new x(t[0]); i < t.length; i++) {
          if (!(r = new x(t[i])).s) {
            n = r
            break
          }
          e.call(n, r) && (n = r)
        }
        return n
      }
      function B(t, e, r) {
        for (var i = 1, n = e.length; !e[--n]; e.pop());
        for (n = e[0]; n >= 10; n /= 10, i++);
        return (
          (r = i + r * G - 1) > y
            ? (t.c = t.e = null)
            : r < v
            ? (t.c = [(t.e = 0)])
            : ((t.e = r), (t.c = e)),
          t
        )
      }
      function I(t, e, r, i) {
        var n,
          o,
          s,
          a,
          h,
          u,
          f,
          d = t.c,
          l = Y
        if (d) {
          t: {
            for (n = 1, a = d[0]; a >= 10; a /= 10, n++);
            if ((o = e - n) < 0)
              (o += G), (f = ((h = d[(u = 0)]) / l[n - (s = e) - 1]) % 10 | 0)
            else if ((u = H((o + 1) / G)) >= d.length) {
              if (!i) break t
              for (; d.length <= u; d.push(0));
              ;(h = f = 0), (n = 1), (s = (o %= G) - G + 1)
            } else {
              for (h = a = d[u], n = 1; a >= 10; a /= 10, n++);
              f = (s = (o %= G) - G + n) < 0 ? 0 : (h / l[n - s - 1]) % 10 | 0
            }
            if (
              ((i =
                i ||
                e < 0 ||
                null != d[u + 1] ||
                (s < 0 ? h : h % l[n - s - 1])),
              (i =
                r < 4
                  ? (f || i) && (0 == r || r == (t.s < 0 ? 3 : 2))
                  : f > 5 ||
                    (5 == f &&
                      (4 == r ||
                        i ||
                        (6 == r &&
                          (o > 0 ? (s > 0 ? h / l[n - s] : 0) : d[u - 1]) % 10 &
                            1) ||
                        r == (t.s < 0 ? 8 : 7)))),
              e < 1 || !d[0])
            )
              return (
                (d.length = 0),
                i
                  ? ((d[0] = l[(G - ((e -= t.e + 1) % G)) % G]),
                    (t.e = -e || 0))
                  : (d[0] = t.e = 0),
                t
              )
            if (
              (0 == o
                ? ((d.length = u), (a = 1), u--)
                : ((d.length = u + 1),
                  (a = l[G - o]),
                  (d[u] = s > 0 ? V((h / l[n - s]) % l[s]) * a : 0)),
              i)
            )
              for (;;) {
                if (0 == u) {
                  for (o = 1, s = d[0]; s >= 10; s /= 10, o++);
                  for (s = d[0] += a, a = 1; s >= 10; s /= 10, a++);
                  o != a && (t.e++, d[0] == J && (d[0] = 1))
                  break
                }
                if (((d[u] += a), d[u] != J)) break
                ;(d[u--] = 0), (a = 1)
              }
            for (o = d.length; 0 === d[--o]; d.pop());
          }
          t.e > y ? (t.c = t.e = null) : t.e < v && (t.c = [(t.e = 0)])
        }
        return t
      }
      function N(t) {
        var e,
          r = t.e
        return null === r
          ? t.toString()
          : ((e = rt(t.c)),
            (e = r <= b || r >= g ? st(e, r) : at(e, r, '0')),
            t.s < 0 ? '-' + e : e)
      }
      return (
        (x.clone = t),
        (x.ROUND_UP = 0),
        (x.ROUND_DOWN = 1),
        (x.ROUND_CEIL = 2),
        (x.ROUND_FLOOR = 3),
        (x.ROUND_HALF_UP = 4),
        (x.ROUND_HALF_DOWN = 5),
        (x.ROUND_HALF_EVEN = 6),
        (x.ROUND_HALF_CEIL = 7),
        (x.ROUND_HALF_FLOOR = 8),
        (x.EUCLID = 9),
        (x.config = x.set =
          function (t) {
            var e, r
            if (null != t) {
              if ('object' != typeof t) throw Error($ + 'Object expected: ' + t)
              if (
                (t.hasOwnProperty((e = 'DECIMAL_PLACES')) &&
                  (nt((r = t[e]), 0, tt, e), (p = r)),
                t.hasOwnProperty((e = 'ROUNDING_MODE')) &&
                  (nt((r = t[e]), 0, 8, e), (m = r)),
                t.hasOwnProperty((e = 'EXPONENTIAL_AT')) &&
                  ((r = t[e]) && r.pop
                    ? (nt(r[0], -tt, 0, e),
                      nt(r[1], 0, tt, e),
                      (b = r[0]),
                      (g = r[1]))
                    : (nt(r, -tt, tt, e), (b = -(g = r < 0 ? -r : r)))),
                t.hasOwnProperty((e = 'RANGE')))
              )
                if ((r = t[e]) && r.pop)
                  nt(r[0], -tt, -1, e),
                    nt(r[1], 1, tt, e),
                    (v = r[0]),
                    (y = r[1])
                else {
                  if ((nt(r, -tt, tt, e), !r))
                    throw Error($ + e + ' cannot be zero: ' + r)
                  v = -(y = r < 0 ? -r : r)
                }
              if (t.hasOwnProperty((e = 'CRYPTO'))) {
                if ((r = t[e]) !== !!r)
                  throw Error($ + e + ' not true or false: ' + r)
                if (r) {
                  if (
                    'undefined' == typeof crypto ||
                    !crypto ||
                    (!crypto.getRandomValues && !crypto.randomBytes)
                  )
                    throw ((w = !r), Error($ + 'crypto unavailable'))
                  w = r
                } else w = r
              }
              if (
                (t.hasOwnProperty((e = 'MODULO_MODE')) &&
                  (nt((r = t[e]), 0, 9, e), (M = r)),
                t.hasOwnProperty((e = 'POW_PRECISION')) &&
                  (nt((r = t[e]), 0, tt, e), (_ = r)),
                t.hasOwnProperty((e = 'FORMAT')))
              ) {
                if ('object' != typeof (r = t[e]))
                  throw Error($ + e + ' not an object: ' + r)
                S = r
              }
              if (t.hasOwnProperty((e = 'ALPHABET'))) {
                if (
                  'string' != typeof (r = t[e]) ||
                  /^.?$|[+\-.\s]|(.).*\1/.test(r)
                )
                  throw Error($ + e + ' invalid: ' + r)
                ;(k = '0123456789' == r.slice(0, 10)), (A = r)
              }
            }
            return {
              DECIMAL_PLACES: p,
              ROUNDING_MODE: m,
              EXPONENTIAL_AT: [b, g],
              RANGE: [v, y],
              CRYPTO: w,
              MODULO_MODE: M,
              POW_PRECISION: _,
              FORMAT: S,
              ALPHABET: A
            }
          }),
        (x.isBigNumber = function (t) {
          if (!t || !0 !== t._isBigNumber) return !1
          if (!x.DEBUG) return !0
          var e,
            r,
            i = t.c,
            n = t.e,
            o = t.s
          t: if ('[object Array]' == {}.toString.call(i)) {
            if ((1 === o || -1 === o) && n >= -tt && n <= tt && n === V(n)) {
              if (0 === i[0]) {
                if (0 === n && 1 === i.length) return !0
                break t
              }
              if (
                ((e = (n + 1) % G) < 1 && (e += G), String(i[0]).length == e)
              ) {
                for (e = 0; e < i.length; e++)
                  if ((r = i[e]) < 0 || r >= J || r !== V(r)) break t
                if (0 !== r) return !0
              }
            }
          } else if (
            null === i &&
            null === n &&
            (null === o || 1 === o || -1 === o)
          )
            return !0
          throw Error($ + 'Invalid BigNumber: ' + t)
        }),
        (x.maximum = x.max =
          function () {
            return R(arguments, l.lt)
          }),
        (x.minimum = x.min =
          function () {
            return R(arguments, l.gt)
          }),
        (x.random =
          ((o = 9007199254740992),
          (s =
            (Math.random() * o) & 2097151
              ? function () {
                  return V(Math.random() * o)
                }
              : function () {
                  return (
                    8388608 * ((1073741824 * Math.random()) | 0) +
                    ((8388608 * Math.random()) | 0)
                  )
                }),
          function (t) {
            var e,
              r,
              i,
              n,
              o,
              a = 0,
              h = [],
              u = new x(c)
            if ((null == t ? (t = p) : nt(t, 0, tt), (n = H(t / G)), w))
              if (crypto.getRandomValues) {
                for (
                  e = crypto.getRandomValues(new Uint32Array((n *= 2)));
                  a < n;

                )
                  (o = 131072 * e[a] + (e[a + 1] >>> 11)) >= 9e15
                    ? ((r = crypto.getRandomValues(new Uint32Array(2))),
                      (e[a] = r[0]),
                      (e[a + 1] = r[1]))
                    : (h.push(o % 1e14), (a += 2))
                a = n / 2
              } else {
                if (!crypto.randomBytes)
                  throw ((w = !1), Error($ + 'crypto unavailable'))
                for (e = crypto.randomBytes((n *= 7)); a < n; )
                  (o =
                    281474976710656 * (31 & e[a]) +
                    1099511627776 * e[a + 1] +
                    4294967296 * e[a + 2] +
                    16777216 * e[a + 3] +
                    (e[a + 4] << 16) +
                    (e[a + 5] << 8) +
                    e[a + 6]) >= 9e15
                    ? crypto.randomBytes(7).copy(e, a)
                    : (h.push(o % 1e14), (a += 7))
                a = n / 7
              }
            if (!w) for (; a < n; ) (o = s()) < 9e15 && (h[a++] = o % 1e14)
            for (
              n = h[--a], t %= G, n && t && (h[a] = V(n / (o = Y[G - t])) * o);
              0 === h[a];
              h.pop(), a--
            );
            if (a < 0) h = [(i = 0)]
            else {
              for (i = -1; 0 === h[0]; h.splice(0, 1), i -= G);
              for (a = 1, o = h[0]; o >= 10; o /= 10, a++);
              a < G && (i -= G - a)
            }
            return (u.e = i), (u.c = h), u
          })),
        (x.sum = function () {
          for (var t = 1, e = arguments, r = new x(e[0]); t < e.length; )
            r = r.plus(e[t++])
          return r
        }),
        (i = (function () {
          var t = '0123456789'
          function e(t, e, r, i) {
            for (var n, o, s = [0], a = 0, h = t.length; a < h; ) {
              for (o = s.length; o--; s[o] *= e);
              for (s[0] += i.indexOf(t.charAt(a++)), n = 0; n < s.length; n++)
                s[n] > r - 1 &&
                  (null == s[n + 1] && (s[n + 1] = 0),
                  (s[n + 1] += (s[n] / r) | 0),
                  (s[n] %= r))
            }
            return s.reverse()
          }
          return function (i, n, o, s, a) {
            var h,
              u,
              f,
              d,
              l,
              c,
              b,
              g,
              v = i.indexOf('.'),
              y = p,
              w = m
            for (
              v >= 0 &&
                ((d = _),
                (_ = 0),
                (i = i.replace('.', '')),
                (c = (g = new x(n)).pow(i.length - v)),
                (_ = d),
                (g.c = e(at(rt(c.c), c.e, '0'), 10, o, t)),
                (g.e = g.c.length)),
                f = d =
                  (b = e(i, n, o, a ? ((h = A), t) : ((h = t), A))).length;
              0 == b[--d];
              b.pop()
            );
            if (!b[0]) return h.charAt(0)
            if (
              (v < 0
                ? --f
                : ((c.c = b),
                  (c.e = f),
                  (c.s = s),
                  (b = (c = r(c, g, y, w, o)).c),
                  (l = c.r),
                  (f = c.e)),
              (v = b[(u = f + y + 1)]),
              (d = o / 2),
              (l = l || u < 0 || null != b[u + 1]),
              (l =
                w < 4
                  ? (null != v || l) && (0 == w || w == (c.s < 0 ? 3 : 2))
                  : v > d ||
                    (v == d &&
                      (4 == w ||
                        l ||
                        (6 == w && 1 & b[u - 1]) ||
                        w == (c.s < 0 ? 8 : 7)))),
              u < 1 || !b[0])
            )
              i = l ? at(h.charAt(1), -y, h.charAt(0)) : h.charAt(0)
            else {
              if (((b.length = u), l))
                for (--o; ++b[--u] > o; )
                  (b[u] = 0), u || (++f, (b = [1].concat(b)))
              for (d = b.length; !b[--d]; );
              for (v = 0, i = ''; v <= d; i += h.charAt(b[v++]));
              i = at(i, f, h.charAt(0))
            }
            return i
          }
        })()),
        (r = (function () {
          function t(t, e, r) {
            var i,
              n,
              o,
              s,
              a = 0,
              h = t.length,
              u = e % Q,
              f = (e / Q) | 0
            for (t = t.slice(); h--; )
              (a =
                (((n =
                  u * (o = t[h] % Q) +
                  ((i = f * o + (s = (t[h] / Q) | 0) * u) % Q) * Q +
                  a) /
                  r) |
                  0) +
                ((i / Q) | 0) +
                f * s),
                (t[h] = n % r)
            return a && (t = [a].concat(t)), t
          }
          function e(t, e, r, i) {
            var n, o
            if (r != i) o = r > i ? 1 : -1
            else
              for (n = o = 0; n < r; n++)
                if (t[n] != e[n]) {
                  o = t[n] > e[n] ? 1 : -1
                  break
                }
            return o
          }
          function r(t, e, r, i) {
            for (var n = 0; r--; )
              (t[r] -= n), (t[r] = (n = t[r] < e[r] ? 1 : 0) * i + t[r] - e[r])
            for (; !t[0] && t.length > 1; t.splice(0, 1));
          }
          return function (i, n, o, s, a) {
            var h,
              u,
              f,
              d,
              l,
              c,
              p,
              m,
              b,
              g,
              v,
              y,
              w,
              M,
              _,
              S,
              A,
              k = i.s == n.s ? 1 : -1,
              E = i.c,
              R = n.c
            if (!(E && E[0] && R && R[0]))
              return new x(
                i.s && n.s && (E ? !R || E[0] != R[0] : R)
                  ? (E && 0 == E[0]) || !R
                    ? 0 * k
                    : k / 0
                  : NaN
              )
            for (
              b = (m = new x(k)).c = [],
                k = o + (u = i.e - n.e) + 1,
                a ||
                  ((a = J), (u = et(i.e / G) - et(n.e / G)), (k = (k / G) | 0)),
                f = 0;
              R[f] == (E[f] || 0);
              f++
            );
            if ((R[f] > (E[f] || 0) && u--, k < 0)) b.push(1), (d = !0)
            else {
              for (
                M = E.length,
                  S = R.length,
                  f = 0,
                  k += 2,
                  (l = V(a / (R[0] + 1))) > 1 &&
                    ((R = t(R, l, a)),
                    (E = t(E, l, a)),
                    (S = R.length),
                    (M = E.length)),
                  w = S,
                  v = (g = E.slice(0, S)).length;
                v < S;
                g[v++] = 0
              );
              ;(A = R.slice()),
                (A = [0].concat(A)),
                (_ = R[0]),
                R[1] >= a / 2 && _++
              do {
                if (((l = 0), (h = e(R, g, S, v)) < 0)) {
                  if (
                    ((y = g[0]),
                    S != v && (y = y * a + (g[1] || 0)),
                    (l = V(y / _)) > 1)
                  )
                    for (
                      l >= a && (l = a - 1),
                        p = (c = t(R, l, a)).length,
                        v = g.length;
                      1 == e(c, g, p, v);

                    )
                      l--, r(c, S < p ? A : R, p, a), (p = c.length), (h = 1)
                  else 0 == l && (h = l = 1), (p = (c = R.slice()).length)
                  if (
                    (p < v && (c = [0].concat(c)),
                    r(g, c, v, a),
                    (v = g.length),
                    -1 == h)
                  )
                    for (; e(R, g, S, v) < 1; )
                      l++, r(g, S < v ? A : R, v, a), (v = g.length)
                } else 0 === h && (l++, (g = [0]))
                ;(b[f++] = l),
                  g[0] ? (g[v++] = E[w] || 0) : ((g = [E[w]]), (v = 1))
              } while ((w++ < M || null != g[0]) && k--)
              ;(d = null != g[0]), b[0] || b.splice(0, 1)
            }
            if (a == J) {
              for (f = 1, k = b[0]; k >= 10; k /= 10, f++);
              I(m, o + (m.e = f + u * G - 1) + 1, s, d)
            } else (m.e = u), (m.r = +d)
            return m
          }
        })()),
        (a = /^(-?)0([xbo])(?=\w[\w.]*$)/i),
        (h = /^([^.]+)\.$/),
        (u = /^\.([^.]+)$/),
        (f = /^-?(Infinity|NaN)$/),
        (d = /^\s*\+(?=[\w.])|^\s+|\s+$/g),
        (n = function (t, e, r, i) {
          var n,
            o = r ? e : e.replace(d, '')
          if (f.test(o)) t.s = isNaN(o) ? null : o < 0 ? -1 : 1
          else {
            if (
              !r &&
              ((o = o.replace(a, function (t, e, r) {
                return (
                  (n = 'x' == (r = r.toLowerCase()) ? 16 : 'b' == r ? 2 : 8),
                  i && i != n ? t : e
                )
              })),
              i && ((n = i), (o = o.replace(h, '$1').replace(u, '0.$1'))),
              e != o)
            )
              return new x(o, n)
            if (x.DEBUG)
              throw Error(
                $ + 'Not a' + (i ? ' base ' + i : '') + ' number: ' + e
              )
            t.s = null
          }
          t.c = t.e = null
        }),
        (l.absoluteValue = l.abs =
          function () {
            var t = new x(this)
            return t.s < 0 && (t.s = 1), t
          }),
        (l.comparedTo = function (t, e) {
          return it(this, new x(t, e))
        }),
        (l.decimalPlaces = l.dp =
          function (t, e) {
            var r,
              i,
              n,
              o = this
            if (null != t)
              return (
                nt(t, 0, tt),
                null == e ? (e = m) : nt(e, 0, 8),
                I(new x(o), t + o.e + 1, e)
              )
            if (!(r = o.c)) return null
            if (((i = ((n = r.length - 1) - et(this.e / G)) * G), (n = r[n])))
              for (; n % 10 == 0; n /= 10, i--);
            return i < 0 && (i = 0), i
          }),
        (l.dividedBy = l.div =
          function (t, e) {
            return r(this, new x(t, e), p, m)
          }),
        (l.dividedToIntegerBy = l.idiv =
          function (t, e) {
            return r(this, new x(t, e), 0, 1)
          }),
        (l.exponentiatedBy = l.pow =
          function (t, e) {
            var r,
              i,
              n,
              o,
              s,
              a,
              h,
              u,
              f = this
            if ((t = new x(t)).c && !t.isInteger())
              throw Error($ + 'Exponent not an integer: ' + N(t))
            if (
              (null != e && (e = new x(e)),
              (s = t.e > 14),
              !f.c ||
                !f.c[0] ||
                (1 == f.c[0] && !f.e && 1 == f.c.length) ||
                !t.c ||
                !t.c[0])
            )
              return (
                (u = new x(Math.pow(+N(f), s ? 2 - ot(t) : +N(t)))),
                e ? u.mod(e) : u
              )
            if (((a = t.s < 0), e)) {
              if (e.c ? !e.c[0] : !e.s) return new x(NaN)
              ;(i = !a && f.isInteger() && e.isInteger()) && (f = f.mod(e))
            } else {
              if (
                t.e > 9 &&
                (f.e > 0 ||
                  f.e < -1 ||
                  (0 == f.e
                    ? f.c[0] > 1 || (s && f.c[1] >= 24e7)
                    : f.c[0] < 8e13 || (s && f.c[0] <= 9999975e7)))
              )
                return (
                  (o = f.s < 0 && ot(t) ? -0 : 0),
                  f.e > -1 && (o = 1 / o),
                  new x(a ? 1 / o : o)
                )
              _ && (o = H(_ / G + 2))
            }
            for (
              s
                ? ((r = new x(0.5)), a && (t.s = 1), (h = ot(t)))
                : (h = (n = Math.abs(+N(t))) % 2),
                u = new x(c);
              ;

            ) {
              if (h) {
                if (!(u = u.times(f)).c) break
                o ? u.c.length > o && (u.c.length = o) : i && (u = u.mod(e))
              }
              if (n) {
                if (0 === (n = V(n / 2))) break
                h = n % 2
              } else if ((I((t = t.times(r)), t.e + 1, 1), t.e > 14)) h = ot(t)
              else {
                if (0 == (n = +N(t))) break
                h = n % 2
              }
              ;(f = f.times(f)),
                o
                  ? f.c && f.c.length > o && (f.c.length = o)
                  : i && (f = f.mod(e))
            }
            return i
              ? u
              : (a && (u = c.div(u)), e ? u.mod(e) : o ? I(u, _, m, void 0) : u)
          }),
        (l.integerValue = function (t) {
          var e = new x(this)
          return null == t ? (t = m) : nt(t, 0, 8), I(e, e.e + 1, t)
        }),
        (l.isEqualTo = l.eq =
          function (t, e) {
            return 0 === it(this, new x(t, e))
          }),
        (l.isFinite = function () {
          return !!this.c
        }),
        (l.isGreaterThan = l.gt =
          function (t, e) {
            return it(this, new x(t, e)) > 0
          }),
        (l.isGreaterThanOrEqualTo = l.gte =
          function (t, e) {
            return 1 === (e = it(this, new x(t, e))) || 0 === e
          }),
        (l.isInteger = function () {
          return !!this.c && et(this.e / G) > this.c.length - 2
        }),
        (l.isLessThan = l.lt =
          function (t, e) {
            return it(this, new x(t, e)) < 0
          }),
        (l.isLessThanOrEqualTo = l.lte =
          function (t, e) {
            return -1 === (e = it(this, new x(t, e))) || 0 === e
          }),
        (l.isNaN = function () {
          return !this.s
        }),
        (l.isNegative = function () {
          return this.s < 0
        }),
        (l.isPositive = function () {
          return this.s > 0
        }),
        (l.isZero = function () {
          return !!this.c && 0 == this.c[0]
        }),
        (l.minus = function (t, e) {
          var r,
            i,
            n,
            o,
            s = this,
            a = s.s
          if (((e = (t = new x(t, e)).s), !a || !e)) return new x(NaN)
          if (a != e) return (t.s = -e), s.plus(t)
          var h = s.e / G,
            u = t.e / G,
            f = s.c,
            d = t.c
          if (!h || !u) {
            if (!f || !d) return f ? ((t.s = -e), t) : new x(d ? s : NaN)
            if (!f[0] || !d[0])
              return d[0] ? ((t.s = -e), t) : new x(f[0] ? s : 3 == m ? -0 : 0)
          }
          if (((h = et(h)), (u = et(u)), (f = f.slice()), (a = h - u))) {
            for (
              (o = a < 0) ? ((a = -a), (n = f)) : ((u = h), (n = d)),
                n.reverse(),
                e = a;
              e--;
              n.push(0)
            );
            n.reverse()
          } else
            for (
              i = (o = (a = f.length) < (e = d.length)) ? a : e, a = e = 0;
              e < i;
              e++
            )
              if (f[e] != d[e]) {
                o = f[e] < d[e]
                break
              }
          if (
            (o && ((n = f), (f = d), (d = n), (t.s = -t.s)),
            (e = (i = d.length) - (r = f.length)) > 0)
          )
            for (; e--; f[r++] = 0);
          for (e = J - 1; i > a; ) {
            if (f[--i] < d[i]) {
              for (r = i; r && !f[--r]; f[r] = e);
              --f[r], (f[i] += J)
            }
            f[i] -= d[i]
          }
          for (; 0 == f[0]; f.splice(0, 1), --u);
          return f[0]
            ? B(t, f, u)
            : ((t.s = 3 == m ? -1 : 1), (t.c = [(t.e = 0)]), t)
        }),
        (l.modulo = l.mod =
          function (t, e) {
            var i,
              n,
              o = this
            return (
              (t = new x(t, e)),
              !o.c || !t.s || (t.c && !t.c[0])
                ? new x(NaN)
                : !t.c || (o.c && !o.c[0])
                ? new x(o)
                : (9 == M
                    ? ((n = t.s),
                      (t.s = 1),
                      (i = r(o, t, 0, 3)),
                      (t.s = n),
                      (i.s *= n))
                    : (i = r(o, t, 0, M)),
                  (t = o.minus(i.times(t))).c[0] || 1 != M || (t.s = o.s),
                  t)
            )
          }),
        (l.multipliedBy = l.times =
          function (t, e) {
            var r,
              i,
              n,
              o,
              s,
              a,
              h,
              u,
              f,
              d,
              l,
              c,
              p,
              m,
              b,
              g = this,
              v = g.c,
              y = (t = new x(t, e)).c
            if (!(v && y && v[0] && y[0]))
              return (
                !g.s || !t.s || (v && !v[0] && !y) || (y && !y[0] && !v)
                  ? (t.c = t.e = t.s = null)
                  : ((t.s *= g.s),
                    v && y ? ((t.c = [0]), (t.e = 0)) : (t.c = t.e = null)),
                t
              )
            for (
              i = et(g.e / G) + et(t.e / G),
                t.s *= g.s,
                (h = v.length) < (d = y.length) &&
                  ((p = v), (v = y), (y = p), (n = h), (h = d), (d = n)),
                n = h + d,
                p = [];
              n--;
              p.push(0)
            );
            for (m = J, b = Q, n = d; --n >= 0; ) {
              for (
                r = 0, l = y[n] % b, c = (y[n] / b) | 0, o = n + (s = h);
                o > n;

              )
                (r =
                  (((u =
                    l * (u = v[--s] % b) +
                    ((a = c * u + (f = (v[s] / b) | 0) * l) % b) * b +
                    p[o] +
                    r) /
                    m) |
                    0) +
                  ((a / b) | 0) +
                  c * f),
                  (p[o--] = u % m)
              p[o] = r
            }
            return r ? ++i : p.splice(0, 1), B(t, p, i)
          }),
        (l.negated = function () {
          var t = new x(this)
          return (t.s = -t.s || null), t
        }),
        (l.plus = function (t, e) {
          var r,
            i = this,
            n = i.s
          if (((e = (t = new x(t, e)).s), !n || !e)) return new x(NaN)
          if (n != e) return (t.s = -e), i.minus(t)
          var o = i.e / G,
            s = t.e / G,
            a = i.c,
            h = t.c
          if (!o || !s) {
            if (!a || !h) return new x(n / 0)
            if (!a[0] || !h[0]) return h[0] ? t : new x(a[0] ? i : 0 * n)
          }
          if (((o = et(o)), (s = et(s)), (a = a.slice()), (n = o - s))) {
            for (
              n > 0 ? ((s = o), (r = h)) : ((n = -n), (r = a)), r.reverse();
              n--;
              r.push(0)
            );
            r.reverse()
          }
          for (
            (n = a.length) - (e = h.length) < 0 &&
              ((r = h), (h = a), (a = r), (e = n)),
              n = 0;
            e;

          )
            (n = ((a[--e] = a[e] + h[e] + n) / J) | 0),
              (a[e] = J === a[e] ? 0 : a[e] % J)
          return n && ((a = [n].concat(a)), ++s), B(t, a, s)
        }),
        (l.precision = l.sd =
          function (t, e) {
            var r,
              i,
              n,
              o = this
            if (null != t && t !== !!t)
              return (
                nt(t, 1, tt),
                null == e ? (e = m) : nt(e, 0, 8),
                I(new x(o), t, e)
              )
            if (!(r = o.c)) return null
            if (((i = (n = r.length - 1) * G + 1), (n = r[n]))) {
              for (; n % 10 == 0; n /= 10, i--);
              for (n = r[0]; n >= 10; n /= 10, i++);
            }
            return t && o.e + 1 > i && (i = o.e + 1), i
          }),
        (l.shiftedBy = function (t) {
          return nt(t, -9007199254740991, X), this.times('1e' + t)
        }),
        (l.squareRoot = l.sqrt =
          function () {
            var t,
              e,
              i,
              n,
              o,
              s = this,
              a = s.c,
              h = s.s,
              u = s.e,
              f = p + 4,
              d = new x('0.5')
            if (1 !== h || !a || !a[0])
              return new x(!h || (h < 0 && (!a || a[0])) ? NaN : a ? s : 1 / 0)
            if (
              (0 == (h = Math.sqrt(+N(s))) || h == 1 / 0
                ? (((e = rt(a)).length + u) % 2 == 0 && (e += '0'),
                  (h = Math.sqrt(+e)),
                  (u = et((u + 1) / 2) - (u < 0 || u % 2)),
                  (i = new x(
                    (e =
                      h == 1 / 0
                        ? '5e' + u
                        : (e = h.toExponential()).slice(0, e.indexOf('e') + 1) +
                          u)
                  )))
                : (i = new x(h + '')),
              i.c[0])
            )
              for ((h = (u = i.e) + f) < 3 && (h = 0); ; )
                if (
                  ((i = d.times((o = i).plus(r(s, o, f, 1)))),
                  rt(o.c).slice(0, h) === (e = rt(i.c)).slice(0, h))
                ) {
                  if (
                    (i.e < u && --h,
                    '9999' != (e = e.slice(h - 3, h + 1)) && (n || '4999' != e))
                  ) {
                    ;(+e && (+e.slice(1) || '5' != e.charAt(0))) ||
                      (I(i, i.e + p + 2, 1), (t = !i.times(i).eq(s)))
                    break
                  }
                  if (!n && (I(o, o.e + p + 2, 0), o.times(o).eq(s))) {
                    i = o
                    break
                  }
                  ;(f += 4), (h += 4), (n = 1)
                }
            return I(i, i.e + p + 1, m, t)
          }),
        (l.toExponential = function (t, e) {
          return null != t && (nt(t, 0, tt), t++), E(this, t, e, 1)
        }),
        (l.toFixed = function (t, e) {
          return (
            null != t && (nt(t, 0, tt), (t = t + this.e + 1)), E(this, t, e)
          )
        }),
        (l.toFormat = function (t, e, r) {
          var i,
            n = this
          if (null == r)
            null != t && e && 'object' == typeof e
              ? ((r = e), (e = null))
              : t && 'object' == typeof t
              ? ((r = t), (t = e = null))
              : (r = S)
          else if ('object' != typeof r)
            throw Error($ + 'Argument not an object: ' + r)
          if (((i = n.toFixed(t, e)), n.c)) {
            var o,
              s = i.split('.'),
              a = +r.groupSize,
              h = +r.secondaryGroupSize,
              u = r.groupSeparator || '',
              f = s[0],
              d = s[1],
              l = n.s < 0,
              c = l ? f.slice(1) : f,
              p = c.length
            if ((h && ((o = a), (a = h), (h = o), (p -= o)), a > 0 && p > 0)) {
              for (f = c.substr(0, (o = p % a || a)); o < p; o += a)
                f += u + c.substr(o, a)
              h > 0 && (f += u + c.slice(o)), l && (f = '-' + f)
            }
            i = d
              ? f +
                (r.decimalSeparator || '') +
                ((h = +r.fractionGroupSize)
                  ? d.replace(
                      new RegExp('\\d{' + h + '}\\B', 'g'),
                      '$&' + (r.fractionGroupSeparator || '')
                    )
                  : d)
              : f
          }
          return (r.prefix || '') + i + (r.suffix || '')
        }),
        (l.toFraction = function (t) {
          var e,
            i,
            n,
            o,
            s,
            a,
            h,
            u,
            f,
            d,
            l,
            p,
            b = this,
            g = b.c
          if (
            null != t &&
            ((!(h = new x(t)).isInteger() && (h.c || 1 !== h.s)) || h.lt(c))
          )
            throw Error(
              $ +
                'Argument ' +
                (h.isInteger() ? 'out of range: ' : 'not an integer: ') +
                N(h)
            )
          if (!g) return new x(b)
          for (
            e = new x(c),
              f = i = new x(c),
              n = u = new x(c),
              p = rt(g),
              s = e.e = p.length - b.e - 1,
              e.c[0] = Y[(a = s % G) < 0 ? G + a : a],
              t = !t || h.comparedTo(e) > 0 ? (s > 0 ? e : f) : h,
              a = y,
              y = 1 / 0,
              h = new x(p),
              u.c[0] = 0;
            (d = r(h, e, 0, 1)), 1 != (o = i.plus(d.times(n))).comparedTo(t);

          )
            (i = n),
              (n = o),
              (f = u.plus(d.times((o = f)))),
              (u = o),
              (e = h.minus(d.times((o = e)))),
              (h = o)
          return (
            (o = r(t.minus(i), n, 0, 1)),
            (u = u.plus(o.times(f))),
            (i = i.plus(o.times(n))),
            (u.s = f.s = b.s),
            (l =
              r(f, n, (s *= 2), m)
                .minus(b)
                .abs()
                .comparedTo(r(u, i, s, m).minus(b).abs()) < 1
                ? [f, n]
                : [u, i]),
            (y = a),
            l
          )
        }),
        (l.toNumber = function () {
          return +N(this)
        }),
        (l.toPrecision = function (t, e) {
          return null != t && nt(t, 1, tt), E(this, t, e, 2)
        }),
        (l.toString = function (t) {
          var e,
            r = this,
            n = r.s,
            o = r.e
          return (
            null === o
              ? n
                ? ((e = 'Infinity'), n < 0 && (e = '-' + e))
                : (e = 'NaN')
              : (null == t
                  ? (e =
                      o <= b || o >= g ? st(rt(r.c), o) : at(rt(r.c), o, '0'))
                  : 10 === t && k
                  ? (e = at(rt((r = I(new x(r), p + o + 1, m)).c), r.e, '0'))
                  : (nt(t, 2, A.length, 'Base'),
                    (e = i(at(rt(r.c), o, '0'), 10, t, n, !0))),
                n < 0 && r.c[0] && (e = '-' + e)),
            e
          )
        }),
        (l.valueOf = l.toJSON =
          function () {
            return N(this)
          }),
        (l._isBigNumber = !0),
        (l[Symbol.toStringTag] = 'BigNumber'),
        (l[Symbol.for('nodejs.util.inspect.custom')] = l.valueOf),
        null != e && x.set(e),
        x
      )
    })()
    class ht {
      static getWeb3(t = {}) {
        return new N.default(
          t.web3Provider ||
            N.default.givenProvider ||
            new N.default.providers.HttpProvider(t.nodeUri)
        )
      }
    }
    class ut {
      static serialize(t) {
        return JSON.stringify(t, null, 2)
      }
      static deserialize(t) {
        const e = JSON.parse(t)
        return new ut(e)
      }
      constructor(t = {}) {
        ;(this['@context'] = 'https://w3id.org/did/v1'),
          (this.id = null),
          (this.created = void 0),
          (this.updated = void 0),
          (this.dataToken = void 0),
          (this.publicKey = []),
          (this.authentication = []),
          (this.service = []),
          (this.proof = void 0),
          (this.price = void 0),
          (this.isInPurgatory = void 0),
          (this.purgatoryData = void 0),
          (this.dataTokenInfo = void 0),
          (this.credentials = void 0),
          (this.chainId = void 0),
          (this.event = void 0),
          Object.assign(this, t, {
            created:
              (t && t.created) ||
              new Date().toISOString().replace(/\.[0-9]{3}/, '')
          })
      }
      shortId() {
        return this.id.replace('did:op:', '')
      }
      findServiceById(t) {
        if (isNaN(t)) throw new Error('index is not set')
        const e = this.service.find((e) => e.index === t)
        return e
      }
      findServiceByType(t) {
        if (!t) throw new Error('serviceType not set')
        return this.service.find((e) => e.type === t)
      }
      getChecksum() {
        const { attributes: t } = this.findServiceByType('metadata'),
          { files: e, name: r, author: i, license: n } = t.main,
          o = [
            ...(e || []).map(({ checksum: t }) => t).filter((t) => !!t),
            r,
            i,
            n,
            this.id
          ]
        return ht
          .getWeb3()
          .utils.sha3(o.join(''))
          .replace(/^0x([a-f0-9]{64})(:!.+)?$/i, '0x$1')
      }
      async addProof(t, e, r) {
        if (this.proof) throw new Error('Proof already exists')
        this.proof = {
          created: new Date().toISOString().replace(/\.[0-9]{3}/, ''),
          creator: e,
          type: 'AddressHash',
          signatureValue: ht
            .getWeb3()
            .utils.sha3(e)
            .replace(/^0x([a-f0-9]{64})(:!.+)?$/i, '0x$1')
        }
      }
    }
    var ft =
      'undefined' != typeof globalThis
        ? globalThis
        : 'undefined' != typeof window
        ? window
        : 'undefined' != typeof global
        ? global
        : 'undefined' != typeof self
        ? self
        : {}
    function dt(t) {
      var e = { exports: {} }
      return t(e, e.exports), e.exports
    }
    function lt(t) {
      throw new Error(
        'Could not dynamically require "' +
          t +
          '". Please configure the dynamicRequireTargets option of @rollup/plugin-commonjs appropriately for this require call to behave properly.'
      )
    }
    var ct = dt(function (t) {
      !(function (t, e) {
        function r(t, e) {
          if (!t) throw new Error(e || 'Assertion failed')
        }
        function i(t, e) {
          t.super_ = e
          var r = function () {}
          ;(r.prototype = e.prototype),
            (t.prototype = new r()),
            (t.prototype.constructor = t)
        }
        function n(t, e, r) {
          if (n.isBN(t)) return t
          ;(this.negative = 0),
            (this.words = null),
            (this.length = 0),
            (this.red = null),
            null !== t &&
              (('le' !== e && 'be' !== e) || ((r = e), (e = 10)),
              this._init(t || 0, e || 10, r || 'be'))
        }
        var o
        'object' == typeof t ? (t.exports = n) : (e.BN = n),
          (n.BN = n),
          (n.wordSize = 26)
        try {
          o = lt('buffer').Buffer
        } catch (t) {}
        function s(t, e, r) {
          for (var i = 0, n = Math.min(t.length, r), o = e; o < n; o++) {
            var s = t.charCodeAt(o) - 48
            ;(i <<= 4),
              (i |=
                s >= 49 && s <= 54
                  ? s - 49 + 10
                  : s >= 17 && s <= 22
                  ? s - 17 + 10
                  : 15 & s)
          }
          return i
        }
        function a(t, e, r, i) {
          for (var n = 0, o = Math.min(t.length, r), s = e; s < o; s++) {
            var a = t.charCodeAt(s) - 48
            ;(n *= i), (n += a >= 49 ? a - 49 + 10 : a >= 17 ? a - 17 + 10 : a)
          }
          return n
        }
        ;(n.isBN = function (t) {
          return (
            t instanceof n ||
            (null !== t &&
              'object' == typeof t &&
              t.constructor.wordSize === n.wordSize &&
              Array.isArray(t.words))
          )
        }),
          (n.max = function (t, e) {
            return t.cmp(e) > 0 ? t : e
          }),
          (n.min = function (t, e) {
            return t.cmp(e) < 0 ? t : e
          }),
          (n.prototype._init = function (t, e, i) {
            if ('number' == typeof t) return this._initNumber(t, e, i)
            if ('object' == typeof t) return this._initArray(t, e, i)
            'hex' === e && (e = 16), r(e === (0 | e) && e >= 2 && e <= 36)
            var n = 0
            '-' === (t = t.toString().replace(/\s+/g, ''))[0] && n++,
              16 === e ? this._parseHex(t, n) : this._parseBase(t, e, n),
              '-' === t[0] && (this.negative = 1),
              this.strip(),
              'le' === i && this._initArray(this.toArray(), e, i)
          }),
          (n.prototype._initNumber = function (t, e, i) {
            t < 0 && ((this.negative = 1), (t = -t)),
              t < 67108864
                ? ((this.words = [67108863 & t]), (this.length = 1))
                : t < 4503599627370496
                ? ((this.words = [67108863 & t, (t / 67108864) & 67108863]),
                  (this.length = 2))
                : (r(t < 9007199254740992),
                  (this.words = [67108863 & t, (t / 67108864) & 67108863, 1]),
                  (this.length = 3)),
              'le' === i && this._initArray(this.toArray(), e, i)
          }),
          (n.prototype._initArray = function (t, e, i) {
            if ((r('number' == typeof t.length), t.length <= 0))
              return (this.words = [0]), (this.length = 1), this
            ;(this.length = Math.ceil(t.length / 3)),
              (this.words = new Array(this.length))
            for (var n = 0; n < this.length; n++) this.words[n] = 0
            var o,
              s,
              a = 0
            if ('be' === i)
              for (n = t.length - 1, o = 0; n >= 0; n -= 3)
                (this.words[o] |=
                  ((s = t[n] | (t[n - 1] << 8) | (t[n - 2] << 16)) << a) &
                  67108863),
                  (this.words[o + 1] = (s >>> (26 - a)) & 67108863),
                  (a += 24) >= 26 && ((a -= 26), o++)
            else if ('le' === i)
              for (n = 0, o = 0; n < t.length; n += 3)
                (this.words[o] |=
                  ((s = t[n] | (t[n + 1] << 8) | (t[n + 2] << 16)) << a) &
                  67108863),
                  (this.words[o + 1] = (s >>> (26 - a)) & 67108863),
                  (a += 24) >= 26 && ((a -= 26), o++)
            return this.strip()
          }),
          (n.prototype._parseHex = function (t, e) {
            ;(this.length = Math.ceil((t.length - e) / 6)),
              (this.words = new Array(this.length))
            for (var r = 0; r < this.length; r++) this.words[r] = 0
            var i,
              n,
              o = 0
            for (r = t.length - 6, i = 0; r >= e; r -= 6)
              (n = s(t, r, r + 6)),
                (this.words[i] |= (n << o) & 67108863),
                (this.words[i + 1] |= (n >>> (26 - o)) & 4194303),
                (o += 24) >= 26 && ((o -= 26), i++)
            r + 6 !== e &&
              ((n = s(t, e, r + 6)),
              (this.words[i] |= (n << o) & 67108863),
              (this.words[i + 1] |= (n >>> (26 - o)) & 4194303)),
              this.strip()
          }),
          (n.prototype._parseBase = function (t, e, r) {
            ;(this.words = [0]), (this.length = 1)
            for (var i = 0, n = 1; n <= 67108863; n *= e) i++
            i--, (n = (n / e) | 0)
            for (
              var o = t.length - r,
                s = o % i,
                h = Math.min(o, o - s) + r,
                u = 0,
                f = r;
              f < h;
              f += i
            )
              (u = a(t, f, f + i, e)),
                this.imuln(n),
                this.words[0] + u < 67108864
                  ? (this.words[0] += u)
                  : this._iaddn(u)
            if (0 !== s) {
              var d = 1
              for (u = a(t, f, t.length, e), f = 0; f < s; f++) d *= e
              this.imuln(d),
                this.words[0] + u < 67108864
                  ? (this.words[0] += u)
                  : this._iaddn(u)
            }
          }),
          (n.prototype.copy = function (t) {
            t.words = new Array(this.length)
            for (var e = 0; e < this.length; e++) t.words[e] = this.words[e]
            ;(t.length = this.length),
              (t.negative = this.negative),
              (t.red = this.red)
          }),
          (n.prototype.clone = function () {
            var t = new n(null)
            return this.copy(t), t
          }),
          (n.prototype._expand = function (t) {
            for (; this.length < t; ) this.words[this.length++] = 0
            return this
          }),
          (n.prototype.strip = function () {
            for (; this.length > 1 && 0 === this.words[this.length - 1]; )
              this.length--
            return this._normSign()
          }),
          (n.prototype._normSign = function () {
            return (
              1 === this.length && 0 === this.words[0] && (this.negative = 0),
              this
            )
          }),
          (n.prototype.inspect = function () {
            return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>'
          })
        var h = [
            '',
            '0',
            '00',
            '000',
            '0000',
            '00000',
            '000000',
            '0000000',
            '00000000',
            '000000000',
            '0000000000',
            '00000000000',
            '000000000000',
            '0000000000000',
            '00000000000000',
            '000000000000000',
            '0000000000000000',
            '00000000000000000',
            '000000000000000000',
            '0000000000000000000',
            '00000000000000000000',
            '000000000000000000000',
            '0000000000000000000000',
            '00000000000000000000000',
            '000000000000000000000000',
            '0000000000000000000000000'
          ],
          u = [
            0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6,
            5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
          ],
          f = [
            0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607,
            16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536,
            11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101,
            5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368,
            20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875,
            60466176
          ]
        function d(t, e, r) {
          r.negative = e.negative ^ t.negative
          var i = (t.length + e.length) | 0
          ;(r.length = i), (i = (i - 1) | 0)
          var n = 0 | t.words[0],
            o = 0 | e.words[0],
            s = n * o,
            a = (s / 67108864) | 0
          r.words[0] = 67108863 & s
          for (var h = 1; h < i; h++) {
            for (
              var u = a >>> 26,
                f = 67108863 & a,
                d = Math.min(h, e.length - 1),
                l = Math.max(0, h - t.length + 1);
              l <= d;
              l++
            )
              (u +=
                ((s =
                  (n = 0 | t.words[(h - l) | 0]) * (o = 0 | e.words[l]) + f) /
                  67108864) |
                0),
                (f = 67108863 & s)
            ;(r.words[h] = 0 | f), (a = 0 | u)
          }
          return 0 !== a ? (r.words[h] = 0 | a) : r.length--, r.strip()
        }
        ;(n.prototype.toString = function (t, e) {
          var i
          if (((e = 0 | e || 1), 16 === (t = t || 10) || 'hex' === t)) {
            i = ''
            for (var n = 0, o = 0, s = 0; s < this.length; s++) {
              var a = this.words[s],
                d = (16777215 & ((a << n) | o)).toString(16)
              ;(i =
                0 != (o = (a >>> (24 - n)) & 16777215) || s !== this.length - 1
                  ? h[6 - d.length] + d + i
                  : d + i),
                (n += 2) >= 26 && ((n -= 26), s--)
            }
            for (0 !== o && (i = o.toString(16) + i); i.length % e != 0; )
              i = '0' + i
            return 0 !== this.negative && (i = '-' + i), i
          }
          if (t === (0 | t) && t >= 2 && t <= 36) {
            var l = u[t],
              c = f[t]
            i = ''
            var p = this.clone()
            for (p.negative = 0; !p.isZero(); ) {
              var m = p.modn(c).toString(t)
              i = (p = p.idivn(c)).isZero() ? m + i : h[l - m.length] + m + i
            }
            for (this.isZero() && (i = '0' + i); i.length % e != 0; )
              i = '0' + i
            return 0 !== this.negative && (i = '-' + i), i
          }
          r(!1, 'Base should be between 2 and 36')
        }),
          (n.prototype.toNumber = function () {
            var t = this.words[0]
            return (
              2 === this.length
                ? (t += 67108864 * this.words[1])
                : 3 === this.length && 1 === this.words[2]
                ? (t += 4503599627370496 + 67108864 * this.words[1])
                : this.length > 2 &&
                  r(!1, 'Number can only safely store up to 53 bits'),
              0 !== this.negative ? -t : t
            )
          }),
          (n.prototype.toJSON = function () {
            return this.toString(16)
          }),
          (n.prototype.toBuffer = function (t, e) {
            return r(void 0 !== o), this.toArrayLike(o, t, e)
          }),
          (n.prototype.toArray = function (t, e) {
            return this.toArrayLike(Array, t, e)
          }),
          (n.prototype.toArrayLike = function (t, e, i) {
            var n = this.byteLength(),
              o = i || Math.max(1, n)
            r(n <= o, 'byte array longer than desired length'),
              r(o > 0, 'Requested array length <= 0'),
              this.strip()
            var s,
              a,
              h = 'le' === e,
              u = new t(o),
              f = this.clone()
            if (h) {
              for (a = 0; !f.isZero(); a++)
                (s = f.andln(255)), f.iushrn(8), (u[a] = s)
              for (; a < o; a++) u[a] = 0
            } else {
              for (a = 0; a < o - n; a++) u[a] = 0
              for (a = 0; !f.isZero(); a++)
                (s = f.andln(255)), f.iushrn(8), (u[o - a - 1] = s)
            }
            return u
          }),
          (n.prototype._countBits = Math.clz32
            ? function (t) {
                return 32 - Math.clz32(t)
              }
            : function (t) {
                var e = t,
                  r = 0
                return (
                  e >= 4096 && ((r += 13), (e >>>= 13)),
                  e >= 64 && ((r += 7), (e >>>= 7)),
                  e >= 8 && ((r += 4), (e >>>= 4)),
                  e >= 2 && ((r += 2), (e >>>= 2)),
                  r + e
                )
              }),
          (n.prototype._zeroBits = function (t) {
            if (0 === t) return 26
            var e = t,
              r = 0
            return (
              0 == (8191 & e) && ((r += 13), (e >>>= 13)),
              0 == (127 & e) && ((r += 7), (e >>>= 7)),
              0 == (15 & e) && ((r += 4), (e >>>= 4)),
              0 == (3 & e) && ((r += 2), (e >>>= 2)),
              0 == (1 & e) && r++,
              r
            )
          }),
          (n.prototype.bitLength = function () {
            var t = this._countBits(this.words[this.length - 1])
            return 26 * (this.length - 1) + t
          }),
          (n.prototype.zeroBits = function () {
            if (this.isZero()) return 0
            for (var t = 0, e = 0; e < this.length; e++) {
              var r = this._zeroBits(this.words[e])
              if (((t += r), 26 !== r)) break
            }
            return t
          }),
          (n.prototype.byteLength = function () {
            return Math.ceil(this.bitLength() / 8)
          }),
          (n.prototype.toTwos = function (t) {
            return 0 !== this.negative
              ? this.abs().inotn(t).iaddn(1)
              : this.clone()
          }),
          (n.prototype.fromTwos = function (t) {
            return this.testn(t - 1)
              ? this.notn(t).iaddn(1).ineg()
              : this.clone()
          }),
          (n.prototype.isNeg = function () {
            return 0 !== this.negative
          }),
          (n.prototype.neg = function () {
            return this.clone().ineg()
          }),
          (n.prototype.ineg = function () {
            return this.isZero() || (this.negative ^= 1), this
          }),
          (n.prototype.iuor = function (t) {
            for (; this.length < t.length; ) this.words[this.length++] = 0
            for (var e = 0; e < t.length; e++)
              this.words[e] = this.words[e] | t.words[e]
            return this.strip()
          }),
          (n.prototype.ior = function (t) {
            return r(0 == (this.negative | t.negative)), this.iuor(t)
          }),
          (n.prototype.or = function (t) {
            return this.length > t.length
              ? this.clone().ior(t)
              : t.clone().ior(this)
          }),
          (n.prototype.uor = function (t) {
            return this.length > t.length
              ? this.clone().iuor(t)
              : t.clone().iuor(this)
          }),
          (n.prototype.iuand = function (t) {
            var e
            e = this.length > t.length ? t : this
            for (var r = 0; r < e.length; r++)
              this.words[r] = this.words[r] & t.words[r]
            return (this.length = e.length), this.strip()
          }),
          (n.prototype.iand = function (t) {
            return r(0 == (this.negative | t.negative)), this.iuand(t)
          }),
          (n.prototype.and = function (t) {
            return this.length > t.length
              ? this.clone().iand(t)
              : t.clone().iand(this)
          }),
          (n.prototype.uand = function (t) {
            return this.length > t.length
              ? this.clone().iuand(t)
              : t.clone().iuand(this)
          }),
          (n.prototype.iuxor = function (t) {
            var e, r
            this.length > t.length
              ? ((e = this), (r = t))
              : ((e = t), (r = this))
            for (var i = 0; i < r.length; i++)
              this.words[i] = e.words[i] ^ r.words[i]
            if (this !== e) for (; i < e.length; i++) this.words[i] = e.words[i]
            return (this.length = e.length), this.strip()
          }),
          (n.prototype.ixor = function (t) {
            return r(0 == (this.negative | t.negative)), this.iuxor(t)
          }),
          (n.prototype.xor = function (t) {
            return this.length > t.length
              ? this.clone().ixor(t)
              : t.clone().ixor(this)
          }),
          (n.prototype.uxor = function (t) {
            return this.length > t.length
              ? this.clone().iuxor(t)
              : t.clone().iuxor(this)
          }),
          (n.prototype.inotn = function (t) {
            r('number' == typeof t && t >= 0)
            var e = 0 | Math.ceil(t / 26),
              i = t % 26
            this._expand(e), i > 0 && e--
            for (var n = 0; n < e; n++)
              this.words[n] = 67108863 & ~this.words[n]
            return (
              i > 0 &&
                (this.words[n] = ~this.words[n] & (67108863 >> (26 - i))),
              this.strip()
            )
          }),
          (n.prototype.notn = function (t) {
            return this.clone().inotn(t)
          }),
          (n.prototype.setn = function (t, e) {
            r('number' == typeof t && t >= 0)
            var i = (t / 26) | 0,
              n = t % 26
            return (
              this._expand(i + 1),
              (this.words[i] = e
                ? this.words[i] | (1 << n)
                : this.words[i] & ~(1 << n)),
              this.strip()
            )
          }),
          (n.prototype.iadd = function (t) {
            var e, r, i
            if (0 !== this.negative && 0 === t.negative)
              return (
                (this.negative = 0),
                (e = this.isub(t)),
                (this.negative ^= 1),
                this._normSign()
              )
            if (0 === this.negative && 0 !== t.negative)
              return (
                (t.negative = 0),
                (e = this.isub(t)),
                (t.negative = 1),
                e._normSign()
              )
            this.length > t.length
              ? ((r = this), (i = t))
              : ((r = t), (i = this))
            for (var n = 0, o = 0; o < i.length; o++)
              (this.words[o] =
                67108863 & (e = (0 | r.words[o]) + (0 | i.words[o]) + n)),
                (n = e >>> 26)
            for (; 0 !== n && o < r.length; o++)
              (this.words[o] = 67108863 & (e = (0 | r.words[o]) + n)),
                (n = e >>> 26)
            if (((this.length = r.length), 0 !== n))
              (this.words[this.length] = n), this.length++
            else if (r !== this)
              for (; o < r.length; o++) this.words[o] = r.words[o]
            return this
          }),
          (n.prototype.add = function (t) {
            var e
            return 0 !== t.negative && 0 === this.negative
              ? ((t.negative = 0), (e = this.sub(t)), (t.negative ^= 1), e)
              : 0 === t.negative && 0 !== this.negative
              ? ((this.negative = 0), (e = t.sub(this)), (this.negative = 1), e)
              : this.length > t.length
              ? this.clone().iadd(t)
              : t.clone().iadd(this)
          }),
          (n.prototype.isub = function (t) {
            if (0 !== t.negative) {
              t.negative = 0
              var e = this.iadd(t)
              return (t.negative = 1), e._normSign()
            }
            if (0 !== this.negative)
              return (
                (this.negative = 0),
                this.iadd(t),
                (this.negative = 1),
                this._normSign()
              )
            var r,
              i,
              n = this.cmp(t)
            if (0 === n)
              return (
                (this.negative = 0),
                (this.length = 1),
                (this.words[0] = 0),
                this
              )
            n > 0 ? ((r = this), (i = t)) : ((r = t), (i = this))
            for (var o = 0, s = 0; s < i.length; s++)
              (o = (e = (0 | r.words[s]) - (0 | i.words[s]) + o) >> 26),
                (this.words[s] = 67108863 & e)
            for (; 0 !== o && s < r.length; s++)
              (o = (e = (0 | r.words[s]) + o) >> 26),
                (this.words[s] = 67108863 & e)
            if (0 === o && s < r.length && r !== this)
              for (; s < r.length; s++) this.words[s] = r.words[s]
            return (
              (this.length = Math.max(this.length, s)),
              r !== this && (this.negative = 1),
              this.strip()
            )
          }),
          (n.prototype.sub = function (t) {
            return this.clone().isub(t)
          })
        var l = function (t, e, r) {
          var i,
            n,
            o,
            s = t.words,
            a = e.words,
            h = r.words,
            u = 0,
            f = 0 | s[0],
            d = 8191 & f,
            l = f >>> 13,
            c = 0 | s[1],
            p = 8191 & c,
            m = c >>> 13,
            b = 0 | s[2],
            g = 8191 & b,
            v = b >>> 13,
            y = 0 | s[3],
            w = 8191 & y,
            M = y >>> 13,
            _ = 0 | s[4],
            S = 8191 & _,
            A = _ >>> 13,
            k = 0 | s[5],
            x = 8191 & k,
            E = k >>> 13,
            R = 0 | s[6],
            B = 8191 & R,
            I = R >>> 13,
            N = 0 | s[7],
            T = 8191 & N,
            P = N >>> 13,
            O = 0 | s[8],
            q = 8191 & O,
            L = O >>> 13,
            z = 0 | s[9],
            j = 8191 & z,
            C = z >>> 13,
            U = 0 | a[0],
            D = 8191 & U,
            Z = U >>> 13,
            F = 0 | a[1],
            K = 8191 & F,
            H = F >>> 13,
            V = 0 | a[2],
            $ = 8191 & V,
            W = V >>> 13,
            J = 0 | a[3],
            G = 8191 & J,
            X = J >>> 13,
            Y = 0 | a[4],
            Q = 8191 & Y,
            tt = Y >>> 13,
            et = 0 | a[5],
            rt = 8191 & et,
            it = et >>> 13,
            nt = 0 | a[6],
            ot = 8191 & nt,
            st = nt >>> 13,
            at = 0 | a[7],
            ht = 8191 & at,
            ut = at >>> 13,
            ft = 0 | a[8],
            dt = 8191 & ft,
            lt = ft >>> 13,
            ct = 0 | a[9],
            pt = 8191 & ct,
            mt = ct >>> 13
          ;(r.negative = t.negative ^ e.negative), (r.length = 19)
          var bt =
            (((u + (i = Math.imul(d, D))) | 0) +
              ((8191 & (n = ((n = Math.imul(d, Z)) + Math.imul(l, D)) | 0)) <<
                13)) |
            0
          ;(u = ((((o = Math.imul(l, Z)) + (n >>> 13)) | 0) + (bt >>> 26)) | 0),
            (bt &= 67108863),
            (i = Math.imul(p, D)),
            (n = ((n = Math.imul(p, Z)) + Math.imul(m, D)) | 0),
            (o = Math.imul(m, Z))
          var gt =
            (((u + (i = (i + Math.imul(d, K)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(d, H)) | 0) + Math.imul(l, K)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(l, H)) | 0) + (n >>> 13)) | 0) +
              (gt >>> 26)) |
            0),
            (gt &= 67108863),
            (i = Math.imul(g, D)),
            (n = ((n = Math.imul(g, Z)) + Math.imul(v, D)) | 0),
            (o = Math.imul(v, Z)),
            (i = (i + Math.imul(p, K)) | 0),
            (n = ((n = (n + Math.imul(p, H)) | 0) + Math.imul(m, K)) | 0),
            (o = (o + Math.imul(m, H)) | 0)
          var vt =
            (((u + (i = (i + Math.imul(d, $)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(d, W)) | 0) + Math.imul(l, $)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(l, W)) | 0) + (n >>> 13)) | 0) +
              (vt >>> 26)) |
            0),
            (vt &= 67108863),
            (i = Math.imul(w, D)),
            (n = ((n = Math.imul(w, Z)) + Math.imul(M, D)) | 0),
            (o = Math.imul(M, Z)),
            (i = (i + Math.imul(g, K)) | 0),
            (n = ((n = (n + Math.imul(g, H)) | 0) + Math.imul(v, K)) | 0),
            (o = (o + Math.imul(v, H)) | 0),
            (i = (i + Math.imul(p, $)) | 0),
            (n = ((n = (n + Math.imul(p, W)) | 0) + Math.imul(m, $)) | 0),
            (o = (o + Math.imul(m, W)) | 0)
          var yt =
            (((u + (i = (i + Math.imul(d, G)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(d, X)) | 0) + Math.imul(l, G)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(l, X)) | 0) + (n >>> 13)) | 0) +
              (yt >>> 26)) |
            0),
            (yt &= 67108863),
            (i = Math.imul(S, D)),
            (n = ((n = Math.imul(S, Z)) + Math.imul(A, D)) | 0),
            (o = Math.imul(A, Z)),
            (i = (i + Math.imul(w, K)) | 0),
            (n = ((n = (n + Math.imul(w, H)) | 0) + Math.imul(M, K)) | 0),
            (o = (o + Math.imul(M, H)) | 0),
            (i = (i + Math.imul(g, $)) | 0),
            (n = ((n = (n + Math.imul(g, W)) | 0) + Math.imul(v, $)) | 0),
            (o = (o + Math.imul(v, W)) | 0),
            (i = (i + Math.imul(p, G)) | 0),
            (n = ((n = (n + Math.imul(p, X)) | 0) + Math.imul(m, G)) | 0),
            (o = (o + Math.imul(m, X)) | 0)
          var wt =
            (((u + (i = (i + Math.imul(d, Q)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(d, tt)) | 0) + Math.imul(l, Q)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(l, tt)) | 0) + (n >>> 13)) | 0) +
              (wt >>> 26)) |
            0),
            (wt &= 67108863),
            (i = Math.imul(x, D)),
            (n = ((n = Math.imul(x, Z)) + Math.imul(E, D)) | 0),
            (o = Math.imul(E, Z)),
            (i = (i + Math.imul(S, K)) | 0),
            (n = ((n = (n + Math.imul(S, H)) | 0) + Math.imul(A, K)) | 0),
            (o = (o + Math.imul(A, H)) | 0),
            (i = (i + Math.imul(w, $)) | 0),
            (n = ((n = (n + Math.imul(w, W)) | 0) + Math.imul(M, $)) | 0),
            (o = (o + Math.imul(M, W)) | 0),
            (i = (i + Math.imul(g, G)) | 0),
            (n = ((n = (n + Math.imul(g, X)) | 0) + Math.imul(v, G)) | 0),
            (o = (o + Math.imul(v, X)) | 0),
            (i = (i + Math.imul(p, Q)) | 0),
            (n = ((n = (n + Math.imul(p, tt)) | 0) + Math.imul(m, Q)) | 0),
            (o = (o + Math.imul(m, tt)) | 0)
          var Mt =
            (((u + (i = (i + Math.imul(d, rt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(d, it)) | 0) + Math.imul(l, rt)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(l, it)) | 0) + (n >>> 13)) | 0) +
              (Mt >>> 26)) |
            0),
            (Mt &= 67108863),
            (i = Math.imul(B, D)),
            (n = ((n = Math.imul(B, Z)) + Math.imul(I, D)) | 0),
            (o = Math.imul(I, Z)),
            (i = (i + Math.imul(x, K)) | 0),
            (n = ((n = (n + Math.imul(x, H)) | 0) + Math.imul(E, K)) | 0),
            (o = (o + Math.imul(E, H)) | 0),
            (i = (i + Math.imul(S, $)) | 0),
            (n = ((n = (n + Math.imul(S, W)) | 0) + Math.imul(A, $)) | 0),
            (o = (o + Math.imul(A, W)) | 0),
            (i = (i + Math.imul(w, G)) | 0),
            (n = ((n = (n + Math.imul(w, X)) | 0) + Math.imul(M, G)) | 0),
            (o = (o + Math.imul(M, X)) | 0),
            (i = (i + Math.imul(g, Q)) | 0),
            (n = ((n = (n + Math.imul(g, tt)) | 0) + Math.imul(v, Q)) | 0),
            (o = (o + Math.imul(v, tt)) | 0),
            (i = (i + Math.imul(p, rt)) | 0),
            (n = ((n = (n + Math.imul(p, it)) | 0) + Math.imul(m, rt)) | 0),
            (o = (o + Math.imul(m, it)) | 0)
          var _t =
            (((u + (i = (i + Math.imul(d, ot)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(d, st)) | 0) + Math.imul(l, ot)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(l, st)) | 0) + (n >>> 13)) | 0) +
              (_t >>> 26)) |
            0),
            (_t &= 67108863),
            (i = Math.imul(T, D)),
            (n = ((n = Math.imul(T, Z)) + Math.imul(P, D)) | 0),
            (o = Math.imul(P, Z)),
            (i = (i + Math.imul(B, K)) | 0),
            (n = ((n = (n + Math.imul(B, H)) | 0) + Math.imul(I, K)) | 0),
            (o = (o + Math.imul(I, H)) | 0),
            (i = (i + Math.imul(x, $)) | 0),
            (n = ((n = (n + Math.imul(x, W)) | 0) + Math.imul(E, $)) | 0),
            (o = (o + Math.imul(E, W)) | 0),
            (i = (i + Math.imul(S, G)) | 0),
            (n = ((n = (n + Math.imul(S, X)) | 0) + Math.imul(A, G)) | 0),
            (o = (o + Math.imul(A, X)) | 0),
            (i = (i + Math.imul(w, Q)) | 0),
            (n = ((n = (n + Math.imul(w, tt)) | 0) + Math.imul(M, Q)) | 0),
            (o = (o + Math.imul(M, tt)) | 0),
            (i = (i + Math.imul(g, rt)) | 0),
            (n = ((n = (n + Math.imul(g, it)) | 0) + Math.imul(v, rt)) | 0),
            (o = (o + Math.imul(v, it)) | 0),
            (i = (i + Math.imul(p, ot)) | 0),
            (n = ((n = (n + Math.imul(p, st)) | 0) + Math.imul(m, ot)) | 0),
            (o = (o + Math.imul(m, st)) | 0)
          var St =
            (((u + (i = (i + Math.imul(d, ht)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(d, ut)) | 0) + Math.imul(l, ht)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(l, ut)) | 0) + (n >>> 13)) | 0) +
              (St >>> 26)) |
            0),
            (St &= 67108863),
            (i = Math.imul(q, D)),
            (n = ((n = Math.imul(q, Z)) + Math.imul(L, D)) | 0),
            (o = Math.imul(L, Z)),
            (i = (i + Math.imul(T, K)) | 0),
            (n = ((n = (n + Math.imul(T, H)) | 0) + Math.imul(P, K)) | 0),
            (o = (o + Math.imul(P, H)) | 0),
            (i = (i + Math.imul(B, $)) | 0),
            (n = ((n = (n + Math.imul(B, W)) | 0) + Math.imul(I, $)) | 0),
            (o = (o + Math.imul(I, W)) | 0),
            (i = (i + Math.imul(x, G)) | 0),
            (n = ((n = (n + Math.imul(x, X)) | 0) + Math.imul(E, G)) | 0),
            (o = (o + Math.imul(E, X)) | 0),
            (i = (i + Math.imul(S, Q)) | 0),
            (n = ((n = (n + Math.imul(S, tt)) | 0) + Math.imul(A, Q)) | 0),
            (o = (o + Math.imul(A, tt)) | 0),
            (i = (i + Math.imul(w, rt)) | 0),
            (n = ((n = (n + Math.imul(w, it)) | 0) + Math.imul(M, rt)) | 0),
            (o = (o + Math.imul(M, it)) | 0),
            (i = (i + Math.imul(g, ot)) | 0),
            (n = ((n = (n + Math.imul(g, st)) | 0) + Math.imul(v, ot)) | 0),
            (o = (o + Math.imul(v, st)) | 0),
            (i = (i + Math.imul(p, ht)) | 0),
            (n = ((n = (n + Math.imul(p, ut)) | 0) + Math.imul(m, ht)) | 0),
            (o = (o + Math.imul(m, ut)) | 0)
          var At =
            (((u + (i = (i + Math.imul(d, dt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(d, lt)) | 0) + Math.imul(l, dt)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(l, lt)) | 0) + (n >>> 13)) | 0) +
              (At >>> 26)) |
            0),
            (At &= 67108863),
            (i = Math.imul(j, D)),
            (n = ((n = Math.imul(j, Z)) + Math.imul(C, D)) | 0),
            (o = Math.imul(C, Z)),
            (i = (i + Math.imul(q, K)) | 0),
            (n = ((n = (n + Math.imul(q, H)) | 0) + Math.imul(L, K)) | 0),
            (o = (o + Math.imul(L, H)) | 0),
            (i = (i + Math.imul(T, $)) | 0),
            (n = ((n = (n + Math.imul(T, W)) | 0) + Math.imul(P, $)) | 0),
            (o = (o + Math.imul(P, W)) | 0),
            (i = (i + Math.imul(B, G)) | 0),
            (n = ((n = (n + Math.imul(B, X)) | 0) + Math.imul(I, G)) | 0),
            (o = (o + Math.imul(I, X)) | 0),
            (i = (i + Math.imul(x, Q)) | 0),
            (n = ((n = (n + Math.imul(x, tt)) | 0) + Math.imul(E, Q)) | 0),
            (o = (o + Math.imul(E, tt)) | 0),
            (i = (i + Math.imul(S, rt)) | 0),
            (n = ((n = (n + Math.imul(S, it)) | 0) + Math.imul(A, rt)) | 0),
            (o = (o + Math.imul(A, it)) | 0),
            (i = (i + Math.imul(w, ot)) | 0),
            (n = ((n = (n + Math.imul(w, st)) | 0) + Math.imul(M, ot)) | 0),
            (o = (o + Math.imul(M, st)) | 0),
            (i = (i + Math.imul(g, ht)) | 0),
            (n = ((n = (n + Math.imul(g, ut)) | 0) + Math.imul(v, ht)) | 0),
            (o = (o + Math.imul(v, ut)) | 0),
            (i = (i + Math.imul(p, dt)) | 0),
            (n = ((n = (n + Math.imul(p, lt)) | 0) + Math.imul(m, dt)) | 0),
            (o = (o + Math.imul(m, lt)) | 0)
          var kt =
            (((u + (i = (i + Math.imul(d, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(d, mt)) | 0) + Math.imul(l, pt)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(l, mt)) | 0) + (n >>> 13)) | 0) +
              (kt >>> 26)) |
            0),
            (kt &= 67108863),
            (i = Math.imul(j, K)),
            (n = ((n = Math.imul(j, H)) + Math.imul(C, K)) | 0),
            (o = Math.imul(C, H)),
            (i = (i + Math.imul(q, $)) | 0),
            (n = ((n = (n + Math.imul(q, W)) | 0) + Math.imul(L, $)) | 0),
            (o = (o + Math.imul(L, W)) | 0),
            (i = (i + Math.imul(T, G)) | 0),
            (n = ((n = (n + Math.imul(T, X)) | 0) + Math.imul(P, G)) | 0),
            (o = (o + Math.imul(P, X)) | 0),
            (i = (i + Math.imul(B, Q)) | 0),
            (n = ((n = (n + Math.imul(B, tt)) | 0) + Math.imul(I, Q)) | 0),
            (o = (o + Math.imul(I, tt)) | 0),
            (i = (i + Math.imul(x, rt)) | 0),
            (n = ((n = (n + Math.imul(x, it)) | 0) + Math.imul(E, rt)) | 0),
            (o = (o + Math.imul(E, it)) | 0),
            (i = (i + Math.imul(S, ot)) | 0),
            (n = ((n = (n + Math.imul(S, st)) | 0) + Math.imul(A, ot)) | 0),
            (o = (o + Math.imul(A, st)) | 0),
            (i = (i + Math.imul(w, ht)) | 0),
            (n = ((n = (n + Math.imul(w, ut)) | 0) + Math.imul(M, ht)) | 0),
            (o = (o + Math.imul(M, ut)) | 0),
            (i = (i + Math.imul(g, dt)) | 0),
            (n = ((n = (n + Math.imul(g, lt)) | 0) + Math.imul(v, dt)) | 0),
            (o = (o + Math.imul(v, lt)) | 0)
          var xt =
            (((u + (i = (i + Math.imul(p, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(p, mt)) | 0) + Math.imul(m, pt)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(m, mt)) | 0) + (n >>> 13)) | 0) +
              (xt >>> 26)) |
            0),
            (xt &= 67108863),
            (i = Math.imul(j, $)),
            (n = ((n = Math.imul(j, W)) + Math.imul(C, $)) | 0),
            (o = Math.imul(C, W)),
            (i = (i + Math.imul(q, G)) | 0),
            (n = ((n = (n + Math.imul(q, X)) | 0) + Math.imul(L, G)) | 0),
            (o = (o + Math.imul(L, X)) | 0),
            (i = (i + Math.imul(T, Q)) | 0),
            (n = ((n = (n + Math.imul(T, tt)) | 0) + Math.imul(P, Q)) | 0),
            (o = (o + Math.imul(P, tt)) | 0),
            (i = (i + Math.imul(B, rt)) | 0),
            (n = ((n = (n + Math.imul(B, it)) | 0) + Math.imul(I, rt)) | 0),
            (o = (o + Math.imul(I, it)) | 0),
            (i = (i + Math.imul(x, ot)) | 0),
            (n = ((n = (n + Math.imul(x, st)) | 0) + Math.imul(E, ot)) | 0),
            (o = (o + Math.imul(E, st)) | 0),
            (i = (i + Math.imul(S, ht)) | 0),
            (n = ((n = (n + Math.imul(S, ut)) | 0) + Math.imul(A, ht)) | 0),
            (o = (o + Math.imul(A, ut)) | 0),
            (i = (i + Math.imul(w, dt)) | 0),
            (n = ((n = (n + Math.imul(w, lt)) | 0) + Math.imul(M, dt)) | 0),
            (o = (o + Math.imul(M, lt)) | 0)
          var Et =
            (((u + (i = (i + Math.imul(g, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(g, mt)) | 0) + Math.imul(v, pt)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(v, mt)) | 0) + (n >>> 13)) | 0) +
              (Et >>> 26)) |
            0),
            (Et &= 67108863),
            (i = Math.imul(j, G)),
            (n = ((n = Math.imul(j, X)) + Math.imul(C, G)) | 0),
            (o = Math.imul(C, X)),
            (i = (i + Math.imul(q, Q)) | 0),
            (n = ((n = (n + Math.imul(q, tt)) | 0) + Math.imul(L, Q)) | 0),
            (o = (o + Math.imul(L, tt)) | 0),
            (i = (i + Math.imul(T, rt)) | 0),
            (n = ((n = (n + Math.imul(T, it)) | 0) + Math.imul(P, rt)) | 0),
            (o = (o + Math.imul(P, it)) | 0),
            (i = (i + Math.imul(B, ot)) | 0),
            (n = ((n = (n + Math.imul(B, st)) | 0) + Math.imul(I, ot)) | 0),
            (o = (o + Math.imul(I, st)) | 0),
            (i = (i + Math.imul(x, ht)) | 0),
            (n = ((n = (n + Math.imul(x, ut)) | 0) + Math.imul(E, ht)) | 0),
            (o = (o + Math.imul(E, ut)) | 0),
            (i = (i + Math.imul(S, dt)) | 0),
            (n = ((n = (n + Math.imul(S, lt)) | 0) + Math.imul(A, dt)) | 0),
            (o = (o + Math.imul(A, lt)) | 0)
          var Rt =
            (((u + (i = (i + Math.imul(w, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(w, mt)) | 0) + Math.imul(M, pt)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(M, mt)) | 0) + (n >>> 13)) | 0) +
              (Rt >>> 26)) |
            0),
            (Rt &= 67108863),
            (i = Math.imul(j, Q)),
            (n = ((n = Math.imul(j, tt)) + Math.imul(C, Q)) | 0),
            (o = Math.imul(C, tt)),
            (i = (i + Math.imul(q, rt)) | 0),
            (n = ((n = (n + Math.imul(q, it)) | 0) + Math.imul(L, rt)) | 0),
            (o = (o + Math.imul(L, it)) | 0),
            (i = (i + Math.imul(T, ot)) | 0),
            (n = ((n = (n + Math.imul(T, st)) | 0) + Math.imul(P, ot)) | 0),
            (o = (o + Math.imul(P, st)) | 0),
            (i = (i + Math.imul(B, ht)) | 0),
            (n = ((n = (n + Math.imul(B, ut)) | 0) + Math.imul(I, ht)) | 0),
            (o = (o + Math.imul(I, ut)) | 0),
            (i = (i + Math.imul(x, dt)) | 0),
            (n = ((n = (n + Math.imul(x, lt)) | 0) + Math.imul(E, dt)) | 0),
            (o = (o + Math.imul(E, lt)) | 0)
          var Bt =
            (((u + (i = (i + Math.imul(S, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(S, mt)) | 0) + Math.imul(A, pt)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(A, mt)) | 0) + (n >>> 13)) | 0) +
              (Bt >>> 26)) |
            0),
            (Bt &= 67108863),
            (i = Math.imul(j, rt)),
            (n = ((n = Math.imul(j, it)) + Math.imul(C, rt)) | 0),
            (o = Math.imul(C, it)),
            (i = (i + Math.imul(q, ot)) | 0),
            (n = ((n = (n + Math.imul(q, st)) | 0) + Math.imul(L, ot)) | 0),
            (o = (o + Math.imul(L, st)) | 0),
            (i = (i + Math.imul(T, ht)) | 0),
            (n = ((n = (n + Math.imul(T, ut)) | 0) + Math.imul(P, ht)) | 0),
            (o = (o + Math.imul(P, ut)) | 0),
            (i = (i + Math.imul(B, dt)) | 0),
            (n = ((n = (n + Math.imul(B, lt)) | 0) + Math.imul(I, dt)) | 0),
            (o = (o + Math.imul(I, lt)) | 0)
          var It =
            (((u + (i = (i + Math.imul(x, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(x, mt)) | 0) + Math.imul(E, pt)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(E, mt)) | 0) + (n >>> 13)) | 0) +
              (It >>> 26)) |
            0),
            (It &= 67108863),
            (i = Math.imul(j, ot)),
            (n = ((n = Math.imul(j, st)) + Math.imul(C, ot)) | 0),
            (o = Math.imul(C, st)),
            (i = (i + Math.imul(q, ht)) | 0),
            (n = ((n = (n + Math.imul(q, ut)) | 0) + Math.imul(L, ht)) | 0),
            (o = (o + Math.imul(L, ut)) | 0),
            (i = (i + Math.imul(T, dt)) | 0),
            (n = ((n = (n + Math.imul(T, lt)) | 0) + Math.imul(P, dt)) | 0),
            (o = (o + Math.imul(P, lt)) | 0)
          var Nt =
            (((u + (i = (i + Math.imul(B, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(B, mt)) | 0) + Math.imul(I, pt)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(I, mt)) | 0) + (n >>> 13)) | 0) +
              (Nt >>> 26)) |
            0),
            (Nt &= 67108863),
            (i = Math.imul(j, ht)),
            (n = ((n = Math.imul(j, ut)) + Math.imul(C, ht)) | 0),
            (o = Math.imul(C, ut)),
            (i = (i + Math.imul(q, dt)) | 0),
            (n = ((n = (n + Math.imul(q, lt)) | 0) + Math.imul(L, dt)) | 0),
            (o = (o + Math.imul(L, lt)) | 0)
          var Tt =
            (((u + (i = (i + Math.imul(T, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(T, mt)) | 0) + Math.imul(P, pt)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(P, mt)) | 0) + (n >>> 13)) | 0) +
              (Tt >>> 26)) |
            0),
            (Tt &= 67108863),
            (i = Math.imul(j, dt)),
            (n = ((n = Math.imul(j, lt)) + Math.imul(C, dt)) | 0),
            (o = Math.imul(C, lt))
          var Pt =
            (((u + (i = (i + Math.imul(q, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(q, mt)) | 0) + Math.imul(L, pt)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(L, mt)) | 0) + (n >>> 13)) | 0) +
              (Pt >>> 26)) |
            0),
            (Pt &= 67108863)
          var Ot =
            (((u + (i = Math.imul(j, pt))) | 0) +
              ((8191 & (n = ((n = Math.imul(j, mt)) + Math.imul(C, pt)) | 0)) <<
                13)) |
            0
          return (
            (u =
              ((((o = Math.imul(C, mt)) + (n >>> 13)) | 0) + (Ot >>> 26)) | 0),
            (Ot &= 67108863),
            (h[0] = bt),
            (h[1] = gt),
            (h[2] = vt),
            (h[3] = yt),
            (h[4] = wt),
            (h[5] = Mt),
            (h[6] = _t),
            (h[7] = St),
            (h[8] = At),
            (h[9] = kt),
            (h[10] = xt),
            (h[11] = Et),
            (h[12] = Rt),
            (h[13] = Bt),
            (h[14] = It),
            (h[15] = Nt),
            (h[16] = Tt),
            (h[17] = Pt),
            (h[18] = Ot),
            0 !== u && ((h[19] = u), r.length++),
            r
          )
        }
        function c(t, e, r) {
          return new p().mulp(t, e, r)
        }
        function p(t, e) {
          ;(this.x = t), (this.y = e)
        }
        Math.imul || (l = d),
          (n.prototype.mulTo = function (t, e) {
            var r,
              i = this.length + t.length
            return (
              (r =
                10 === this.length && 10 === t.length
                  ? l(this, t, e)
                  : i < 63
                  ? d(this, t, e)
                  : i < 1024
                  ? (function (t, e, r) {
                      ;(r.negative = e.negative ^ t.negative),
                        (r.length = t.length + e.length)
                      for (var i = 0, n = 0, o = 0; o < r.length - 1; o++) {
                        var s = n
                        n = 0
                        for (
                          var a = 67108863 & i,
                            h = Math.min(o, e.length - 1),
                            u = Math.max(0, o - t.length + 1);
                          u <= h;
                          u++
                        ) {
                          var f = (0 | t.words[o - u]) * (0 | e.words[u]),
                            d = 67108863 & f
                          ;(a = 67108863 & (d = (d + a) | 0)),
                            (n +=
                              (s =
                                ((s = (s + ((f / 67108864) | 0)) | 0) +
                                  (d >>> 26)) |
                                0) >>> 26),
                            (s &= 67108863)
                        }
                        ;(r.words[o] = a), (i = s), (s = n)
                      }
                      return 0 !== i ? (r.words[o] = i) : r.length--, r.strip()
                    })(this, t, e)
                  : c(this, t, e)),
              r
            )
          }),
          (p.prototype.makeRBT = function (t) {
            for (
              var e = new Array(t), r = n.prototype._countBits(t) - 1, i = 0;
              i < t;
              i++
            )
              e[i] = this.revBin(i, r, t)
            return e
          }),
          (p.prototype.revBin = function (t, e, r) {
            if (0 === t || t === r - 1) return t
            for (var i = 0, n = 0; n < e; n++)
              (i |= (1 & t) << (e - n - 1)), (t >>= 1)
            return i
          }),
          (p.prototype.permute = function (t, e, r, i, n, o) {
            for (var s = 0; s < o; s++) (i[s] = e[t[s]]), (n[s] = r[t[s]])
          }),
          (p.prototype.transform = function (t, e, r, i, n, o) {
            this.permute(o, t, e, r, i, n)
            for (var s = 1; s < n; s <<= 1)
              for (
                var a = s << 1,
                  h = Math.cos((2 * Math.PI) / a),
                  u = Math.sin((2 * Math.PI) / a),
                  f = 0;
                f < n;
                f += a
              )
                for (var d = h, l = u, c = 0; c < s; c++) {
                  var p = r[f + c],
                    m = i[f + c],
                    b = r[f + c + s],
                    g = i[f + c + s],
                    v = d * b - l * g
                  ;(g = d * g + l * b),
                    (r[f + c] = p + (b = v)),
                    (i[f + c] = m + g),
                    (r[f + c + s] = p - b),
                    (i[f + c + s] = m - g),
                    c !== a &&
                      ((v = h * d - u * l), (l = h * l + u * d), (d = v))
                }
          }),
          (p.prototype.guessLen13b = function (t, e) {
            var r = 1 | Math.max(e, t),
              i = 1 & r,
              n = 0
            for (r = (r / 2) | 0; r; r >>>= 1) n++
            return 1 << (n + 1 + i)
          }),
          (p.prototype.conjugate = function (t, e, r) {
            if (!(r <= 1))
              for (var i = 0; i < r / 2; i++) {
                var n = t[i]
                ;(t[i] = t[r - i - 1]),
                  (t[r - i - 1] = n),
                  (n = e[i]),
                  (e[i] = -e[r - i - 1]),
                  (e[r - i - 1] = -n)
              }
          }),
          (p.prototype.normalize13b = function (t, e) {
            for (var r = 0, i = 0; i < e / 2; i++) {
              var n =
                8192 * Math.round(t[2 * i + 1] / e) +
                Math.round(t[2 * i] / e) +
                r
              ;(t[i] = 67108863 & n),
                (r = n < 67108864 ? 0 : (n / 67108864) | 0)
            }
            return t
          }),
          (p.prototype.convert13b = function (t, e, i, n) {
            for (var o = 0, s = 0; s < e; s++)
              (i[2 * s] = 8191 & (o += 0 | t[s])),
                (i[2 * s + 1] = 8191 & (o >>>= 13)),
                (o >>>= 13)
            for (s = 2 * e; s < n; ++s) i[s] = 0
            r(0 === o), r(0 == (-8192 & o))
          }),
          (p.prototype.stub = function (t) {
            for (var e = new Array(t), r = 0; r < t; r++) e[r] = 0
            return e
          }),
          (p.prototype.mulp = function (t, e, r) {
            var i = 2 * this.guessLen13b(t.length, e.length),
              n = this.makeRBT(i),
              o = this.stub(i),
              s = new Array(i),
              a = new Array(i),
              h = new Array(i),
              u = new Array(i),
              f = new Array(i),
              d = new Array(i),
              l = r.words
            ;(l.length = i),
              this.convert13b(t.words, t.length, s, i),
              this.convert13b(e.words, e.length, u, i),
              this.transform(s, o, a, h, i, n),
              this.transform(u, o, f, d, i, n)
            for (var c = 0; c < i; c++) {
              var p = a[c] * f[c] - h[c] * d[c]
              ;(h[c] = a[c] * d[c] + h[c] * f[c]), (a[c] = p)
            }
            return (
              this.conjugate(a, h, i),
              this.transform(a, h, l, o, i, n),
              this.conjugate(l, o, i),
              this.normalize13b(l, i),
              (r.negative = t.negative ^ e.negative),
              (r.length = t.length + e.length),
              r.strip()
            )
          }),
          (n.prototype.mul = function (t) {
            var e = new n(null)
            return (
              (e.words = new Array(this.length + t.length)), this.mulTo(t, e)
            )
          }),
          (n.prototype.mulf = function (t) {
            var e = new n(null)
            return (e.words = new Array(this.length + t.length)), c(this, t, e)
          }),
          (n.prototype.imul = function (t) {
            return this.clone().mulTo(t, this)
          }),
          (n.prototype.imuln = function (t) {
            r('number' == typeof t), r(t < 67108864)
            for (var e = 0, i = 0; i < this.length; i++) {
              var n = (0 | this.words[i]) * t,
                o = (67108863 & n) + (67108863 & e)
              ;(e >>= 26),
                (e += (n / 67108864) | 0),
                (e += o >>> 26),
                (this.words[i] = 67108863 & o)
            }
            return 0 !== e && ((this.words[i] = e), this.length++), this
          }),
          (n.prototype.muln = function (t) {
            return this.clone().imuln(t)
          }),
          (n.prototype.sqr = function () {
            return this.mul(this)
          }),
          (n.prototype.isqr = function () {
            return this.imul(this.clone())
          }),
          (n.prototype.pow = function (t) {
            var e = (function (t) {
              for (var e = new Array(t.bitLength()), r = 0; r < e.length; r++) {
                var i = r % 26
                e[r] = (t.words[(r / 26) | 0] & (1 << i)) >>> i
              }
              return e
            })(t)
            if (0 === e.length) return new n(1)
            for (
              var r = this, i = 0;
              i < e.length && 0 === e[i];
              i++, r = r.sqr()
            );
            if (++i < e.length)
              for (var o = r.sqr(); i < e.length; i++, o = o.sqr())
                0 !== e[i] && (r = r.mul(o))
            return r
          }),
          (n.prototype.iushln = function (t) {
            r('number' == typeof t && t >= 0)
            var e,
              i = t % 26,
              n = (t - i) / 26,
              o = (67108863 >>> (26 - i)) << (26 - i)
            if (0 !== i) {
              var s = 0
              for (e = 0; e < this.length; e++) {
                var a = this.words[e] & o
                ;(this.words[e] = (((0 | this.words[e]) - a) << i) | s),
                  (s = a >>> (26 - i))
              }
              s && ((this.words[e] = s), this.length++)
            }
            if (0 !== n) {
              for (e = this.length - 1; e >= 0; e--)
                this.words[e + n] = this.words[e]
              for (e = 0; e < n; e++) this.words[e] = 0
              this.length += n
            }
            return this.strip()
          }),
          (n.prototype.ishln = function (t) {
            return r(0 === this.negative), this.iushln(t)
          }),
          (n.prototype.iushrn = function (t, e, i) {
            var n
            r('number' == typeof t && t >= 0), (n = e ? (e - (e % 26)) / 26 : 0)
            var o = t % 26,
              s = Math.min((t - o) / 26, this.length),
              a = 67108863 ^ ((67108863 >>> o) << o),
              h = i
            if (((n -= s), (n = Math.max(0, n)), h)) {
              for (var u = 0; u < s; u++) h.words[u] = this.words[u]
              h.length = s
            }
            if (0 === s);
            else if (this.length > s)
              for (this.length -= s, u = 0; u < this.length; u++)
                this.words[u] = this.words[u + s]
            else (this.words[0] = 0), (this.length = 1)
            var f = 0
            for (u = this.length - 1; u >= 0 && (0 !== f || u >= n); u--) {
              var d = 0 | this.words[u]
              ;(this.words[u] = (f << (26 - o)) | (d >>> o)), (f = d & a)
            }
            return (
              h && 0 !== f && (h.words[h.length++] = f),
              0 === this.length && ((this.words[0] = 0), (this.length = 1)),
              this.strip()
            )
          }),
          (n.prototype.ishrn = function (t, e, i) {
            return r(0 === this.negative), this.iushrn(t, e, i)
          }),
          (n.prototype.shln = function (t) {
            return this.clone().ishln(t)
          }),
          (n.prototype.ushln = function (t) {
            return this.clone().iushln(t)
          }),
          (n.prototype.shrn = function (t) {
            return this.clone().ishrn(t)
          }),
          (n.prototype.ushrn = function (t) {
            return this.clone().iushrn(t)
          }),
          (n.prototype.testn = function (t) {
            r('number' == typeof t && t >= 0)
            var e = t % 26,
              i = (t - e) / 26
            return !(this.length <= i || !(this.words[i] & (1 << e)))
          }),
          (n.prototype.imaskn = function (t) {
            r('number' == typeof t && t >= 0)
            var e = t % 26,
              i = (t - e) / 26
            return (
              r(0 === this.negative, 'imaskn works only with positive numbers'),
              this.length <= i
                ? this
                : (0 !== e && i++,
                  (this.length = Math.min(i, this.length)),
                  0 !== e &&
                    (this.words[this.length - 1] &=
                      67108863 ^ ((67108863 >>> e) << e)),
                  this.strip())
            )
          }),
          (n.prototype.maskn = function (t) {
            return this.clone().imaskn(t)
          }),
          (n.prototype.iaddn = function (t) {
            return (
              r('number' == typeof t),
              r(t < 67108864),
              t < 0
                ? this.isubn(-t)
                : 0 !== this.negative
                ? 1 === this.length && (0 | this.words[0]) < t
                  ? ((this.words[0] = t - (0 | this.words[0])),
                    (this.negative = 0),
                    this)
                  : ((this.negative = 0),
                    this.isubn(t),
                    (this.negative = 1),
                    this)
                : this._iaddn(t)
            )
          }),
          (n.prototype._iaddn = function (t) {
            this.words[0] += t
            for (var e = 0; e < this.length && this.words[e] >= 67108864; e++)
              (this.words[e] -= 67108864),
                e === this.length - 1
                  ? (this.words[e + 1] = 1)
                  : this.words[e + 1]++
            return (this.length = Math.max(this.length, e + 1)), this
          }),
          (n.prototype.isubn = function (t) {
            if ((r('number' == typeof t), r(t < 67108864), t < 0))
              return this.iaddn(-t)
            if (0 !== this.negative)
              return (
                (this.negative = 0), this.iaddn(t), (this.negative = 1), this
              )
            if (((this.words[0] -= t), 1 === this.length && this.words[0] < 0))
              (this.words[0] = -this.words[0]), (this.negative = 1)
            else
              for (var e = 0; e < this.length && this.words[e] < 0; e++)
                (this.words[e] += 67108864), (this.words[e + 1] -= 1)
            return this.strip()
          }),
          (n.prototype.addn = function (t) {
            return this.clone().iaddn(t)
          }),
          (n.prototype.subn = function (t) {
            return this.clone().isubn(t)
          }),
          (n.prototype.iabs = function () {
            return (this.negative = 0), this
          }),
          (n.prototype.abs = function () {
            return this.clone().iabs()
          }),
          (n.prototype._ishlnsubmul = function (t, e, i) {
            var n, o
            this._expand(t.length + i)
            var s = 0
            for (n = 0; n < t.length; n++) {
              o = (0 | this.words[n + i]) + s
              var a = (0 | t.words[n]) * e
              ;(s = ((o -= 67108863 & a) >> 26) - ((a / 67108864) | 0)),
                (this.words[n + i] = 67108863 & o)
            }
            for (; n < this.length - i; n++)
              (s = (o = (0 | this.words[n + i]) + s) >> 26),
                (this.words[n + i] = 67108863 & o)
            if (0 === s) return this.strip()
            for (r(-1 === s), s = 0, n = 0; n < this.length; n++)
              (s = (o = -(0 | this.words[n]) + s) >> 26),
                (this.words[n] = 67108863 & o)
            return (this.negative = 1), this.strip()
          }),
          (n.prototype._wordDiv = function (t, e) {
            var r,
              i = this.clone(),
              o = t,
              s = 0 | o.words[o.length - 1]
            0 != (r = 26 - this._countBits(s)) &&
              ((o = o.ushln(r)), i.iushln(r), (s = 0 | o.words[o.length - 1]))
            var a,
              h = i.length - o.length
            if ('mod' !== e) {
              ;((a = new n(null)).length = h + 1),
                (a.words = new Array(a.length))
              for (var u = 0; u < a.length; u++) a.words[u] = 0
            }
            var f = i.clone()._ishlnsubmul(o, 1, h)
            0 === f.negative && ((i = f), a && (a.words[h] = 1))
            for (var d = h - 1; d >= 0; d--) {
              var l =
                67108864 * (0 | i.words[o.length + d]) +
                (0 | i.words[o.length + d - 1])
              for (
                l = Math.min((l / s) | 0, 67108863), i._ishlnsubmul(o, l, d);
                0 !== i.negative;

              )
                l--,
                  (i.negative = 0),
                  i._ishlnsubmul(o, 1, d),
                  i.isZero() || (i.negative ^= 1)
              a && (a.words[d] = l)
            }
            return (
              a && a.strip(),
              i.strip(),
              'div' !== e && 0 !== r && i.iushrn(r),
              { div: a || null, mod: i }
            )
          }),
          (n.prototype.divmod = function (t, e, i) {
            return (
              r(!t.isZero()),
              this.isZero()
                ? { div: new n(0), mod: new n(0) }
                : 0 !== this.negative && 0 === t.negative
                ? ((a = this.neg().divmod(t, e)),
                  'mod' !== e && (o = a.div.neg()),
                  'div' !== e &&
                    ((s = a.mod.neg()), i && 0 !== s.negative && s.iadd(t)),
                  { div: o, mod: s })
                : 0 === this.negative && 0 !== t.negative
                ? ((a = this.divmod(t.neg(), e)),
                  'mod' !== e && (o = a.div.neg()),
                  { div: o, mod: a.mod })
                : 0 != (this.negative & t.negative)
                ? ((a = this.neg().divmod(t.neg(), e)),
                  'div' !== e &&
                    ((s = a.mod.neg()), i && 0 !== s.negative && s.isub(t)),
                  { div: a.div, mod: s })
                : t.length > this.length || this.cmp(t) < 0
                ? { div: new n(0), mod: this }
                : 1 === t.length
                ? 'div' === e
                  ? { div: this.divn(t.words[0]), mod: null }
                  : 'mod' === e
                  ? { div: null, mod: new n(this.modn(t.words[0])) }
                  : {
                      div: this.divn(t.words[0]),
                      mod: new n(this.modn(t.words[0]))
                    }
                : this._wordDiv(t, e)
            )
            var o, s, a
          }),
          (n.prototype.div = function (t) {
            return this.divmod(t, 'div', !1).div
          }),
          (n.prototype.mod = function (t) {
            return this.divmod(t, 'mod', !1).mod
          }),
          (n.prototype.umod = function (t) {
            return this.divmod(t, 'mod', !0).mod
          }),
          (n.prototype.divRound = function (t) {
            var e = this.divmod(t)
            if (e.mod.isZero()) return e.div
            var r = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
              i = t.ushrn(1),
              n = t.andln(1),
              o = r.cmp(i)
            return o < 0 || (1 === n && 0 === o)
              ? e.div
              : 0 !== e.div.negative
              ? e.div.isubn(1)
              : e.div.iaddn(1)
          }),
          (n.prototype.modn = function (t) {
            r(t <= 67108863)
            for (var e = (1 << 26) % t, i = 0, n = this.length - 1; n >= 0; n--)
              i = (e * i + (0 | this.words[n])) % t
            return i
          }),
          (n.prototype.idivn = function (t) {
            r(t <= 67108863)
            for (var e = 0, i = this.length - 1; i >= 0; i--) {
              var n = (0 | this.words[i]) + 67108864 * e
              ;(this.words[i] = (n / t) | 0), (e = n % t)
            }
            return this.strip()
          }),
          (n.prototype.divn = function (t) {
            return this.clone().idivn(t)
          }),
          (n.prototype.egcd = function (t) {
            r(0 === t.negative), r(!t.isZero())
            var e = this,
              i = t.clone()
            e = 0 !== e.negative ? e.umod(t) : e.clone()
            for (
              var o = new n(1), s = new n(0), a = new n(0), h = new n(1), u = 0;
              e.isEven() && i.isEven();

            )
              e.iushrn(1), i.iushrn(1), ++u
            for (var f = i.clone(), d = e.clone(); !e.isZero(); ) {
              for (
                var l = 0, c = 1;
                0 == (e.words[0] & c) && l < 26;
                ++l, c <<= 1
              );
              if (l > 0)
                for (e.iushrn(l); l-- > 0; )
                  (o.isOdd() || s.isOdd()) && (o.iadd(f), s.isub(d)),
                    o.iushrn(1),
                    s.iushrn(1)
              for (
                var p = 0, m = 1;
                0 == (i.words[0] & m) && p < 26;
                ++p, m <<= 1
              );
              if (p > 0)
                for (i.iushrn(p); p-- > 0; )
                  (a.isOdd() || h.isOdd()) && (a.iadd(f), h.isub(d)),
                    a.iushrn(1),
                    h.iushrn(1)
              e.cmp(i) >= 0
                ? (e.isub(i), o.isub(a), s.isub(h))
                : (i.isub(e), a.isub(o), h.isub(s))
            }
            return { a: a, b: h, gcd: i.iushln(u) }
          }),
          (n.prototype._invmp = function (t) {
            r(0 === t.negative), r(!t.isZero())
            var e = this,
              i = t.clone()
            e = 0 !== e.negative ? e.umod(t) : e.clone()
            for (
              var o, s = new n(1), a = new n(0), h = i.clone();
              e.cmpn(1) > 0 && i.cmpn(1) > 0;

            ) {
              for (
                var u = 0, f = 1;
                0 == (e.words[0] & f) && u < 26;
                ++u, f <<= 1
              );
              if (u > 0)
                for (e.iushrn(u); u-- > 0; ) s.isOdd() && s.iadd(h), s.iushrn(1)
              for (
                var d = 0, l = 1;
                0 == (i.words[0] & l) && d < 26;
                ++d, l <<= 1
              );
              if (d > 0)
                for (i.iushrn(d); d-- > 0; ) a.isOdd() && a.iadd(h), a.iushrn(1)
              e.cmp(i) >= 0 ? (e.isub(i), s.isub(a)) : (i.isub(e), a.isub(s))
            }
            return (o = 0 === e.cmpn(1) ? s : a).cmpn(0) < 0 && o.iadd(t), o
          }),
          (n.prototype.gcd = function (t) {
            if (this.isZero()) return t.abs()
            if (t.isZero()) return this.abs()
            var e = this.clone(),
              r = t.clone()
            ;(e.negative = 0), (r.negative = 0)
            for (var i = 0; e.isEven() && r.isEven(); i++)
              e.iushrn(1), r.iushrn(1)
            for (;;) {
              for (; e.isEven(); ) e.iushrn(1)
              for (; r.isEven(); ) r.iushrn(1)
              var n = e.cmp(r)
              if (n < 0) {
                var o = e
                ;(e = r), (r = o)
              } else if (0 === n || 0 === r.cmpn(1)) break
              e.isub(r)
            }
            return r.iushln(i)
          }),
          (n.prototype.invm = function (t) {
            return this.egcd(t).a.umod(t)
          }),
          (n.prototype.isEven = function () {
            return 0 == (1 & this.words[0])
          }),
          (n.prototype.isOdd = function () {
            return 1 == (1 & this.words[0])
          }),
          (n.prototype.andln = function (t) {
            return this.words[0] & t
          }),
          (n.prototype.bincn = function (t) {
            r('number' == typeof t)
            var e = t % 26,
              i = (t - e) / 26,
              n = 1 << e
            if (this.length <= i)
              return this._expand(i + 1), (this.words[i] |= n), this
            for (var o = n, s = i; 0 !== o && s < this.length; s++) {
              var a = 0 | this.words[s]
              ;(o = (a += o) >>> 26), (this.words[s] = a &= 67108863)
            }
            return 0 !== o && ((this.words[s] = o), this.length++), this
          }),
          (n.prototype.isZero = function () {
            return 1 === this.length && 0 === this.words[0]
          }),
          (n.prototype.cmpn = function (t) {
            var e,
              i = t < 0
            if (0 !== this.negative && !i) return -1
            if (0 === this.negative && i) return 1
            if ((this.strip(), this.length > 1)) e = 1
            else {
              i && (t = -t), r(t <= 67108863, 'Number is too big')
              var n = 0 | this.words[0]
              e = n === t ? 0 : n < t ? -1 : 1
            }
            return 0 !== this.negative ? 0 | -e : e
          }),
          (n.prototype.cmp = function (t) {
            if (0 !== this.negative && 0 === t.negative) return -1
            if (0 === this.negative && 0 !== t.negative) return 1
            var e = this.ucmp(t)
            return 0 !== this.negative ? 0 | -e : e
          }),
          (n.prototype.ucmp = function (t) {
            if (this.length > t.length) return 1
            if (this.length < t.length) return -1
            for (var e = 0, r = this.length - 1; r >= 0; r--) {
              var i = 0 | this.words[r],
                n = 0 | t.words[r]
              if (i !== n) {
                i < n ? (e = -1) : i > n && (e = 1)
                break
              }
            }
            return e
          }),
          (n.prototype.gtn = function (t) {
            return 1 === this.cmpn(t)
          }),
          (n.prototype.gt = function (t) {
            return 1 === this.cmp(t)
          }),
          (n.prototype.gten = function (t) {
            return this.cmpn(t) >= 0
          }),
          (n.prototype.gte = function (t) {
            return this.cmp(t) >= 0
          }),
          (n.prototype.ltn = function (t) {
            return -1 === this.cmpn(t)
          }),
          (n.prototype.lt = function (t) {
            return -1 === this.cmp(t)
          }),
          (n.prototype.lten = function (t) {
            return this.cmpn(t) <= 0
          }),
          (n.prototype.lte = function (t) {
            return this.cmp(t) <= 0
          }),
          (n.prototype.eqn = function (t) {
            return 0 === this.cmpn(t)
          }),
          (n.prototype.eq = function (t) {
            return 0 === this.cmp(t)
          }),
          (n.red = function (t) {
            return new M(t)
          }),
          (n.prototype.toRed = function (t) {
            return (
              r(!this.red, 'Already a number in reduction context'),
              r(0 === this.negative, 'red works only with positives'),
              t.convertTo(this)._forceRed(t)
            )
          }),
          (n.prototype.fromRed = function () {
            return (
              r(
                this.red,
                'fromRed works only with numbers in reduction context'
              ),
              this.red.convertFrom(this)
            )
          }),
          (n.prototype._forceRed = function (t) {
            return (this.red = t), this
          }),
          (n.prototype.forceRed = function (t) {
            return (
              r(!this.red, 'Already a number in reduction context'),
              this._forceRed(t)
            )
          }),
          (n.prototype.redAdd = function (t) {
            return (
              r(this.red, 'redAdd works only with red numbers'),
              this.red.add(this, t)
            )
          }),
          (n.prototype.redIAdd = function (t) {
            return (
              r(this.red, 'redIAdd works only with red numbers'),
              this.red.iadd(this, t)
            )
          }),
          (n.prototype.redSub = function (t) {
            return (
              r(this.red, 'redSub works only with red numbers'),
              this.red.sub(this, t)
            )
          }),
          (n.prototype.redISub = function (t) {
            return (
              r(this.red, 'redISub works only with red numbers'),
              this.red.isub(this, t)
            )
          }),
          (n.prototype.redShl = function (t) {
            return (
              r(this.red, 'redShl works only with red numbers'),
              this.red.shl(this, t)
            )
          }),
          (n.prototype.redMul = function (t) {
            return (
              r(this.red, 'redMul works only with red numbers'),
              this.red._verify2(this, t),
              this.red.mul(this, t)
            )
          }),
          (n.prototype.redIMul = function (t) {
            return (
              r(this.red, 'redMul works only with red numbers'),
              this.red._verify2(this, t),
              this.red.imul(this, t)
            )
          }),
          (n.prototype.redSqr = function () {
            return (
              r(this.red, 'redSqr works only with red numbers'),
              this.red._verify1(this),
              this.red.sqr(this)
            )
          }),
          (n.prototype.redISqr = function () {
            return (
              r(this.red, 'redISqr works only with red numbers'),
              this.red._verify1(this),
              this.red.isqr(this)
            )
          }),
          (n.prototype.redSqrt = function () {
            return (
              r(this.red, 'redSqrt works only with red numbers'),
              this.red._verify1(this),
              this.red.sqrt(this)
            )
          }),
          (n.prototype.redInvm = function () {
            return (
              r(this.red, 'redInvm works only with red numbers'),
              this.red._verify1(this),
              this.red.invm(this)
            )
          }),
          (n.prototype.redNeg = function () {
            return (
              r(this.red, 'redNeg works only with red numbers'),
              this.red._verify1(this),
              this.red.neg(this)
            )
          }),
          (n.prototype.redPow = function (t) {
            return (
              r(this.red && !t.red, 'redPow(normalNum)'),
              this.red._verify1(this),
              this.red.pow(this, t)
            )
          })
        var m = { k256: null, p224: null, p192: null, p25519: null }
        function b(t, e) {
          ;(this.name = t),
            (this.p = new n(e, 16)),
            (this.n = this.p.bitLength()),
            (this.k = new n(1).iushln(this.n).isub(this.p)),
            (this.tmp = this._tmp())
        }
        function g() {
          b.call(
            this,
            'k256',
            'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f'
          )
        }
        function v() {
          b.call(
            this,
            'p224',
            'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001'
          )
        }
        function y() {
          b.call(
            this,
            'p192',
            'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff'
          )
        }
        function w() {
          b.call(
            this,
            '25519',
            '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed'
          )
        }
        function M(t) {
          if ('string' == typeof t) {
            var e = n._prime(t)
            ;(this.m = e.p), (this.prime = e)
          } else r(t.gtn(1), 'modulus must be greater than 1'), (this.m = t), (this.prime = null)
        }
        function _(t) {
          M.call(this, t),
            (this.shift = this.m.bitLength()),
            this.shift % 26 != 0 && (this.shift += 26 - (this.shift % 26)),
            (this.r = new n(1).iushln(this.shift)),
            (this.r2 = this.imod(this.r.sqr())),
            (this.rinv = this.r._invmp(this.m)),
            (this.minv = this.rinv.mul(this.r).isubn(1).div(this.m)),
            (this.minv = this.minv.umod(this.r)),
            (this.minv = this.r.sub(this.minv))
        }
        ;(b.prototype._tmp = function () {
          var t = new n(null)
          return (t.words = new Array(Math.ceil(this.n / 13))), t
        }),
          (b.prototype.ireduce = function (t) {
            var e,
              r = t
            do {
              this.split(r, this.tmp),
                (e = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength())
            } while (e > this.n)
            var i = e < this.n ? -1 : r.ucmp(this.p)
            return (
              0 === i
                ? ((r.words[0] = 0), (r.length = 1))
                : i > 0
                ? r.isub(this.p)
                : r.strip(),
              r
            )
          }),
          (b.prototype.split = function (t, e) {
            t.iushrn(this.n, 0, e)
          }),
          (b.prototype.imulK = function (t) {
            return t.imul(this.k)
          }),
          i(g, b),
          (g.prototype.split = function (t, e) {
            for (var r = 4194303, i = Math.min(t.length, 9), n = 0; n < i; n++)
              e.words[n] = t.words[n]
            if (((e.length = i), t.length <= 9))
              return (t.words[0] = 0), void (t.length = 1)
            var o = t.words[9]
            for (e.words[e.length++] = o & r, n = 10; n < t.length; n++) {
              var s = 0 | t.words[n]
              ;(t.words[n - 10] = ((s & r) << 4) | (o >>> 22)), (o = s)
            }
            ;(t.words[n - 10] = o >>>= 22),
              (t.length -= 0 === o && t.length > 10 ? 10 : 9)
          }),
          (g.prototype.imulK = function (t) {
            ;(t.words[t.length] = 0),
              (t.words[t.length + 1] = 0),
              (t.length += 2)
            for (var e = 0, r = 0; r < t.length; r++) {
              var i = 0 | t.words[r]
              ;(t.words[r] = 67108863 & (e += 977 * i)),
                (e = 64 * i + ((e / 67108864) | 0))
            }
            return (
              0 === t.words[t.length - 1] &&
                (t.length--, 0 === t.words[t.length - 1] && t.length--),
              t
            )
          }),
          i(v, b),
          i(y, b),
          i(w, b),
          (w.prototype.imulK = function (t) {
            for (var e = 0, r = 0; r < t.length; r++) {
              var i = 19 * (0 | t.words[r]) + e,
                n = 67108863 & i
              ;(i >>>= 26), (t.words[r] = n), (e = i)
            }
            return 0 !== e && (t.words[t.length++] = e), t
          }),
          (n._prime = function (t) {
            if (m[t]) return m[t]
            var e
            if ('k256' === t) e = new g()
            else if ('p224' === t) e = new v()
            else if ('p192' === t) e = new y()
            else {
              if ('p25519' !== t) throw new Error('Unknown prime ' + t)
              e = new w()
            }
            return (m[t] = e), e
          }),
          (M.prototype._verify1 = function (t) {
            r(0 === t.negative, 'red works only with positives'),
              r(t.red, 'red works only with red numbers')
          }),
          (M.prototype._verify2 = function (t, e) {
            r(0 == (t.negative | e.negative), 'red works only with positives'),
              r(t.red && t.red === e.red, 'red works only with red numbers')
          }),
          (M.prototype.imod = function (t) {
            return this.prime
              ? this.prime.ireduce(t)._forceRed(this)
              : t.umod(this.m)._forceRed(this)
          }),
          (M.prototype.neg = function (t) {
            return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this)
          }),
          (M.prototype.add = function (t, e) {
            this._verify2(t, e)
            var r = t.add(e)
            return r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this)
          }),
          (M.prototype.iadd = function (t, e) {
            this._verify2(t, e)
            var r = t.iadd(e)
            return r.cmp(this.m) >= 0 && r.isub(this.m), r
          }),
          (M.prototype.sub = function (t, e) {
            this._verify2(t, e)
            var r = t.sub(e)
            return r.cmpn(0) < 0 && r.iadd(this.m), r._forceRed(this)
          }),
          (M.prototype.isub = function (t, e) {
            this._verify2(t, e)
            var r = t.isub(e)
            return r.cmpn(0) < 0 && r.iadd(this.m), r
          }),
          (M.prototype.shl = function (t, e) {
            return this._verify1(t), this.imod(t.ushln(e))
          }),
          (M.prototype.imul = function (t, e) {
            return this._verify2(t, e), this.imod(t.imul(e))
          }),
          (M.prototype.mul = function (t, e) {
            return this._verify2(t, e), this.imod(t.mul(e))
          }),
          (M.prototype.isqr = function (t) {
            return this.imul(t, t.clone())
          }),
          (M.prototype.sqr = function (t) {
            return this.mul(t, t)
          }),
          (M.prototype.sqrt = function (t) {
            if (t.isZero()) return t.clone()
            var e = this.m.andln(3)
            if ((r(e % 2 == 1), 3 === e)) {
              var i = this.m.add(new n(1)).iushrn(2)
              return this.pow(t, i)
            }
            for (
              var o = this.m.subn(1), s = 0;
              !o.isZero() && 0 === o.andln(1);

            )
              s++, o.iushrn(1)
            r(!o.isZero())
            var a = new n(1).toRed(this),
              h = a.redNeg(),
              u = this.m.subn(1).iushrn(1),
              f = this.m.bitLength()
            for (
              f = new n(2 * f * f).toRed(this);
              0 !== this.pow(f, u).cmp(h);

            )
              f.redIAdd(h)
            for (
              var d = this.pow(f, o),
                l = this.pow(t, o.addn(1).iushrn(1)),
                c = this.pow(t, o),
                p = s;
              0 !== c.cmp(a);

            ) {
              for (var m = c, b = 0; 0 !== m.cmp(a); b++) m = m.redSqr()
              r(b < p)
              var g = this.pow(d, new n(1).iushln(p - b - 1))
              ;(l = l.redMul(g)), (d = g.redSqr()), (c = c.redMul(d)), (p = b)
            }
            return l
          }),
          (M.prototype.invm = function (t) {
            var e = t._invmp(this.m)
            return 0 !== e.negative
              ? ((e.negative = 0), this.imod(e).redNeg())
              : this.imod(e)
          }),
          (M.prototype.pow = function (t, e) {
            if (e.isZero()) return new n(1)
            if (0 === e.cmpn(1)) return t.clone()
            var r = new Array(16)
            ;(r[0] = new n(1).toRed(this)), (r[1] = t)
            for (var i = 2; i < r.length; i++) r[i] = this.mul(r[i - 1], t)
            var o = r[0],
              s = 0,
              a = 0,
              h = e.bitLength() % 26
            for (0 === h && (h = 26), i = e.length - 1; i >= 0; i--) {
              for (var u = e.words[i], f = h - 1; f >= 0; f--) {
                var d = (u >> f) & 1
                o !== r[0] && (o = this.sqr(o)),
                  0 !== d || 0 !== s
                    ? ((s <<= 1),
                      (s |= d),
                      (4 == ++a || (0 === i && 0 === f)) &&
                        ((o = this.mul(o, r[s])), (a = 0), (s = 0)))
                    : (a = 0)
              }
              h = 26
            }
            return o
          }),
          (M.prototype.convertTo = function (t) {
            var e = t.umod(this.m)
            return e === t ? e.clone() : e
          }),
          (M.prototype.convertFrom = function (t) {
            var e = t.clone()
            return (e.red = null), e
          }),
          (n.mont = function (t) {
            return new _(t)
          }),
          i(_, M),
          (_.prototype.convertTo = function (t) {
            return this.imod(t.ushln(this.shift))
          }),
          (_.prototype.convertFrom = function (t) {
            var e = this.imod(t.mul(this.rinv))
            return (e.red = null), e
          }),
          (_.prototype.imul = function (t, e) {
            if (t.isZero() || e.isZero())
              return (t.words[0] = 0), (t.length = 1), t
            var r = t.imul(e),
              i = r
                .maskn(this.shift)
                .mul(this.minv)
                .imaskn(this.shift)
                .mul(this.m),
              n = r.isub(i).iushrn(this.shift),
              o = n
            return (
              n.cmp(this.m) >= 0
                ? (o = n.isub(this.m))
                : n.cmpn(0) < 0 && (o = n.iadd(this.m)),
              o._forceRed(this)
            )
          }),
          (_.prototype.mul = function (t, e) {
            if (t.isZero() || e.isZero()) return new n(0)._forceRed(this)
            var r = t.mul(e),
              i = r
                .maskn(this.shift)
                .mul(this.minv)
                .imaskn(this.shift)
                .mul(this.m),
              o = r.isub(i).iushrn(this.shift),
              s = o
            return (
              o.cmp(this.m) >= 0
                ? (s = o.isub(this.m))
                : o.cmpn(0) < 0 && (s = o.iadd(this.m)),
              s._forceRed(this)
            )
          }),
          (_.prototype.invm = function (t) {
            return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this)
          })
      })(t, ft)
    })
    dt(function (t) {
      !(function (t, e) {
        function r(t, e) {
          if (!t) throw new Error(e || 'Assertion failed')
        }
        function i(t, e) {
          t.super_ = e
          var r = function () {}
          ;(r.prototype = e.prototype),
            (t.prototype = new r()),
            (t.prototype.constructor = t)
        }
        function n(t, e, r) {
          if (n.isBN(t)) return t
          ;(this.negative = 0),
            (this.words = null),
            (this.length = 0),
            (this.red = null),
            null !== t &&
              (('le' !== e && 'be' !== e) || ((r = e), (e = 10)),
              this._init(t || 0, e || 10, r || 'be'))
        }
        var o
        'object' == typeof t ? (t.exports = n) : (e.BN = n),
          (n.BN = n),
          (n.wordSize = 26)
        try {
          o = lt('buffer').Buffer
        } catch (t) {}
        function s(t, e, r) {
          for (var i = 0, n = Math.min(t.length, r), o = e; o < n; o++) {
            var s = t.charCodeAt(o) - 48
            ;(i <<= 4),
              (i |=
                s >= 49 && s <= 54
                  ? s - 49 + 10
                  : s >= 17 && s <= 22
                  ? s - 17 + 10
                  : 15 & s)
          }
          return i
        }
        function a(t, e, r, i) {
          for (var n = 0, o = Math.min(t.length, r), s = e; s < o; s++) {
            var a = t.charCodeAt(s) - 48
            ;(n *= i), (n += a >= 49 ? a - 49 + 10 : a >= 17 ? a - 17 + 10 : a)
          }
          return n
        }
        ;(n.isBN = function (t) {
          return (
            t instanceof n ||
            (null !== t &&
              'object' == typeof t &&
              t.constructor.wordSize === n.wordSize &&
              Array.isArray(t.words))
          )
        }),
          (n.max = function (t, e) {
            return t.cmp(e) > 0 ? t : e
          }),
          (n.min = function (t, e) {
            return t.cmp(e) < 0 ? t : e
          }),
          (n.prototype._init = function (t, e, i) {
            if ('number' == typeof t) return this._initNumber(t, e, i)
            if ('object' == typeof t) return this._initArray(t, e, i)
            'hex' === e && (e = 16), r(e === (0 | e) && e >= 2 && e <= 36)
            var n = 0
            '-' === (t = t.toString().replace(/\s+/g, ''))[0] && n++,
              16 === e ? this._parseHex(t, n) : this._parseBase(t, e, n),
              '-' === t[0] && (this.negative = 1),
              this.strip(),
              'le' === i && this._initArray(this.toArray(), e, i)
          }),
          (n.prototype._initNumber = function (t, e, i) {
            t < 0 && ((this.negative = 1), (t = -t)),
              t < 67108864
                ? ((this.words = [67108863 & t]), (this.length = 1))
                : t < 4503599627370496
                ? ((this.words = [67108863 & t, (t / 67108864) & 67108863]),
                  (this.length = 2))
                : (r(t < 9007199254740992),
                  (this.words = [67108863 & t, (t / 67108864) & 67108863, 1]),
                  (this.length = 3)),
              'le' === i && this._initArray(this.toArray(), e, i)
          }),
          (n.prototype._initArray = function (t, e, i) {
            if ((r('number' == typeof t.length), t.length <= 0))
              return (this.words = [0]), (this.length = 1), this
            ;(this.length = Math.ceil(t.length / 3)),
              (this.words = new Array(this.length))
            for (var n = 0; n < this.length; n++) this.words[n] = 0
            var o,
              s,
              a = 0
            if ('be' === i)
              for (n = t.length - 1, o = 0; n >= 0; n -= 3)
                (this.words[o] |=
                  ((s = t[n] | (t[n - 1] << 8) | (t[n - 2] << 16)) << a) &
                  67108863),
                  (this.words[o + 1] = (s >>> (26 - a)) & 67108863),
                  (a += 24) >= 26 && ((a -= 26), o++)
            else if ('le' === i)
              for (n = 0, o = 0; n < t.length; n += 3)
                (this.words[o] |=
                  ((s = t[n] | (t[n + 1] << 8) | (t[n + 2] << 16)) << a) &
                  67108863),
                  (this.words[o + 1] = (s >>> (26 - a)) & 67108863),
                  (a += 24) >= 26 && ((a -= 26), o++)
            return this.strip()
          }),
          (n.prototype._parseHex = function (t, e) {
            ;(this.length = Math.ceil((t.length - e) / 6)),
              (this.words = new Array(this.length))
            for (var r = 0; r < this.length; r++) this.words[r] = 0
            var i,
              n,
              o = 0
            for (r = t.length - 6, i = 0; r >= e; r -= 6)
              (n = s(t, r, r + 6)),
                (this.words[i] |= (n << o) & 67108863),
                (this.words[i + 1] |= (n >>> (26 - o)) & 4194303),
                (o += 24) >= 26 && ((o -= 26), i++)
            r + 6 !== e &&
              ((n = s(t, e, r + 6)),
              (this.words[i] |= (n << o) & 67108863),
              (this.words[i + 1] |= (n >>> (26 - o)) & 4194303)),
              this.strip()
          }),
          (n.prototype._parseBase = function (t, e, r) {
            ;(this.words = [0]), (this.length = 1)
            for (var i = 0, n = 1; n <= 67108863; n *= e) i++
            i--, (n = (n / e) | 0)
            for (
              var o = t.length - r,
                s = o % i,
                h = Math.min(o, o - s) + r,
                u = 0,
                f = r;
              f < h;
              f += i
            )
              (u = a(t, f, f + i, e)),
                this.imuln(n),
                this.words[0] + u < 67108864
                  ? (this.words[0] += u)
                  : this._iaddn(u)
            if (0 !== s) {
              var d = 1
              for (u = a(t, f, t.length, e), f = 0; f < s; f++) d *= e
              this.imuln(d),
                this.words[0] + u < 67108864
                  ? (this.words[0] += u)
                  : this._iaddn(u)
            }
          }),
          (n.prototype.copy = function (t) {
            t.words = new Array(this.length)
            for (var e = 0; e < this.length; e++) t.words[e] = this.words[e]
            ;(t.length = this.length),
              (t.negative = this.negative),
              (t.red = this.red)
          }),
          (n.prototype.clone = function () {
            var t = new n(null)
            return this.copy(t), t
          }),
          (n.prototype._expand = function (t) {
            for (; this.length < t; ) this.words[this.length++] = 0
            return this
          }),
          (n.prototype.strip = function () {
            for (; this.length > 1 && 0 === this.words[this.length - 1]; )
              this.length--
            return this._normSign()
          }),
          (n.prototype._normSign = function () {
            return (
              1 === this.length && 0 === this.words[0] && (this.negative = 0),
              this
            )
          }),
          (n.prototype.inspect = function () {
            return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>'
          })
        var h = [
            '',
            '0',
            '00',
            '000',
            '0000',
            '00000',
            '000000',
            '0000000',
            '00000000',
            '000000000',
            '0000000000',
            '00000000000',
            '000000000000',
            '0000000000000',
            '00000000000000',
            '000000000000000',
            '0000000000000000',
            '00000000000000000',
            '000000000000000000',
            '0000000000000000000',
            '00000000000000000000',
            '000000000000000000000',
            '0000000000000000000000',
            '00000000000000000000000',
            '000000000000000000000000',
            '0000000000000000000000000'
          ],
          u = [
            0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6,
            5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
          ],
          f = [
            0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607,
            16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536,
            11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101,
            5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368,
            20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875,
            60466176
          ]
        function d(t, e, r) {
          r.negative = e.negative ^ t.negative
          var i = (t.length + e.length) | 0
          ;(r.length = i), (i = (i - 1) | 0)
          var n = 0 | t.words[0],
            o = 0 | e.words[0],
            s = n * o,
            a = (s / 67108864) | 0
          r.words[0] = 67108863 & s
          for (var h = 1; h < i; h++) {
            for (
              var u = a >>> 26,
                f = 67108863 & a,
                d = Math.min(h, e.length - 1),
                l = Math.max(0, h - t.length + 1);
              l <= d;
              l++
            )
              (u +=
                ((s =
                  (n = 0 | t.words[(h - l) | 0]) * (o = 0 | e.words[l]) + f) /
                  67108864) |
                0),
                (f = 67108863 & s)
            ;(r.words[h] = 0 | f), (a = 0 | u)
          }
          return 0 !== a ? (r.words[h] = 0 | a) : r.length--, r.strip()
        }
        ;(n.prototype.toString = function (t, e) {
          var i
          if (((e = 0 | e || 1), 16 === (t = t || 10) || 'hex' === t)) {
            i = ''
            for (var n = 0, o = 0, s = 0; s < this.length; s++) {
              var a = this.words[s],
                d = (16777215 & ((a << n) | o)).toString(16)
              ;(i =
                0 != (o = (a >>> (24 - n)) & 16777215) || s !== this.length - 1
                  ? h[6 - d.length] + d + i
                  : d + i),
                (n += 2) >= 26 && ((n -= 26), s--)
            }
            for (0 !== o && (i = o.toString(16) + i); i.length % e != 0; )
              i = '0' + i
            return 0 !== this.negative && (i = '-' + i), i
          }
          if (t === (0 | t) && t >= 2 && t <= 36) {
            var l = u[t],
              c = f[t]
            i = ''
            var p = this.clone()
            for (p.negative = 0; !p.isZero(); ) {
              var m = p.modn(c).toString(t)
              i = (p = p.idivn(c)).isZero() ? m + i : h[l - m.length] + m + i
            }
            for (this.isZero() && (i = '0' + i); i.length % e != 0; )
              i = '0' + i
            return 0 !== this.negative && (i = '-' + i), i
          }
          r(!1, 'Base should be between 2 and 36')
        }),
          (n.prototype.toNumber = function () {
            var t = this.words[0]
            return (
              2 === this.length
                ? (t += 67108864 * this.words[1])
                : 3 === this.length && 1 === this.words[2]
                ? (t += 4503599627370496 + 67108864 * this.words[1])
                : this.length > 2 &&
                  r(!1, 'Number can only safely store up to 53 bits'),
              0 !== this.negative ? -t : t
            )
          }),
          (n.prototype.toJSON = function () {
            return this.toString(16)
          }),
          (n.prototype.toBuffer = function (t, e) {
            return r(void 0 !== o), this.toArrayLike(o, t, e)
          }),
          (n.prototype.toArray = function (t, e) {
            return this.toArrayLike(Array, t, e)
          }),
          (n.prototype.toArrayLike = function (t, e, i) {
            var n = this.byteLength(),
              o = i || Math.max(1, n)
            r(n <= o, 'byte array longer than desired length'),
              r(o > 0, 'Requested array length <= 0'),
              this.strip()
            var s,
              a,
              h = 'le' === e,
              u = new t(o),
              f = this.clone()
            if (h) {
              for (a = 0; !f.isZero(); a++)
                (s = f.andln(255)), f.iushrn(8), (u[a] = s)
              for (; a < o; a++) u[a] = 0
            } else {
              for (a = 0; a < o - n; a++) u[a] = 0
              for (a = 0; !f.isZero(); a++)
                (s = f.andln(255)), f.iushrn(8), (u[o - a - 1] = s)
            }
            return u
          }),
          (n.prototype._countBits = Math.clz32
            ? function (t) {
                return 32 - Math.clz32(t)
              }
            : function (t) {
                var e = t,
                  r = 0
                return (
                  e >= 4096 && ((r += 13), (e >>>= 13)),
                  e >= 64 && ((r += 7), (e >>>= 7)),
                  e >= 8 && ((r += 4), (e >>>= 4)),
                  e >= 2 && ((r += 2), (e >>>= 2)),
                  r + e
                )
              }),
          (n.prototype._zeroBits = function (t) {
            if (0 === t) return 26
            var e = t,
              r = 0
            return (
              0 == (8191 & e) && ((r += 13), (e >>>= 13)),
              0 == (127 & e) && ((r += 7), (e >>>= 7)),
              0 == (15 & e) && ((r += 4), (e >>>= 4)),
              0 == (3 & e) && ((r += 2), (e >>>= 2)),
              0 == (1 & e) && r++,
              r
            )
          }),
          (n.prototype.bitLength = function () {
            var t = this._countBits(this.words[this.length - 1])
            return 26 * (this.length - 1) + t
          }),
          (n.prototype.zeroBits = function () {
            if (this.isZero()) return 0
            for (var t = 0, e = 0; e < this.length; e++) {
              var r = this._zeroBits(this.words[e])
              if (((t += r), 26 !== r)) break
            }
            return t
          }),
          (n.prototype.byteLength = function () {
            return Math.ceil(this.bitLength() / 8)
          }),
          (n.prototype.toTwos = function (t) {
            return 0 !== this.negative
              ? this.abs().inotn(t).iaddn(1)
              : this.clone()
          }),
          (n.prototype.fromTwos = function (t) {
            return this.testn(t - 1)
              ? this.notn(t).iaddn(1).ineg()
              : this.clone()
          }),
          (n.prototype.isNeg = function () {
            return 0 !== this.negative
          }),
          (n.prototype.neg = function () {
            return this.clone().ineg()
          }),
          (n.prototype.ineg = function () {
            return this.isZero() || (this.negative ^= 1), this
          }),
          (n.prototype.iuor = function (t) {
            for (; this.length < t.length; ) this.words[this.length++] = 0
            for (var e = 0; e < t.length; e++)
              this.words[e] = this.words[e] | t.words[e]
            return this.strip()
          }),
          (n.prototype.ior = function (t) {
            return r(0 == (this.negative | t.negative)), this.iuor(t)
          }),
          (n.prototype.or = function (t) {
            return this.length > t.length
              ? this.clone().ior(t)
              : t.clone().ior(this)
          }),
          (n.prototype.uor = function (t) {
            return this.length > t.length
              ? this.clone().iuor(t)
              : t.clone().iuor(this)
          }),
          (n.prototype.iuand = function (t) {
            var e
            e = this.length > t.length ? t : this
            for (var r = 0; r < e.length; r++)
              this.words[r] = this.words[r] & t.words[r]
            return (this.length = e.length), this.strip()
          }),
          (n.prototype.iand = function (t) {
            return r(0 == (this.negative | t.negative)), this.iuand(t)
          }),
          (n.prototype.and = function (t) {
            return this.length > t.length
              ? this.clone().iand(t)
              : t.clone().iand(this)
          }),
          (n.prototype.uand = function (t) {
            return this.length > t.length
              ? this.clone().iuand(t)
              : t.clone().iuand(this)
          }),
          (n.prototype.iuxor = function (t) {
            var e, r
            this.length > t.length
              ? ((e = this), (r = t))
              : ((e = t), (r = this))
            for (var i = 0; i < r.length; i++)
              this.words[i] = e.words[i] ^ r.words[i]
            if (this !== e) for (; i < e.length; i++) this.words[i] = e.words[i]
            return (this.length = e.length), this.strip()
          }),
          (n.prototype.ixor = function (t) {
            return r(0 == (this.negative | t.negative)), this.iuxor(t)
          }),
          (n.prototype.xor = function (t) {
            return this.length > t.length
              ? this.clone().ixor(t)
              : t.clone().ixor(this)
          }),
          (n.prototype.uxor = function (t) {
            return this.length > t.length
              ? this.clone().iuxor(t)
              : t.clone().iuxor(this)
          }),
          (n.prototype.inotn = function (t) {
            r('number' == typeof t && t >= 0)
            var e = 0 | Math.ceil(t / 26),
              i = t % 26
            this._expand(e), i > 0 && e--
            for (var n = 0; n < e; n++)
              this.words[n] = 67108863 & ~this.words[n]
            return (
              i > 0 &&
                (this.words[n] = ~this.words[n] & (67108863 >> (26 - i))),
              this.strip()
            )
          }),
          (n.prototype.notn = function (t) {
            return this.clone().inotn(t)
          }),
          (n.prototype.setn = function (t, e) {
            r('number' == typeof t && t >= 0)
            var i = (t / 26) | 0,
              n = t % 26
            return (
              this._expand(i + 1),
              (this.words[i] = e
                ? this.words[i] | (1 << n)
                : this.words[i] & ~(1 << n)),
              this.strip()
            )
          }),
          (n.prototype.iadd = function (t) {
            var e, r, i
            if (0 !== this.negative && 0 === t.negative)
              return (
                (this.negative = 0),
                (e = this.isub(t)),
                (this.negative ^= 1),
                this._normSign()
              )
            if (0 === this.negative && 0 !== t.negative)
              return (
                (t.negative = 0),
                (e = this.isub(t)),
                (t.negative = 1),
                e._normSign()
              )
            this.length > t.length
              ? ((r = this), (i = t))
              : ((r = t), (i = this))
            for (var n = 0, o = 0; o < i.length; o++)
              (this.words[o] =
                67108863 & (e = (0 | r.words[o]) + (0 | i.words[o]) + n)),
                (n = e >>> 26)
            for (; 0 !== n && o < r.length; o++)
              (this.words[o] = 67108863 & (e = (0 | r.words[o]) + n)),
                (n = e >>> 26)
            if (((this.length = r.length), 0 !== n))
              (this.words[this.length] = n), this.length++
            else if (r !== this)
              for (; o < r.length; o++) this.words[o] = r.words[o]
            return this
          }),
          (n.prototype.add = function (t) {
            var e
            return 0 !== t.negative && 0 === this.negative
              ? ((t.negative = 0), (e = this.sub(t)), (t.negative ^= 1), e)
              : 0 === t.negative && 0 !== this.negative
              ? ((this.negative = 0), (e = t.sub(this)), (this.negative = 1), e)
              : this.length > t.length
              ? this.clone().iadd(t)
              : t.clone().iadd(this)
          }),
          (n.prototype.isub = function (t) {
            if (0 !== t.negative) {
              t.negative = 0
              var e = this.iadd(t)
              return (t.negative = 1), e._normSign()
            }
            if (0 !== this.negative)
              return (
                (this.negative = 0),
                this.iadd(t),
                (this.negative = 1),
                this._normSign()
              )
            var r,
              i,
              n = this.cmp(t)
            if (0 === n)
              return (
                (this.negative = 0),
                (this.length = 1),
                (this.words[0] = 0),
                this
              )
            n > 0 ? ((r = this), (i = t)) : ((r = t), (i = this))
            for (var o = 0, s = 0; s < i.length; s++)
              (o = (e = (0 | r.words[s]) - (0 | i.words[s]) + o) >> 26),
                (this.words[s] = 67108863 & e)
            for (; 0 !== o && s < r.length; s++)
              (o = (e = (0 | r.words[s]) + o) >> 26),
                (this.words[s] = 67108863 & e)
            if (0 === o && s < r.length && r !== this)
              for (; s < r.length; s++) this.words[s] = r.words[s]
            return (
              (this.length = Math.max(this.length, s)),
              r !== this && (this.negative = 1),
              this.strip()
            )
          }),
          (n.prototype.sub = function (t) {
            return this.clone().isub(t)
          })
        var l = function (t, e, r) {
          var i,
            n,
            o,
            s = t.words,
            a = e.words,
            h = r.words,
            u = 0,
            f = 0 | s[0],
            d = 8191 & f,
            l = f >>> 13,
            c = 0 | s[1],
            p = 8191 & c,
            m = c >>> 13,
            b = 0 | s[2],
            g = 8191 & b,
            v = b >>> 13,
            y = 0 | s[3],
            w = 8191 & y,
            M = y >>> 13,
            _ = 0 | s[4],
            S = 8191 & _,
            A = _ >>> 13,
            k = 0 | s[5],
            x = 8191 & k,
            E = k >>> 13,
            R = 0 | s[6],
            B = 8191 & R,
            I = R >>> 13,
            N = 0 | s[7],
            T = 8191 & N,
            P = N >>> 13,
            O = 0 | s[8],
            q = 8191 & O,
            L = O >>> 13,
            z = 0 | s[9],
            j = 8191 & z,
            C = z >>> 13,
            U = 0 | a[0],
            D = 8191 & U,
            Z = U >>> 13,
            F = 0 | a[1],
            K = 8191 & F,
            H = F >>> 13,
            V = 0 | a[2],
            $ = 8191 & V,
            W = V >>> 13,
            J = 0 | a[3],
            G = 8191 & J,
            X = J >>> 13,
            Y = 0 | a[4],
            Q = 8191 & Y,
            tt = Y >>> 13,
            et = 0 | a[5],
            rt = 8191 & et,
            it = et >>> 13,
            nt = 0 | a[6],
            ot = 8191 & nt,
            st = nt >>> 13,
            at = 0 | a[7],
            ht = 8191 & at,
            ut = at >>> 13,
            ft = 0 | a[8],
            dt = 8191 & ft,
            lt = ft >>> 13,
            ct = 0 | a[9],
            pt = 8191 & ct,
            mt = ct >>> 13
          ;(r.negative = t.negative ^ e.negative), (r.length = 19)
          var bt =
            (((u + (i = Math.imul(d, D))) | 0) +
              ((8191 & (n = ((n = Math.imul(d, Z)) + Math.imul(l, D)) | 0)) <<
                13)) |
            0
          ;(u = ((((o = Math.imul(l, Z)) + (n >>> 13)) | 0) + (bt >>> 26)) | 0),
            (bt &= 67108863),
            (i = Math.imul(p, D)),
            (n = ((n = Math.imul(p, Z)) + Math.imul(m, D)) | 0),
            (o = Math.imul(m, Z))
          var gt =
            (((u + (i = (i + Math.imul(d, K)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(d, H)) | 0) + Math.imul(l, K)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(l, H)) | 0) + (n >>> 13)) | 0) +
              (gt >>> 26)) |
            0),
            (gt &= 67108863),
            (i = Math.imul(g, D)),
            (n = ((n = Math.imul(g, Z)) + Math.imul(v, D)) | 0),
            (o = Math.imul(v, Z)),
            (i = (i + Math.imul(p, K)) | 0),
            (n = ((n = (n + Math.imul(p, H)) | 0) + Math.imul(m, K)) | 0),
            (o = (o + Math.imul(m, H)) | 0)
          var vt =
            (((u + (i = (i + Math.imul(d, $)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(d, W)) | 0) + Math.imul(l, $)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(l, W)) | 0) + (n >>> 13)) | 0) +
              (vt >>> 26)) |
            0),
            (vt &= 67108863),
            (i = Math.imul(w, D)),
            (n = ((n = Math.imul(w, Z)) + Math.imul(M, D)) | 0),
            (o = Math.imul(M, Z)),
            (i = (i + Math.imul(g, K)) | 0),
            (n = ((n = (n + Math.imul(g, H)) | 0) + Math.imul(v, K)) | 0),
            (o = (o + Math.imul(v, H)) | 0),
            (i = (i + Math.imul(p, $)) | 0),
            (n = ((n = (n + Math.imul(p, W)) | 0) + Math.imul(m, $)) | 0),
            (o = (o + Math.imul(m, W)) | 0)
          var yt =
            (((u + (i = (i + Math.imul(d, G)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(d, X)) | 0) + Math.imul(l, G)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(l, X)) | 0) + (n >>> 13)) | 0) +
              (yt >>> 26)) |
            0),
            (yt &= 67108863),
            (i = Math.imul(S, D)),
            (n = ((n = Math.imul(S, Z)) + Math.imul(A, D)) | 0),
            (o = Math.imul(A, Z)),
            (i = (i + Math.imul(w, K)) | 0),
            (n = ((n = (n + Math.imul(w, H)) | 0) + Math.imul(M, K)) | 0),
            (o = (o + Math.imul(M, H)) | 0),
            (i = (i + Math.imul(g, $)) | 0),
            (n = ((n = (n + Math.imul(g, W)) | 0) + Math.imul(v, $)) | 0),
            (o = (o + Math.imul(v, W)) | 0),
            (i = (i + Math.imul(p, G)) | 0),
            (n = ((n = (n + Math.imul(p, X)) | 0) + Math.imul(m, G)) | 0),
            (o = (o + Math.imul(m, X)) | 0)
          var wt =
            (((u + (i = (i + Math.imul(d, Q)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(d, tt)) | 0) + Math.imul(l, Q)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(l, tt)) | 0) + (n >>> 13)) | 0) +
              (wt >>> 26)) |
            0),
            (wt &= 67108863),
            (i = Math.imul(x, D)),
            (n = ((n = Math.imul(x, Z)) + Math.imul(E, D)) | 0),
            (o = Math.imul(E, Z)),
            (i = (i + Math.imul(S, K)) | 0),
            (n = ((n = (n + Math.imul(S, H)) | 0) + Math.imul(A, K)) | 0),
            (o = (o + Math.imul(A, H)) | 0),
            (i = (i + Math.imul(w, $)) | 0),
            (n = ((n = (n + Math.imul(w, W)) | 0) + Math.imul(M, $)) | 0),
            (o = (o + Math.imul(M, W)) | 0),
            (i = (i + Math.imul(g, G)) | 0),
            (n = ((n = (n + Math.imul(g, X)) | 0) + Math.imul(v, G)) | 0),
            (o = (o + Math.imul(v, X)) | 0),
            (i = (i + Math.imul(p, Q)) | 0),
            (n = ((n = (n + Math.imul(p, tt)) | 0) + Math.imul(m, Q)) | 0),
            (o = (o + Math.imul(m, tt)) | 0)
          var Mt =
            (((u + (i = (i + Math.imul(d, rt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(d, it)) | 0) + Math.imul(l, rt)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(l, it)) | 0) + (n >>> 13)) | 0) +
              (Mt >>> 26)) |
            0),
            (Mt &= 67108863),
            (i = Math.imul(B, D)),
            (n = ((n = Math.imul(B, Z)) + Math.imul(I, D)) | 0),
            (o = Math.imul(I, Z)),
            (i = (i + Math.imul(x, K)) | 0),
            (n = ((n = (n + Math.imul(x, H)) | 0) + Math.imul(E, K)) | 0),
            (o = (o + Math.imul(E, H)) | 0),
            (i = (i + Math.imul(S, $)) | 0),
            (n = ((n = (n + Math.imul(S, W)) | 0) + Math.imul(A, $)) | 0),
            (o = (o + Math.imul(A, W)) | 0),
            (i = (i + Math.imul(w, G)) | 0),
            (n = ((n = (n + Math.imul(w, X)) | 0) + Math.imul(M, G)) | 0),
            (o = (o + Math.imul(M, X)) | 0),
            (i = (i + Math.imul(g, Q)) | 0),
            (n = ((n = (n + Math.imul(g, tt)) | 0) + Math.imul(v, Q)) | 0),
            (o = (o + Math.imul(v, tt)) | 0),
            (i = (i + Math.imul(p, rt)) | 0),
            (n = ((n = (n + Math.imul(p, it)) | 0) + Math.imul(m, rt)) | 0),
            (o = (o + Math.imul(m, it)) | 0)
          var _t =
            (((u + (i = (i + Math.imul(d, ot)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(d, st)) | 0) + Math.imul(l, ot)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(l, st)) | 0) + (n >>> 13)) | 0) +
              (_t >>> 26)) |
            0),
            (_t &= 67108863),
            (i = Math.imul(T, D)),
            (n = ((n = Math.imul(T, Z)) + Math.imul(P, D)) | 0),
            (o = Math.imul(P, Z)),
            (i = (i + Math.imul(B, K)) | 0),
            (n = ((n = (n + Math.imul(B, H)) | 0) + Math.imul(I, K)) | 0),
            (o = (o + Math.imul(I, H)) | 0),
            (i = (i + Math.imul(x, $)) | 0),
            (n = ((n = (n + Math.imul(x, W)) | 0) + Math.imul(E, $)) | 0),
            (o = (o + Math.imul(E, W)) | 0),
            (i = (i + Math.imul(S, G)) | 0),
            (n = ((n = (n + Math.imul(S, X)) | 0) + Math.imul(A, G)) | 0),
            (o = (o + Math.imul(A, X)) | 0),
            (i = (i + Math.imul(w, Q)) | 0),
            (n = ((n = (n + Math.imul(w, tt)) | 0) + Math.imul(M, Q)) | 0),
            (o = (o + Math.imul(M, tt)) | 0),
            (i = (i + Math.imul(g, rt)) | 0),
            (n = ((n = (n + Math.imul(g, it)) | 0) + Math.imul(v, rt)) | 0),
            (o = (o + Math.imul(v, it)) | 0),
            (i = (i + Math.imul(p, ot)) | 0),
            (n = ((n = (n + Math.imul(p, st)) | 0) + Math.imul(m, ot)) | 0),
            (o = (o + Math.imul(m, st)) | 0)
          var St =
            (((u + (i = (i + Math.imul(d, ht)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(d, ut)) | 0) + Math.imul(l, ht)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(l, ut)) | 0) + (n >>> 13)) | 0) +
              (St >>> 26)) |
            0),
            (St &= 67108863),
            (i = Math.imul(q, D)),
            (n = ((n = Math.imul(q, Z)) + Math.imul(L, D)) | 0),
            (o = Math.imul(L, Z)),
            (i = (i + Math.imul(T, K)) | 0),
            (n = ((n = (n + Math.imul(T, H)) | 0) + Math.imul(P, K)) | 0),
            (o = (o + Math.imul(P, H)) | 0),
            (i = (i + Math.imul(B, $)) | 0),
            (n = ((n = (n + Math.imul(B, W)) | 0) + Math.imul(I, $)) | 0),
            (o = (o + Math.imul(I, W)) | 0),
            (i = (i + Math.imul(x, G)) | 0),
            (n = ((n = (n + Math.imul(x, X)) | 0) + Math.imul(E, G)) | 0),
            (o = (o + Math.imul(E, X)) | 0),
            (i = (i + Math.imul(S, Q)) | 0),
            (n = ((n = (n + Math.imul(S, tt)) | 0) + Math.imul(A, Q)) | 0),
            (o = (o + Math.imul(A, tt)) | 0),
            (i = (i + Math.imul(w, rt)) | 0),
            (n = ((n = (n + Math.imul(w, it)) | 0) + Math.imul(M, rt)) | 0),
            (o = (o + Math.imul(M, it)) | 0),
            (i = (i + Math.imul(g, ot)) | 0),
            (n = ((n = (n + Math.imul(g, st)) | 0) + Math.imul(v, ot)) | 0),
            (o = (o + Math.imul(v, st)) | 0),
            (i = (i + Math.imul(p, ht)) | 0),
            (n = ((n = (n + Math.imul(p, ut)) | 0) + Math.imul(m, ht)) | 0),
            (o = (o + Math.imul(m, ut)) | 0)
          var At =
            (((u + (i = (i + Math.imul(d, dt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(d, lt)) | 0) + Math.imul(l, dt)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(l, lt)) | 0) + (n >>> 13)) | 0) +
              (At >>> 26)) |
            0),
            (At &= 67108863),
            (i = Math.imul(j, D)),
            (n = ((n = Math.imul(j, Z)) + Math.imul(C, D)) | 0),
            (o = Math.imul(C, Z)),
            (i = (i + Math.imul(q, K)) | 0),
            (n = ((n = (n + Math.imul(q, H)) | 0) + Math.imul(L, K)) | 0),
            (o = (o + Math.imul(L, H)) | 0),
            (i = (i + Math.imul(T, $)) | 0),
            (n = ((n = (n + Math.imul(T, W)) | 0) + Math.imul(P, $)) | 0),
            (o = (o + Math.imul(P, W)) | 0),
            (i = (i + Math.imul(B, G)) | 0),
            (n = ((n = (n + Math.imul(B, X)) | 0) + Math.imul(I, G)) | 0),
            (o = (o + Math.imul(I, X)) | 0),
            (i = (i + Math.imul(x, Q)) | 0),
            (n = ((n = (n + Math.imul(x, tt)) | 0) + Math.imul(E, Q)) | 0),
            (o = (o + Math.imul(E, tt)) | 0),
            (i = (i + Math.imul(S, rt)) | 0),
            (n = ((n = (n + Math.imul(S, it)) | 0) + Math.imul(A, rt)) | 0),
            (o = (o + Math.imul(A, it)) | 0),
            (i = (i + Math.imul(w, ot)) | 0),
            (n = ((n = (n + Math.imul(w, st)) | 0) + Math.imul(M, ot)) | 0),
            (o = (o + Math.imul(M, st)) | 0),
            (i = (i + Math.imul(g, ht)) | 0),
            (n = ((n = (n + Math.imul(g, ut)) | 0) + Math.imul(v, ht)) | 0),
            (o = (o + Math.imul(v, ut)) | 0),
            (i = (i + Math.imul(p, dt)) | 0),
            (n = ((n = (n + Math.imul(p, lt)) | 0) + Math.imul(m, dt)) | 0),
            (o = (o + Math.imul(m, lt)) | 0)
          var kt =
            (((u + (i = (i + Math.imul(d, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(d, mt)) | 0) + Math.imul(l, pt)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(l, mt)) | 0) + (n >>> 13)) | 0) +
              (kt >>> 26)) |
            0),
            (kt &= 67108863),
            (i = Math.imul(j, K)),
            (n = ((n = Math.imul(j, H)) + Math.imul(C, K)) | 0),
            (o = Math.imul(C, H)),
            (i = (i + Math.imul(q, $)) | 0),
            (n = ((n = (n + Math.imul(q, W)) | 0) + Math.imul(L, $)) | 0),
            (o = (o + Math.imul(L, W)) | 0),
            (i = (i + Math.imul(T, G)) | 0),
            (n = ((n = (n + Math.imul(T, X)) | 0) + Math.imul(P, G)) | 0),
            (o = (o + Math.imul(P, X)) | 0),
            (i = (i + Math.imul(B, Q)) | 0),
            (n = ((n = (n + Math.imul(B, tt)) | 0) + Math.imul(I, Q)) | 0),
            (o = (o + Math.imul(I, tt)) | 0),
            (i = (i + Math.imul(x, rt)) | 0),
            (n = ((n = (n + Math.imul(x, it)) | 0) + Math.imul(E, rt)) | 0),
            (o = (o + Math.imul(E, it)) | 0),
            (i = (i + Math.imul(S, ot)) | 0),
            (n = ((n = (n + Math.imul(S, st)) | 0) + Math.imul(A, ot)) | 0),
            (o = (o + Math.imul(A, st)) | 0),
            (i = (i + Math.imul(w, ht)) | 0),
            (n = ((n = (n + Math.imul(w, ut)) | 0) + Math.imul(M, ht)) | 0),
            (o = (o + Math.imul(M, ut)) | 0),
            (i = (i + Math.imul(g, dt)) | 0),
            (n = ((n = (n + Math.imul(g, lt)) | 0) + Math.imul(v, dt)) | 0),
            (o = (o + Math.imul(v, lt)) | 0)
          var xt =
            (((u + (i = (i + Math.imul(p, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(p, mt)) | 0) + Math.imul(m, pt)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(m, mt)) | 0) + (n >>> 13)) | 0) +
              (xt >>> 26)) |
            0),
            (xt &= 67108863),
            (i = Math.imul(j, $)),
            (n = ((n = Math.imul(j, W)) + Math.imul(C, $)) | 0),
            (o = Math.imul(C, W)),
            (i = (i + Math.imul(q, G)) | 0),
            (n = ((n = (n + Math.imul(q, X)) | 0) + Math.imul(L, G)) | 0),
            (o = (o + Math.imul(L, X)) | 0),
            (i = (i + Math.imul(T, Q)) | 0),
            (n = ((n = (n + Math.imul(T, tt)) | 0) + Math.imul(P, Q)) | 0),
            (o = (o + Math.imul(P, tt)) | 0),
            (i = (i + Math.imul(B, rt)) | 0),
            (n = ((n = (n + Math.imul(B, it)) | 0) + Math.imul(I, rt)) | 0),
            (o = (o + Math.imul(I, it)) | 0),
            (i = (i + Math.imul(x, ot)) | 0),
            (n = ((n = (n + Math.imul(x, st)) | 0) + Math.imul(E, ot)) | 0),
            (o = (o + Math.imul(E, st)) | 0),
            (i = (i + Math.imul(S, ht)) | 0),
            (n = ((n = (n + Math.imul(S, ut)) | 0) + Math.imul(A, ht)) | 0),
            (o = (o + Math.imul(A, ut)) | 0),
            (i = (i + Math.imul(w, dt)) | 0),
            (n = ((n = (n + Math.imul(w, lt)) | 0) + Math.imul(M, dt)) | 0),
            (o = (o + Math.imul(M, lt)) | 0)
          var Et =
            (((u + (i = (i + Math.imul(g, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(g, mt)) | 0) + Math.imul(v, pt)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(v, mt)) | 0) + (n >>> 13)) | 0) +
              (Et >>> 26)) |
            0),
            (Et &= 67108863),
            (i = Math.imul(j, G)),
            (n = ((n = Math.imul(j, X)) + Math.imul(C, G)) | 0),
            (o = Math.imul(C, X)),
            (i = (i + Math.imul(q, Q)) | 0),
            (n = ((n = (n + Math.imul(q, tt)) | 0) + Math.imul(L, Q)) | 0),
            (o = (o + Math.imul(L, tt)) | 0),
            (i = (i + Math.imul(T, rt)) | 0),
            (n = ((n = (n + Math.imul(T, it)) | 0) + Math.imul(P, rt)) | 0),
            (o = (o + Math.imul(P, it)) | 0),
            (i = (i + Math.imul(B, ot)) | 0),
            (n = ((n = (n + Math.imul(B, st)) | 0) + Math.imul(I, ot)) | 0),
            (o = (o + Math.imul(I, st)) | 0),
            (i = (i + Math.imul(x, ht)) | 0),
            (n = ((n = (n + Math.imul(x, ut)) | 0) + Math.imul(E, ht)) | 0),
            (o = (o + Math.imul(E, ut)) | 0),
            (i = (i + Math.imul(S, dt)) | 0),
            (n = ((n = (n + Math.imul(S, lt)) | 0) + Math.imul(A, dt)) | 0),
            (o = (o + Math.imul(A, lt)) | 0)
          var Rt =
            (((u + (i = (i + Math.imul(w, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(w, mt)) | 0) + Math.imul(M, pt)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(M, mt)) | 0) + (n >>> 13)) | 0) +
              (Rt >>> 26)) |
            0),
            (Rt &= 67108863),
            (i = Math.imul(j, Q)),
            (n = ((n = Math.imul(j, tt)) + Math.imul(C, Q)) | 0),
            (o = Math.imul(C, tt)),
            (i = (i + Math.imul(q, rt)) | 0),
            (n = ((n = (n + Math.imul(q, it)) | 0) + Math.imul(L, rt)) | 0),
            (o = (o + Math.imul(L, it)) | 0),
            (i = (i + Math.imul(T, ot)) | 0),
            (n = ((n = (n + Math.imul(T, st)) | 0) + Math.imul(P, ot)) | 0),
            (o = (o + Math.imul(P, st)) | 0),
            (i = (i + Math.imul(B, ht)) | 0),
            (n = ((n = (n + Math.imul(B, ut)) | 0) + Math.imul(I, ht)) | 0),
            (o = (o + Math.imul(I, ut)) | 0),
            (i = (i + Math.imul(x, dt)) | 0),
            (n = ((n = (n + Math.imul(x, lt)) | 0) + Math.imul(E, dt)) | 0),
            (o = (o + Math.imul(E, lt)) | 0)
          var Bt =
            (((u + (i = (i + Math.imul(S, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(S, mt)) | 0) + Math.imul(A, pt)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(A, mt)) | 0) + (n >>> 13)) | 0) +
              (Bt >>> 26)) |
            0),
            (Bt &= 67108863),
            (i = Math.imul(j, rt)),
            (n = ((n = Math.imul(j, it)) + Math.imul(C, rt)) | 0),
            (o = Math.imul(C, it)),
            (i = (i + Math.imul(q, ot)) | 0),
            (n = ((n = (n + Math.imul(q, st)) | 0) + Math.imul(L, ot)) | 0),
            (o = (o + Math.imul(L, st)) | 0),
            (i = (i + Math.imul(T, ht)) | 0),
            (n = ((n = (n + Math.imul(T, ut)) | 0) + Math.imul(P, ht)) | 0),
            (o = (o + Math.imul(P, ut)) | 0),
            (i = (i + Math.imul(B, dt)) | 0),
            (n = ((n = (n + Math.imul(B, lt)) | 0) + Math.imul(I, dt)) | 0),
            (o = (o + Math.imul(I, lt)) | 0)
          var It =
            (((u + (i = (i + Math.imul(x, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(x, mt)) | 0) + Math.imul(E, pt)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(E, mt)) | 0) + (n >>> 13)) | 0) +
              (It >>> 26)) |
            0),
            (It &= 67108863),
            (i = Math.imul(j, ot)),
            (n = ((n = Math.imul(j, st)) + Math.imul(C, ot)) | 0),
            (o = Math.imul(C, st)),
            (i = (i + Math.imul(q, ht)) | 0),
            (n = ((n = (n + Math.imul(q, ut)) | 0) + Math.imul(L, ht)) | 0),
            (o = (o + Math.imul(L, ut)) | 0),
            (i = (i + Math.imul(T, dt)) | 0),
            (n = ((n = (n + Math.imul(T, lt)) | 0) + Math.imul(P, dt)) | 0),
            (o = (o + Math.imul(P, lt)) | 0)
          var Nt =
            (((u + (i = (i + Math.imul(B, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(B, mt)) | 0) + Math.imul(I, pt)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(I, mt)) | 0) + (n >>> 13)) | 0) +
              (Nt >>> 26)) |
            0),
            (Nt &= 67108863),
            (i = Math.imul(j, ht)),
            (n = ((n = Math.imul(j, ut)) + Math.imul(C, ht)) | 0),
            (o = Math.imul(C, ut)),
            (i = (i + Math.imul(q, dt)) | 0),
            (n = ((n = (n + Math.imul(q, lt)) | 0) + Math.imul(L, dt)) | 0),
            (o = (o + Math.imul(L, lt)) | 0)
          var Tt =
            (((u + (i = (i + Math.imul(T, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(T, mt)) | 0) + Math.imul(P, pt)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(P, mt)) | 0) + (n >>> 13)) | 0) +
              (Tt >>> 26)) |
            0),
            (Tt &= 67108863),
            (i = Math.imul(j, dt)),
            (n = ((n = Math.imul(j, lt)) + Math.imul(C, dt)) | 0),
            (o = Math.imul(C, lt))
          var Pt =
            (((u + (i = (i + Math.imul(q, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(q, mt)) | 0) + Math.imul(L, pt)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(L, mt)) | 0) + (n >>> 13)) | 0) +
              (Pt >>> 26)) |
            0),
            (Pt &= 67108863)
          var Ot =
            (((u + (i = Math.imul(j, pt))) | 0) +
              ((8191 & (n = ((n = Math.imul(j, mt)) + Math.imul(C, pt)) | 0)) <<
                13)) |
            0
          return (
            (u =
              ((((o = Math.imul(C, mt)) + (n >>> 13)) | 0) + (Ot >>> 26)) | 0),
            (Ot &= 67108863),
            (h[0] = bt),
            (h[1] = gt),
            (h[2] = vt),
            (h[3] = yt),
            (h[4] = wt),
            (h[5] = Mt),
            (h[6] = _t),
            (h[7] = St),
            (h[8] = At),
            (h[9] = kt),
            (h[10] = xt),
            (h[11] = Et),
            (h[12] = Rt),
            (h[13] = Bt),
            (h[14] = It),
            (h[15] = Nt),
            (h[16] = Tt),
            (h[17] = Pt),
            (h[18] = Ot),
            0 !== u && ((h[19] = u), r.length++),
            r
          )
        }
        function c(t, e, r) {
          return new p().mulp(t, e, r)
        }
        function p(t, e) {
          ;(this.x = t), (this.y = e)
        }
        Math.imul || (l = d),
          (n.prototype.mulTo = function (t, e) {
            var r,
              i = this.length + t.length
            return (
              (r =
                10 === this.length && 10 === t.length
                  ? l(this, t, e)
                  : i < 63
                  ? d(this, t, e)
                  : i < 1024
                  ? (function (t, e, r) {
                      ;(r.negative = e.negative ^ t.negative),
                        (r.length = t.length + e.length)
                      for (var i = 0, n = 0, o = 0; o < r.length - 1; o++) {
                        var s = n
                        n = 0
                        for (
                          var a = 67108863 & i,
                            h = Math.min(o, e.length - 1),
                            u = Math.max(0, o - t.length + 1);
                          u <= h;
                          u++
                        ) {
                          var f = (0 | t.words[o - u]) * (0 | e.words[u]),
                            d = 67108863 & f
                          ;(a = 67108863 & (d = (d + a) | 0)),
                            (n +=
                              (s =
                                ((s = (s + ((f / 67108864) | 0)) | 0) +
                                  (d >>> 26)) |
                                0) >>> 26),
                            (s &= 67108863)
                        }
                        ;(r.words[o] = a), (i = s), (s = n)
                      }
                      return 0 !== i ? (r.words[o] = i) : r.length--, r.strip()
                    })(this, t, e)
                  : c(this, t, e)),
              r
            )
          }),
          (p.prototype.makeRBT = function (t) {
            for (
              var e = new Array(t), r = n.prototype._countBits(t) - 1, i = 0;
              i < t;
              i++
            )
              e[i] = this.revBin(i, r, t)
            return e
          }),
          (p.prototype.revBin = function (t, e, r) {
            if (0 === t || t === r - 1) return t
            for (var i = 0, n = 0; n < e; n++)
              (i |= (1 & t) << (e - n - 1)), (t >>= 1)
            return i
          }),
          (p.prototype.permute = function (t, e, r, i, n, o) {
            for (var s = 0; s < o; s++) (i[s] = e[t[s]]), (n[s] = r[t[s]])
          }),
          (p.prototype.transform = function (t, e, r, i, n, o) {
            this.permute(o, t, e, r, i, n)
            for (var s = 1; s < n; s <<= 1)
              for (
                var a = s << 1,
                  h = Math.cos((2 * Math.PI) / a),
                  u = Math.sin((2 * Math.PI) / a),
                  f = 0;
                f < n;
                f += a
              )
                for (var d = h, l = u, c = 0; c < s; c++) {
                  var p = r[f + c],
                    m = i[f + c],
                    b = r[f + c + s],
                    g = i[f + c + s],
                    v = d * b - l * g
                  ;(g = d * g + l * b),
                    (r[f + c] = p + (b = v)),
                    (i[f + c] = m + g),
                    (r[f + c + s] = p - b),
                    (i[f + c + s] = m - g),
                    c !== a &&
                      ((v = h * d - u * l), (l = h * l + u * d), (d = v))
                }
          }),
          (p.prototype.guessLen13b = function (t, e) {
            var r = 1 | Math.max(e, t),
              i = 1 & r,
              n = 0
            for (r = (r / 2) | 0; r; r >>>= 1) n++
            return 1 << (n + 1 + i)
          }),
          (p.prototype.conjugate = function (t, e, r) {
            if (!(r <= 1))
              for (var i = 0; i < r / 2; i++) {
                var n = t[i]
                ;(t[i] = t[r - i - 1]),
                  (t[r - i - 1] = n),
                  (n = e[i]),
                  (e[i] = -e[r - i - 1]),
                  (e[r - i - 1] = -n)
              }
          }),
          (p.prototype.normalize13b = function (t, e) {
            for (var r = 0, i = 0; i < e / 2; i++) {
              var n =
                8192 * Math.round(t[2 * i + 1] / e) +
                Math.round(t[2 * i] / e) +
                r
              ;(t[i] = 67108863 & n),
                (r = n < 67108864 ? 0 : (n / 67108864) | 0)
            }
            return t
          }),
          (p.prototype.convert13b = function (t, e, i, n) {
            for (var o = 0, s = 0; s < e; s++)
              (i[2 * s] = 8191 & (o += 0 | t[s])),
                (i[2 * s + 1] = 8191 & (o >>>= 13)),
                (o >>>= 13)
            for (s = 2 * e; s < n; ++s) i[s] = 0
            r(0 === o), r(0 == (-8192 & o))
          }),
          (p.prototype.stub = function (t) {
            for (var e = new Array(t), r = 0; r < t; r++) e[r] = 0
            return e
          }),
          (p.prototype.mulp = function (t, e, r) {
            var i = 2 * this.guessLen13b(t.length, e.length),
              n = this.makeRBT(i),
              o = this.stub(i),
              s = new Array(i),
              a = new Array(i),
              h = new Array(i),
              u = new Array(i),
              f = new Array(i),
              d = new Array(i),
              l = r.words
            ;(l.length = i),
              this.convert13b(t.words, t.length, s, i),
              this.convert13b(e.words, e.length, u, i),
              this.transform(s, o, a, h, i, n),
              this.transform(u, o, f, d, i, n)
            for (var c = 0; c < i; c++) {
              var p = a[c] * f[c] - h[c] * d[c]
              ;(h[c] = a[c] * d[c] + h[c] * f[c]), (a[c] = p)
            }
            return (
              this.conjugate(a, h, i),
              this.transform(a, h, l, o, i, n),
              this.conjugate(l, o, i),
              this.normalize13b(l, i),
              (r.negative = t.negative ^ e.negative),
              (r.length = t.length + e.length),
              r.strip()
            )
          }),
          (n.prototype.mul = function (t) {
            var e = new n(null)
            return (
              (e.words = new Array(this.length + t.length)), this.mulTo(t, e)
            )
          }),
          (n.prototype.mulf = function (t) {
            var e = new n(null)
            return (e.words = new Array(this.length + t.length)), c(this, t, e)
          }),
          (n.prototype.imul = function (t) {
            return this.clone().mulTo(t, this)
          }),
          (n.prototype.imuln = function (t) {
            r('number' == typeof t), r(t < 67108864)
            for (var e = 0, i = 0; i < this.length; i++) {
              var n = (0 | this.words[i]) * t,
                o = (67108863 & n) + (67108863 & e)
              ;(e >>= 26),
                (e += (n / 67108864) | 0),
                (e += o >>> 26),
                (this.words[i] = 67108863 & o)
            }
            return 0 !== e && ((this.words[i] = e), this.length++), this
          }),
          (n.prototype.muln = function (t) {
            return this.clone().imuln(t)
          }),
          (n.prototype.sqr = function () {
            return this.mul(this)
          }),
          (n.prototype.isqr = function () {
            return this.imul(this.clone())
          }),
          (n.prototype.pow = function (t) {
            var e = (function (t) {
              for (var e = new Array(t.bitLength()), r = 0; r < e.length; r++) {
                var i = r % 26
                e[r] = (t.words[(r / 26) | 0] & (1 << i)) >>> i
              }
              return e
            })(t)
            if (0 === e.length) return new n(1)
            for (
              var r = this, i = 0;
              i < e.length && 0 === e[i];
              i++, r = r.sqr()
            );
            if (++i < e.length)
              for (var o = r.sqr(); i < e.length; i++, o = o.sqr())
                0 !== e[i] && (r = r.mul(o))
            return r
          }),
          (n.prototype.iushln = function (t) {
            r('number' == typeof t && t >= 0)
            var e,
              i = t % 26,
              n = (t - i) / 26,
              o = (67108863 >>> (26 - i)) << (26 - i)
            if (0 !== i) {
              var s = 0
              for (e = 0; e < this.length; e++) {
                var a = this.words[e] & o
                ;(this.words[e] = (((0 | this.words[e]) - a) << i) | s),
                  (s = a >>> (26 - i))
              }
              s && ((this.words[e] = s), this.length++)
            }
            if (0 !== n) {
              for (e = this.length - 1; e >= 0; e--)
                this.words[e + n] = this.words[e]
              for (e = 0; e < n; e++) this.words[e] = 0
              this.length += n
            }
            return this.strip()
          }),
          (n.prototype.ishln = function (t) {
            return r(0 === this.negative), this.iushln(t)
          }),
          (n.prototype.iushrn = function (t, e, i) {
            var n
            r('number' == typeof t && t >= 0), (n = e ? (e - (e % 26)) / 26 : 0)
            var o = t % 26,
              s = Math.min((t - o) / 26, this.length),
              a = 67108863 ^ ((67108863 >>> o) << o),
              h = i
            if (((n -= s), (n = Math.max(0, n)), h)) {
              for (var u = 0; u < s; u++) h.words[u] = this.words[u]
              h.length = s
            }
            if (0 === s);
            else if (this.length > s)
              for (this.length -= s, u = 0; u < this.length; u++)
                this.words[u] = this.words[u + s]
            else (this.words[0] = 0), (this.length = 1)
            var f = 0
            for (u = this.length - 1; u >= 0 && (0 !== f || u >= n); u--) {
              var d = 0 | this.words[u]
              ;(this.words[u] = (f << (26 - o)) | (d >>> o)), (f = d & a)
            }
            return (
              h && 0 !== f && (h.words[h.length++] = f),
              0 === this.length && ((this.words[0] = 0), (this.length = 1)),
              this.strip()
            )
          }),
          (n.prototype.ishrn = function (t, e, i) {
            return r(0 === this.negative), this.iushrn(t, e, i)
          }),
          (n.prototype.shln = function (t) {
            return this.clone().ishln(t)
          }),
          (n.prototype.ushln = function (t) {
            return this.clone().iushln(t)
          }),
          (n.prototype.shrn = function (t) {
            return this.clone().ishrn(t)
          }),
          (n.prototype.ushrn = function (t) {
            return this.clone().iushrn(t)
          }),
          (n.prototype.testn = function (t) {
            r('number' == typeof t && t >= 0)
            var e = t % 26,
              i = (t - e) / 26
            return !(this.length <= i || !(this.words[i] & (1 << e)))
          }),
          (n.prototype.imaskn = function (t) {
            r('number' == typeof t && t >= 0)
            var e = t % 26,
              i = (t - e) / 26
            return (
              r(0 === this.negative, 'imaskn works only with positive numbers'),
              this.length <= i
                ? this
                : (0 !== e && i++,
                  (this.length = Math.min(i, this.length)),
                  0 !== e &&
                    (this.words[this.length - 1] &=
                      67108863 ^ ((67108863 >>> e) << e)),
                  this.strip())
            )
          }),
          (n.prototype.maskn = function (t) {
            return this.clone().imaskn(t)
          }),
          (n.prototype.iaddn = function (t) {
            return (
              r('number' == typeof t),
              r(t < 67108864),
              t < 0
                ? this.isubn(-t)
                : 0 !== this.negative
                ? 1 === this.length && (0 | this.words[0]) < t
                  ? ((this.words[0] = t - (0 | this.words[0])),
                    (this.negative = 0),
                    this)
                  : ((this.negative = 0),
                    this.isubn(t),
                    (this.negative = 1),
                    this)
                : this._iaddn(t)
            )
          }),
          (n.prototype._iaddn = function (t) {
            this.words[0] += t
            for (var e = 0; e < this.length && this.words[e] >= 67108864; e++)
              (this.words[e] -= 67108864),
                e === this.length - 1
                  ? (this.words[e + 1] = 1)
                  : this.words[e + 1]++
            return (this.length = Math.max(this.length, e + 1)), this
          }),
          (n.prototype.isubn = function (t) {
            if ((r('number' == typeof t), r(t < 67108864), t < 0))
              return this.iaddn(-t)
            if (0 !== this.negative)
              return (
                (this.negative = 0), this.iaddn(t), (this.negative = 1), this
              )
            if (((this.words[0] -= t), 1 === this.length && this.words[0] < 0))
              (this.words[0] = -this.words[0]), (this.negative = 1)
            else
              for (var e = 0; e < this.length && this.words[e] < 0; e++)
                (this.words[e] += 67108864), (this.words[e + 1] -= 1)
            return this.strip()
          }),
          (n.prototype.addn = function (t) {
            return this.clone().iaddn(t)
          }),
          (n.prototype.subn = function (t) {
            return this.clone().isubn(t)
          }),
          (n.prototype.iabs = function () {
            return (this.negative = 0), this
          }),
          (n.prototype.abs = function () {
            return this.clone().iabs()
          }),
          (n.prototype._ishlnsubmul = function (t, e, i) {
            var n, o
            this._expand(t.length + i)
            var s = 0
            for (n = 0; n < t.length; n++) {
              o = (0 | this.words[n + i]) + s
              var a = (0 | t.words[n]) * e
              ;(s = ((o -= 67108863 & a) >> 26) - ((a / 67108864) | 0)),
                (this.words[n + i] = 67108863 & o)
            }
            for (; n < this.length - i; n++)
              (s = (o = (0 | this.words[n + i]) + s) >> 26),
                (this.words[n + i] = 67108863 & o)
            if (0 === s) return this.strip()
            for (r(-1 === s), s = 0, n = 0; n < this.length; n++)
              (s = (o = -(0 | this.words[n]) + s) >> 26),
                (this.words[n] = 67108863 & o)
            return (this.negative = 1), this.strip()
          }),
          (n.prototype._wordDiv = function (t, e) {
            var r,
              i = this.clone(),
              o = t,
              s = 0 | o.words[o.length - 1]
            0 != (r = 26 - this._countBits(s)) &&
              ((o = o.ushln(r)), i.iushln(r), (s = 0 | o.words[o.length - 1]))
            var a,
              h = i.length - o.length
            if ('mod' !== e) {
              ;((a = new n(null)).length = h + 1),
                (a.words = new Array(a.length))
              for (var u = 0; u < a.length; u++) a.words[u] = 0
            }
            var f = i.clone()._ishlnsubmul(o, 1, h)
            0 === f.negative && ((i = f), a && (a.words[h] = 1))
            for (var d = h - 1; d >= 0; d--) {
              var l =
                67108864 * (0 | i.words[o.length + d]) +
                (0 | i.words[o.length + d - 1])
              for (
                l = Math.min((l / s) | 0, 67108863), i._ishlnsubmul(o, l, d);
                0 !== i.negative;

              )
                l--,
                  (i.negative = 0),
                  i._ishlnsubmul(o, 1, d),
                  i.isZero() || (i.negative ^= 1)
              a && (a.words[d] = l)
            }
            return (
              a && a.strip(),
              i.strip(),
              'div' !== e && 0 !== r && i.iushrn(r),
              { div: a || null, mod: i }
            )
          }),
          (n.prototype.divmod = function (t, e, i) {
            return (
              r(!t.isZero()),
              this.isZero()
                ? { div: new n(0), mod: new n(0) }
                : 0 !== this.negative && 0 === t.negative
                ? ((a = this.neg().divmod(t, e)),
                  'mod' !== e && (o = a.div.neg()),
                  'div' !== e &&
                    ((s = a.mod.neg()), i && 0 !== s.negative && s.iadd(t)),
                  { div: o, mod: s })
                : 0 === this.negative && 0 !== t.negative
                ? ((a = this.divmod(t.neg(), e)),
                  'mod' !== e && (o = a.div.neg()),
                  { div: o, mod: a.mod })
                : 0 != (this.negative & t.negative)
                ? ((a = this.neg().divmod(t.neg(), e)),
                  'div' !== e &&
                    ((s = a.mod.neg()), i && 0 !== s.negative && s.isub(t)),
                  { div: a.div, mod: s })
                : t.length > this.length || this.cmp(t) < 0
                ? { div: new n(0), mod: this }
                : 1 === t.length
                ? 'div' === e
                  ? { div: this.divn(t.words[0]), mod: null }
                  : 'mod' === e
                  ? { div: null, mod: new n(this.modn(t.words[0])) }
                  : {
                      div: this.divn(t.words[0]),
                      mod: new n(this.modn(t.words[0]))
                    }
                : this._wordDiv(t, e)
            )
            var o, s, a
          }),
          (n.prototype.div = function (t) {
            return this.divmod(t, 'div', !1).div
          }),
          (n.prototype.mod = function (t) {
            return this.divmod(t, 'mod', !1).mod
          }),
          (n.prototype.umod = function (t) {
            return this.divmod(t, 'mod', !0).mod
          }),
          (n.prototype.divRound = function (t) {
            var e = this.divmod(t)
            if (e.mod.isZero()) return e.div
            var r = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
              i = t.ushrn(1),
              n = t.andln(1),
              o = r.cmp(i)
            return o < 0 || (1 === n && 0 === o)
              ? e.div
              : 0 !== e.div.negative
              ? e.div.isubn(1)
              : e.div.iaddn(1)
          }),
          (n.prototype.modn = function (t) {
            r(t <= 67108863)
            for (var e = (1 << 26) % t, i = 0, n = this.length - 1; n >= 0; n--)
              i = (e * i + (0 | this.words[n])) % t
            return i
          }),
          (n.prototype.idivn = function (t) {
            r(t <= 67108863)
            for (var e = 0, i = this.length - 1; i >= 0; i--) {
              var n = (0 | this.words[i]) + 67108864 * e
              ;(this.words[i] = (n / t) | 0), (e = n % t)
            }
            return this.strip()
          }),
          (n.prototype.divn = function (t) {
            return this.clone().idivn(t)
          }),
          (n.prototype.egcd = function (t) {
            r(0 === t.negative), r(!t.isZero())
            var e = this,
              i = t.clone()
            e = 0 !== e.negative ? e.umod(t) : e.clone()
            for (
              var o = new n(1), s = new n(0), a = new n(0), h = new n(1), u = 0;
              e.isEven() && i.isEven();

            )
              e.iushrn(1), i.iushrn(1), ++u
            for (var f = i.clone(), d = e.clone(); !e.isZero(); ) {
              for (
                var l = 0, c = 1;
                0 == (e.words[0] & c) && l < 26;
                ++l, c <<= 1
              );
              if (l > 0)
                for (e.iushrn(l); l-- > 0; )
                  (o.isOdd() || s.isOdd()) && (o.iadd(f), s.isub(d)),
                    o.iushrn(1),
                    s.iushrn(1)
              for (
                var p = 0, m = 1;
                0 == (i.words[0] & m) && p < 26;
                ++p, m <<= 1
              );
              if (p > 0)
                for (i.iushrn(p); p-- > 0; )
                  (a.isOdd() || h.isOdd()) && (a.iadd(f), h.isub(d)),
                    a.iushrn(1),
                    h.iushrn(1)
              e.cmp(i) >= 0
                ? (e.isub(i), o.isub(a), s.isub(h))
                : (i.isub(e), a.isub(o), h.isub(s))
            }
            return { a: a, b: h, gcd: i.iushln(u) }
          }),
          (n.prototype._invmp = function (t) {
            r(0 === t.negative), r(!t.isZero())
            var e = this,
              i = t.clone()
            e = 0 !== e.negative ? e.umod(t) : e.clone()
            for (
              var o, s = new n(1), a = new n(0), h = i.clone();
              e.cmpn(1) > 0 && i.cmpn(1) > 0;

            ) {
              for (
                var u = 0, f = 1;
                0 == (e.words[0] & f) && u < 26;
                ++u, f <<= 1
              );
              if (u > 0)
                for (e.iushrn(u); u-- > 0; ) s.isOdd() && s.iadd(h), s.iushrn(1)
              for (
                var d = 0, l = 1;
                0 == (i.words[0] & l) && d < 26;
                ++d, l <<= 1
              );
              if (d > 0)
                for (i.iushrn(d); d-- > 0; ) a.isOdd() && a.iadd(h), a.iushrn(1)
              e.cmp(i) >= 0 ? (e.isub(i), s.isub(a)) : (i.isub(e), a.isub(s))
            }
            return (o = 0 === e.cmpn(1) ? s : a).cmpn(0) < 0 && o.iadd(t), o
          }),
          (n.prototype.gcd = function (t) {
            if (this.isZero()) return t.abs()
            if (t.isZero()) return this.abs()
            var e = this.clone(),
              r = t.clone()
            ;(e.negative = 0), (r.negative = 0)
            for (var i = 0; e.isEven() && r.isEven(); i++)
              e.iushrn(1), r.iushrn(1)
            for (;;) {
              for (; e.isEven(); ) e.iushrn(1)
              for (; r.isEven(); ) r.iushrn(1)
              var n = e.cmp(r)
              if (n < 0) {
                var o = e
                ;(e = r), (r = o)
              } else if (0 === n || 0 === r.cmpn(1)) break
              e.isub(r)
            }
            return r.iushln(i)
          }),
          (n.prototype.invm = function (t) {
            return this.egcd(t).a.umod(t)
          }),
          (n.prototype.isEven = function () {
            return 0 == (1 & this.words[0])
          }),
          (n.prototype.isOdd = function () {
            return 1 == (1 & this.words[0])
          }),
          (n.prototype.andln = function (t) {
            return this.words[0] & t
          }),
          (n.prototype.bincn = function (t) {
            r('number' == typeof t)
            var e = t % 26,
              i = (t - e) / 26,
              n = 1 << e
            if (this.length <= i)
              return this._expand(i + 1), (this.words[i] |= n), this
            for (var o = n, s = i; 0 !== o && s < this.length; s++) {
              var a = 0 | this.words[s]
              ;(o = (a += o) >>> 26), (this.words[s] = a &= 67108863)
            }
            return 0 !== o && ((this.words[s] = o), this.length++), this
          }),
          (n.prototype.isZero = function () {
            return 1 === this.length && 0 === this.words[0]
          }),
          (n.prototype.cmpn = function (t) {
            var e,
              i = t < 0
            if (0 !== this.negative && !i) return -1
            if (0 === this.negative && i) return 1
            if ((this.strip(), this.length > 1)) e = 1
            else {
              i && (t = -t), r(t <= 67108863, 'Number is too big')
              var n = 0 | this.words[0]
              e = n === t ? 0 : n < t ? -1 : 1
            }
            return 0 !== this.negative ? 0 | -e : e
          }),
          (n.prototype.cmp = function (t) {
            if (0 !== this.negative && 0 === t.negative) return -1
            if (0 === this.negative && 0 !== t.negative) return 1
            var e = this.ucmp(t)
            return 0 !== this.negative ? 0 | -e : e
          }),
          (n.prototype.ucmp = function (t) {
            if (this.length > t.length) return 1
            if (this.length < t.length) return -1
            for (var e = 0, r = this.length - 1; r >= 0; r--) {
              var i = 0 | this.words[r],
                n = 0 | t.words[r]
              if (i !== n) {
                i < n ? (e = -1) : i > n && (e = 1)
                break
              }
            }
            return e
          }),
          (n.prototype.gtn = function (t) {
            return 1 === this.cmpn(t)
          }),
          (n.prototype.gt = function (t) {
            return 1 === this.cmp(t)
          }),
          (n.prototype.gten = function (t) {
            return this.cmpn(t) >= 0
          }),
          (n.prototype.gte = function (t) {
            return this.cmp(t) >= 0
          }),
          (n.prototype.ltn = function (t) {
            return -1 === this.cmpn(t)
          }),
          (n.prototype.lt = function (t) {
            return -1 === this.cmp(t)
          }),
          (n.prototype.lten = function (t) {
            return this.cmpn(t) <= 0
          }),
          (n.prototype.lte = function (t) {
            return this.cmp(t) <= 0
          }),
          (n.prototype.eqn = function (t) {
            return 0 === this.cmpn(t)
          }),
          (n.prototype.eq = function (t) {
            return 0 === this.cmp(t)
          }),
          (n.red = function (t) {
            return new M(t)
          }),
          (n.prototype.toRed = function (t) {
            return (
              r(!this.red, 'Already a number in reduction context'),
              r(0 === this.negative, 'red works only with positives'),
              t.convertTo(this)._forceRed(t)
            )
          }),
          (n.prototype.fromRed = function () {
            return (
              r(
                this.red,
                'fromRed works only with numbers in reduction context'
              ),
              this.red.convertFrom(this)
            )
          }),
          (n.prototype._forceRed = function (t) {
            return (this.red = t), this
          }),
          (n.prototype.forceRed = function (t) {
            return (
              r(!this.red, 'Already a number in reduction context'),
              this._forceRed(t)
            )
          }),
          (n.prototype.redAdd = function (t) {
            return (
              r(this.red, 'redAdd works only with red numbers'),
              this.red.add(this, t)
            )
          }),
          (n.prototype.redIAdd = function (t) {
            return (
              r(this.red, 'redIAdd works only with red numbers'),
              this.red.iadd(this, t)
            )
          }),
          (n.prototype.redSub = function (t) {
            return (
              r(this.red, 'redSub works only with red numbers'),
              this.red.sub(this, t)
            )
          }),
          (n.prototype.redISub = function (t) {
            return (
              r(this.red, 'redISub works only with red numbers'),
              this.red.isub(this, t)
            )
          }),
          (n.prototype.redShl = function (t) {
            return (
              r(this.red, 'redShl works only with red numbers'),
              this.red.shl(this, t)
            )
          }),
          (n.prototype.redMul = function (t) {
            return (
              r(this.red, 'redMul works only with red numbers'),
              this.red._verify2(this, t),
              this.red.mul(this, t)
            )
          }),
          (n.prototype.redIMul = function (t) {
            return (
              r(this.red, 'redMul works only with red numbers'),
              this.red._verify2(this, t),
              this.red.imul(this, t)
            )
          }),
          (n.prototype.redSqr = function () {
            return (
              r(this.red, 'redSqr works only with red numbers'),
              this.red._verify1(this),
              this.red.sqr(this)
            )
          }),
          (n.prototype.redISqr = function () {
            return (
              r(this.red, 'redISqr works only with red numbers'),
              this.red._verify1(this),
              this.red.isqr(this)
            )
          }),
          (n.prototype.redSqrt = function () {
            return (
              r(this.red, 'redSqrt works only with red numbers'),
              this.red._verify1(this),
              this.red.sqrt(this)
            )
          }),
          (n.prototype.redInvm = function () {
            return (
              r(this.red, 'redInvm works only with red numbers'),
              this.red._verify1(this),
              this.red.invm(this)
            )
          }),
          (n.prototype.redNeg = function () {
            return (
              r(this.red, 'redNeg works only with red numbers'),
              this.red._verify1(this),
              this.red.neg(this)
            )
          }),
          (n.prototype.redPow = function (t) {
            return (
              r(this.red && !t.red, 'redPow(normalNum)'),
              this.red._verify1(this),
              this.red.pow(this, t)
            )
          })
        var m = { k256: null, p224: null, p192: null, p25519: null }
        function b(t, e) {
          ;(this.name = t),
            (this.p = new n(e, 16)),
            (this.n = this.p.bitLength()),
            (this.k = new n(1).iushln(this.n).isub(this.p)),
            (this.tmp = this._tmp())
        }
        function g() {
          b.call(
            this,
            'k256',
            'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f'
          )
        }
        function v() {
          b.call(
            this,
            'p224',
            'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001'
          )
        }
        function y() {
          b.call(
            this,
            'p192',
            'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff'
          )
        }
        function w() {
          b.call(
            this,
            '25519',
            '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed'
          )
        }
        function M(t) {
          if ('string' == typeof t) {
            var e = n._prime(t)
            ;(this.m = e.p), (this.prime = e)
          } else r(t.gtn(1), 'modulus must be greater than 1'), (this.m = t), (this.prime = null)
        }
        function _(t) {
          M.call(this, t),
            (this.shift = this.m.bitLength()),
            this.shift % 26 != 0 && (this.shift += 26 - (this.shift % 26)),
            (this.r = new n(1).iushln(this.shift)),
            (this.r2 = this.imod(this.r.sqr())),
            (this.rinv = this.r._invmp(this.m)),
            (this.minv = this.rinv.mul(this.r).isubn(1).div(this.m)),
            (this.minv = this.minv.umod(this.r)),
            (this.minv = this.r.sub(this.minv))
        }
        ;(b.prototype._tmp = function () {
          var t = new n(null)
          return (t.words = new Array(Math.ceil(this.n / 13))), t
        }),
          (b.prototype.ireduce = function (t) {
            var e,
              r = t
            do {
              this.split(r, this.tmp),
                (e = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength())
            } while (e > this.n)
            var i = e < this.n ? -1 : r.ucmp(this.p)
            return (
              0 === i
                ? ((r.words[0] = 0), (r.length = 1))
                : i > 0
                ? r.isub(this.p)
                : r.strip(),
              r
            )
          }),
          (b.prototype.split = function (t, e) {
            t.iushrn(this.n, 0, e)
          }),
          (b.prototype.imulK = function (t) {
            return t.imul(this.k)
          }),
          i(g, b),
          (g.prototype.split = function (t, e) {
            for (var r = 4194303, i = Math.min(t.length, 9), n = 0; n < i; n++)
              e.words[n] = t.words[n]
            if (((e.length = i), t.length <= 9))
              return (t.words[0] = 0), void (t.length = 1)
            var o = t.words[9]
            for (e.words[e.length++] = o & r, n = 10; n < t.length; n++) {
              var s = 0 | t.words[n]
              ;(t.words[n - 10] = ((s & r) << 4) | (o >>> 22)), (o = s)
            }
            ;(t.words[n - 10] = o >>>= 22),
              (t.length -= 0 === o && t.length > 10 ? 10 : 9)
          }),
          (g.prototype.imulK = function (t) {
            ;(t.words[t.length] = 0),
              (t.words[t.length + 1] = 0),
              (t.length += 2)
            for (var e = 0, r = 0; r < t.length; r++) {
              var i = 0 | t.words[r]
              ;(t.words[r] = 67108863 & (e += 977 * i)),
                (e = 64 * i + ((e / 67108864) | 0))
            }
            return (
              0 === t.words[t.length - 1] &&
                (t.length--, 0 === t.words[t.length - 1] && t.length--),
              t
            )
          }),
          i(v, b),
          i(y, b),
          i(w, b),
          (w.prototype.imulK = function (t) {
            for (var e = 0, r = 0; r < t.length; r++) {
              var i = 19 * (0 | t.words[r]) + e,
                n = 67108863 & i
              ;(i >>>= 26), (t.words[r] = n), (e = i)
            }
            return 0 !== e && (t.words[t.length++] = e), t
          }),
          (n._prime = function (t) {
            if (m[t]) return m[t]
            var e
            if ('k256' === t) e = new g()
            else if ('p224' === t) e = new v()
            else if ('p192' === t) e = new y()
            else {
              if ('p25519' !== t) throw new Error('Unknown prime ' + t)
              e = new w()
            }
            return (m[t] = e), e
          }),
          (M.prototype._verify1 = function (t) {
            r(0 === t.negative, 'red works only with positives'),
              r(t.red, 'red works only with red numbers')
          }),
          (M.prototype._verify2 = function (t, e) {
            r(0 == (t.negative | e.negative), 'red works only with positives'),
              r(t.red && t.red === e.red, 'red works only with red numbers')
          }),
          (M.prototype.imod = function (t) {
            return this.prime
              ? this.prime.ireduce(t)._forceRed(this)
              : t.umod(this.m)._forceRed(this)
          }),
          (M.prototype.neg = function (t) {
            return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this)
          }),
          (M.prototype.add = function (t, e) {
            this._verify2(t, e)
            var r = t.add(e)
            return r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this)
          }),
          (M.prototype.iadd = function (t, e) {
            this._verify2(t, e)
            var r = t.iadd(e)
            return r.cmp(this.m) >= 0 && r.isub(this.m), r
          }),
          (M.prototype.sub = function (t, e) {
            this._verify2(t, e)
            var r = t.sub(e)
            return r.cmpn(0) < 0 && r.iadd(this.m), r._forceRed(this)
          }),
          (M.prototype.isub = function (t, e) {
            this._verify2(t, e)
            var r = t.isub(e)
            return r.cmpn(0) < 0 && r.iadd(this.m), r
          }),
          (M.prototype.shl = function (t, e) {
            return this._verify1(t), this.imod(t.ushln(e))
          }),
          (M.prototype.imul = function (t, e) {
            return this._verify2(t, e), this.imod(t.imul(e))
          }),
          (M.prototype.mul = function (t, e) {
            return this._verify2(t, e), this.imod(t.mul(e))
          }),
          (M.prototype.isqr = function (t) {
            return this.imul(t, t.clone())
          }),
          (M.prototype.sqr = function (t) {
            return this.mul(t, t)
          }),
          (M.prototype.sqrt = function (t) {
            if (t.isZero()) return t.clone()
            var e = this.m.andln(3)
            if ((r(e % 2 == 1), 3 === e)) {
              var i = this.m.add(new n(1)).iushrn(2)
              return this.pow(t, i)
            }
            for (
              var o = this.m.subn(1), s = 0;
              !o.isZero() && 0 === o.andln(1);

            )
              s++, o.iushrn(1)
            r(!o.isZero())
            var a = new n(1).toRed(this),
              h = a.redNeg(),
              u = this.m.subn(1).iushrn(1),
              f = this.m.bitLength()
            for (
              f = new n(2 * f * f).toRed(this);
              0 !== this.pow(f, u).cmp(h);

            )
              f.redIAdd(h)
            for (
              var d = this.pow(f, o),
                l = this.pow(t, o.addn(1).iushrn(1)),
                c = this.pow(t, o),
                p = s;
              0 !== c.cmp(a);

            ) {
              for (var m = c, b = 0; 0 !== m.cmp(a); b++) m = m.redSqr()
              r(b < p)
              var g = this.pow(d, new n(1).iushln(p - b - 1))
              ;(l = l.redMul(g)), (d = g.redSqr()), (c = c.redMul(d)), (p = b)
            }
            return l
          }),
          (M.prototype.invm = function (t) {
            var e = t._invmp(this.m)
            return 0 !== e.negative
              ? ((e.negative = 0), this.imod(e).redNeg())
              : this.imod(e)
          }),
          (M.prototype.pow = function (t, e) {
            if (e.isZero()) return new n(1)
            if (0 === e.cmpn(1)) return t.clone()
            var r = new Array(16)
            ;(r[0] = new n(1).toRed(this)), (r[1] = t)
            for (var i = 2; i < r.length; i++) r[i] = this.mul(r[i - 1], t)
            var o = r[0],
              s = 0,
              a = 0,
              h = e.bitLength() % 26
            for (0 === h && (h = 26), i = e.length - 1; i >= 0; i--) {
              for (var u = e.words[i], f = h - 1; f >= 0; f--) {
                var d = (u >> f) & 1
                o !== r[0] && (o = this.sqr(o)),
                  0 !== d || 0 !== s
                    ? ((s <<= 1),
                      (s |= d),
                      (4 == ++a || (0 === i && 0 === f)) &&
                        ((o = this.mul(o, r[s])), (a = 0), (s = 0)))
                    : (a = 0)
              }
              h = 26
            }
            return o
          }),
          (M.prototype.convertTo = function (t) {
            var e = t.umod(this.m)
            return e === t ? e.clone() : e
          }),
          (M.prototype.convertFrom = function (t) {
            var e = t.clone()
            return (e.red = null), e
          }),
          (n.mont = function (t) {
            return new _(t)
          }),
          i(_, M),
          (_.prototype.convertTo = function (t) {
            return this.imod(t.ushln(this.shift))
          }),
          (_.prototype.convertFrom = function (t) {
            var e = this.imod(t.mul(this.rinv))
            return (e.red = null), e
          }),
          (_.prototype.imul = function (t, e) {
            if (t.isZero() || e.isZero())
              return (t.words[0] = 0), (t.length = 1), t
            var r = t.imul(e),
              i = r
                .maskn(this.shift)
                .mul(this.minv)
                .imaskn(this.shift)
                .mul(this.m),
              n = r.isub(i).iushrn(this.shift),
              o = n
            return (
              n.cmp(this.m) >= 0
                ? (o = n.isub(this.m))
                : n.cmpn(0) < 0 && (o = n.iadd(this.m)),
              o._forceRed(this)
            )
          }),
          (_.prototype.mul = function (t, e) {
            if (t.isZero() || e.isZero()) return new n(0)._forceRed(this)
            var r = t.mul(e),
              i = r
                .maskn(this.shift)
                .mul(this.minv)
                .imaskn(this.shift)
                .mul(this.m),
              o = r.isub(i).iushrn(this.shift),
              s = o
            return (
              o.cmp(this.m) >= 0
                ? (s = o.isub(this.m))
                : o.cmpn(0) < 0 && (s = o.iadd(this.m)),
              s._forceRed(this)
            )
          }),
          (_.prototype.invm = function (t) {
            return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this)
          })
      })(t, ft)
    }),
      new ct(0),
      new ct(-1)
    var pt = dt(function (t) {
      !(function (t, e) {
        function r(t, e) {
          if (!t) throw new Error(e || 'Assertion failed')
        }
        function i(t, e) {
          t.super_ = e
          var r = function () {}
          ;(r.prototype = e.prototype),
            (t.prototype = new r()),
            (t.prototype.constructor = t)
        }
        function n(t, e, r) {
          if (n.isBN(t)) return t
          ;(this.negative = 0),
            (this.words = null),
            (this.length = 0),
            (this.red = null),
            null !== t &&
              (('le' !== e && 'be' !== e) || ((r = e), (e = 10)),
              this._init(t || 0, e || 10, r || 'be'))
        }
        var o
        'object' == typeof t ? (t.exports = n) : (e.BN = n),
          (n.BN = n),
          (n.wordSize = 26)
        try {
          o =
            'undefined' != typeof window && void 0 !== window.Buffer
              ? window.Buffer
              : P.default.Buffer
        } catch (t) {}
        function s(t, e) {
          var r = t.charCodeAt(e)
          return r >= 65 && r <= 70
            ? r - 55
            : r >= 97 && r <= 102
            ? r - 87
            : (r - 48) & 15
        }
        function a(t, e, r) {
          var i = s(t, r)
          return r - 1 >= e && (i |= s(t, r - 1) << 4), i
        }
        function h(t, e, r, i) {
          for (var n = 0, o = Math.min(t.length, r), s = e; s < o; s++) {
            var a = t.charCodeAt(s) - 48
            ;(n *= i), (n += a >= 49 ? a - 49 + 10 : a >= 17 ? a - 17 + 10 : a)
          }
          return n
        }
        ;(n.isBN = function (t) {
          return (
            t instanceof n ||
            (null !== t &&
              'object' == typeof t &&
              t.constructor.wordSize === n.wordSize &&
              Array.isArray(t.words))
          )
        }),
          (n.max = function (t, e) {
            return t.cmp(e) > 0 ? t : e
          }),
          (n.min = function (t, e) {
            return t.cmp(e) < 0 ? t : e
          }),
          (n.prototype._init = function (t, e, i) {
            if ('number' == typeof t) return this._initNumber(t, e, i)
            if ('object' == typeof t) return this._initArray(t, e, i)
            'hex' === e && (e = 16), r(e === (0 | e) && e >= 2 && e <= 36)
            var n = 0
            '-' === (t = t.toString().replace(/\s+/g, ''))[0] &&
              (n++, (this.negative = 1)),
              n < t.length &&
                (16 === e
                  ? this._parseHex(t, n, i)
                  : (this._parseBase(t, e, n),
                    'le' === i && this._initArray(this.toArray(), e, i)))
          }),
          (n.prototype._initNumber = function (t, e, i) {
            t < 0 && ((this.negative = 1), (t = -t)),
              t < 67108864
                ? ((this.words = [67108863 & t]), (this.length = 1))
                : t < 4503599627370496
                ? ((this.words = [67108863 & t, (t / 67108864) & 67108863]),
                  (this.length = 2))
                : (r(t < 9007199254740992),
                  (this.words = [67108863 & t, (t / 67108864) & 67108863, 1]),
                  (this.length = 3)),
              'le' === i && this._initArray(this.toArray(), e, i)
          }),
          (n.prototype._initArray = function (t, e, i) {
            if ((r('number' == typeof t.length), t.length <= 0))
              return (this.words = [0]), (this.length = 1), this
            ;(this.length = Math.ceil(t.length / 3)),
              (this.words = new Array(this.length))
            for (var n = 0; n < this.length; n++) this.words[n] = 0
            var o,
              s,
              a = 0
            if ('be' === i)
              for (n = t.length - 1, o = 0; n >= 0; n -= 3)
                (this.words[o] |=
                  ((s = t[n] | (t[n - 1] << 8) | (t[n - 2] << 16)) << a) &
                  67108863),
                  (this.words[o + 1] = (s >>> (26 - a)) & 67108863),
                  (a += 24) >= 26 && ((a -= 26), o++)
            else if ('le' === i)
              for (n = 0, o = 0; n < t.length; n += 3)
                (this.words[o] |=
                  ((s = t[n] | (t[n + 1] << 8) | (t[n + 2] << 16)) << a) &
                  67108863),
                  (this.words[o + 1] = (s >>> (26 - a)) & 67108863),
                  (a += 24) >= 26 && ((a -= 26), o++)
            return this.strip()
          }),
          (n.prototype._parseHex = function (t, e, r) {
            ;(this.length = Math.ceil((t.length - e) / 6)),
              (this.words = new Array(this.length))
            for (var i = 0; i < this.length; i++) this.words[i] = 0
            var n,
              o = 0,
              s = 0
            if ('be' === r)
              for (i = t.length - 1; i >= e; i -= 2)
                (n = a(t, e, i) << o),
                  (this.words[s] |= 67108863 & n),
                  o >= 18
                    ? ((o -= 18), (this.words[(s += 1)] |= n >>> 26))
                    : (o += 8)
            else
              for (
                i = (t.length - e) % 2 == 0 ? e + 1 : e;
                i < t.length;
                i += 2
              )
                (n = a(t, e, i) << o),
                  (this.words[s] |= 67108863 & n),
                  o >= 18
                    ? ((o -= 18), (this.words[(s += 1)] |= n >>> 26))
                    : (o += 8)
            this.strip()
          }),
          (n.prototype._parseBase = function (t, e, r) {
            ;(this.words = [0]), (this.length = 1)
            for (var i = 0, n = 1; n <= 67108863; n *= e) i++
            i--, (n = (n / e) | 0)
            for (
              var o = t.length - r,
                s = o % i,
                a = Math.min(o, o - s) + r,
                u = 0,
                f = r;
              f < a;
              f += i
            )
              (u = h(t, f, f + i, e)),
                this.imuln(n),
                this.words[0] + u < 67108864
                  ? (this.words[0] += u)
                  : this._iaddn(u)
            if (0 !== s) {
              var d = 1
              for (u = h(t, f, t.length, e), f = 0; f < s; f++) d *= e
              this.imuln(d),
                this.words[0] + u < 67108864
                  ? (this.words[0] += u)
                  : this._iaddn(u)
            }
            this.strip()
          }),
          (n.prototype.copy = function (t) {
            t.words = new Array(this.length)
            for (var e = 0; e < this.length; e++) t.words[e] = this.words[e]
            ;(t.length = this.length),
              (t.negative = this.negative),
              (t.red = this.red)
          }),
          (n.prototype.clone = function () {
            var t = new n(null)
            return this.copy(t), t
          }),
          (n.prototype._expand = function (t) {
            for (; this.length < t; ) this.words[this.length++] = 0
            return this
          }),
          (n.prototype.strip = function () {
            for (; this.length > 1 && 0 === this.words[this.length - 1]; )
              this.length--
            return this._normSign()
          }),
          (n.prototype._normSign = function () {
            return (
              1 === this.length && 0 === this.words[0] && (this.negative = 0),
              this
            )
          }),
          (n.prototype.inspect = function () {
            return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>'
          })
        var u = [
            '',
            '0',
            '00',
            '000',
            '0000',
            '00000',
            '000000',
            '0000000',
            '00000000',
            '000000000',
            '0000000000',
            '00000000000',
            '000000000000',
            '0000000000000',
            '00000000000000',
            '000000000000000',
            '0000000000000000',
            '00000000000000000',
            '000000000000000000',
            '0000000000000000000',
            '00000000000000000000',
            '000000000000000000000',
            '0000000000000000000000',
            '00000000000000000000000',
            '000000000000000000000000',
            '0000000000000000000000000'
          ],
          f = [
            0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6,
            5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
          ],
          d = [
            0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607,
            16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536,
            11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101,
            5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368,
            20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875,
            60466176
          ]
        function l(t, e, r) {
          r.negative = e.negative ^ t.negative
          var i = (t.length + e.length) | 0
          ;(r.length = i), (i = (i - 1) | 0)
          var n = 0 | t.words[0],
            o = 0 | e.words[0],
            s = n * o,
            a = (s / 67108864) | 0
          r.words[0] = 67108863 & s
          for (var h = 1; h < i; h++) {
            for (
              var u = a >>> 26,
                f = 67108863 & a,
                d = Math.min(h, e.length - 1),
                l = Math.max(0, h - t.length + 1);
              l <= d;
              l++
            )
              (u +=
                ((s =
                  (n = 0 | t.words[(h - l) | 0]) * (o = 0 | e.words[l]) + f) /
                  67108864) |
                0),
                (f = 67108863 & s)
            ;(r.words[h] = 0 | f), (a = 0 | u)
          }
          return 0 !== a ? (r.words[h] = 0 | a) : r.length--, r.strip()
        }
        ;(n.prototype.toString = function (t, e) {
          var i
          if (((e = 0 | e || 1), 16 === (t = t || 10) || 'hex' === t)) {
            i = ''
            for (var n = 0, o = 0, s = 0; s < this.length; s++) {
              var a = this.words[s],
                h = (16777215 & ((a << n) | o)).toString(16)
              ;(i =
                0 != (o = (a >>> (24 - n)) & 16777215) || s !== this.length - 1
                  ? u[6 - h.length] + h + i
                  : h + i),
                (n += 2) >= 26 && ((n -= 26), s--)
            }
            for (0 !== o && (i = o.toString(16) + i); i.length % e != 0; )
              i = '0' + i
            return 0 !== this.negative && (i = '-' + i), i
          }
          if (t === (0 | t) && t >= 2 && t <= 36) {
            var l = f[t],
              c = d[t]
            i = ''
            var p = this.clone()
            for (p.negative = 0; !p.isZero(); ) {
              var m = p.modn(c).toString(t)
              i = (p = p.idivn(c)).isZero() ? m + i : u[l - m.length] + m + i
            }
            for (this.isZero() && (i = '0' + i); i.length % e != 0; )
              i = '0' + i
            return 0 !== this.negative && (i = '-' + i), i
          }
          r(!1, 'Base should be between 2 and 36')
        }),
          (n.prototype.toNumber = function () {
            var t = this.words[0]
            return (
              2 === this.length
                ? (t += 67108864 * this.words[1])
                : 3 === this.length && 1 === this.words[2]
                ? (t += 4503599627370496 + 67108864 * this.words[1])
                : this.length > 2 &&
                  r(!1, 'Number can only safely store up to 53 bits'),
              0 !== this.negative ? -t : t
            )
          }),
          (n.prototype.toJSON = function () {
            return this.toString(16)
          }),
          (n.prototype.toBuffer = function (t, e) {
            return r(void 0 !== o), this.toArrayLike(o, t, e)
          }),
          (n.prototype.toArray = function (t, e) {
            return this.toArrayLike(Array, t, e)
          }),
          (n.prototype.toArrayLike = function (t, e, i) {
            var n = this.byteLength(),
              o = i || Math.max(1, n)
            r(n <= o, 'byte array longer than desired length'),
              r(o > 0, 'Requested array length <= 0'),
              this.strip()
            var s,
              a,
              h = 'le' === e,
              u = new t(o),
              f = this.clone()
            if (h) {
              for (a = 0; !f.isZero(); a++)
                (s = f.andln(255)), f.iushrn(8), (u[a] = s)
              for (; a < o; a++) u[a] = 0
            } else {
              for (a = 0; a < o - n; a++) u[a] = 0
              for (a = 0; !f.isZero(); a++)
                (s = f.andln(255)), f.iushrn(8), (u[o - a - 1] = s)
            }
            return u
          }),
          (n.prototype._countBits = Math.clz32
            ? function (t) {
                return 32 - Math.clz32(t)
              }
            : function (t) {
                var e = t,
                  r = 0
                return (
                  e >= 4096 && ((r += 13), (e >>>= 13)),
                  e >= 64 && ((r += 7), (e >>>= 7)),
                  e >= 8 && ((r += 4), (e >>>= 4)),
                  e >= 2 && ((r += 2), (e >>>= 2)),
                  r + e
                )
              }),
          (n.prototype._zeroBits = function (t) {
            if (0 === t) return 26
            var e = t,
              r = 0
            return (
              0 == (8191 & e) && ((r += 13), (e >>>= 13)),
              0 == (127 & e) && ((r += 7), (e >>>= 7)),
              0 == (15 & e) && ((r += 4), (e >>>= 4)),
              0 == (3 & e) && ((r += 2), (e >>>= 2)),
              0 == (1 & e) && r++,
              r
            )
          }),
          (n.prototype.bitLength = function () {
            var t = this._countBits(this.words[this.length - 1])
            return 26 * (this.length - 1) + t
          }),
          (n.prototype.zeroBits = function () {
            if (this.isZero()) return 0
            for (var t = 0, e = 0; e < this.length; e++) {
              var r = this._zeroBits(this.words[e])
              if (((t += r), 26 !== r)) break
            }
            return t
          }),
          (n.prototype.byteLength = function () {
            return Math.ceil(this.bitLength() / 8)
          }),
          (n.prototype.toTwos = function (t) {
            return 0 !== this.negative
              ? this.abs().inotn(t).iaddn(1)
              : this.clone()
          }),
          (n.prototype.fromTwos = function (t) {
            return this.testn(t - 1)
              ? this.notn(t).iaddn(1).ineg()
              : this.clone()
          }),
          (n.prototype.isNeg = function () {
            return 0 !== this.negative
          }),
          (n.prototype.neg = function () {
            return this.clone().ineg()
          }),
          (n.prototype.ineg = function () {
            return this.isZero() || (this.negative ^= 1), this
          }),
          (n.prototype.iuor = function (t) {
            for (; this.length < t.length; ) this.words[this.length++] = 0
            for (var e = 0; e < t.length; e++)
              this.words[e] = this.words[e] | t.words[e]
            return this.strip()
          }),
          (n.prototype.ior = function (t) {
            return r(0 == (this.negative | t.negative)), this.iuor(t)
          }),
          (n.prototype.or = function (t) {
            return this.length > t.length
              ? this.clone().ior(t)
              : t.clone().ior(this)
          }),
          (n.prototype.uor = function (t) {
            return this.length > t.length
              ? this.clone().iuor(t)
              : t.clone().iuor(this)
          }),
          (n.prototype.iuand = function (t) {
            var e
            e = this.length > t.length ? t : this
            for (var r = 0; r < e.length; r++)
              this.words[r] = this.words[r] & t.words[r]
            return (this.length = e.length), this.strip()
          }),
          (n.prototype.iand = function (t) {
            return r(0 == (this.negative | t.negative)), this.iuand(t)
          }),
          (n.prototype.and = function (t) {
            return this.length > t.length
              ? this.clone().iand(t)
              : t.clone().iand(this)
          }),
          (n.prototype.uand = function (t) {
            return this.length > t.length
              ? this.clone().iuand(t)
              : t.clone().iuand(this)
          }),
          (n.prototype.iuxor = function (t) {
            var e, r
            this.length > t.length
              ? ((e = this), (r = t))
              : ((e = t), (r = this))
            for (var i = 0; i < r.length; i++)
              this.words[i] = e.words[i] ^ r.words[i]
            if (this !== e) for (; i < e.length; i++) this.words[i] = e.words[i]
            return (this.length = e.length), this.strip()
          }),
          (n.prototype.ixor = function (t) {
            return r(0 == (this.negative | t.negative)), this.iuxor(t)
          }),
          (n.prototype.xor = function (t) {
            return this.length > t.length
              ? this.clone().ixor(t)
              : t.clone().ixor(this)
          }),
          (n.prototype.uxor = function (t) {
            return this.length > t.length
              ? this.clone().iuxor(t)
              : t.clone().iuxor(this)
          }),
          (n.prototype.inotn = function (t) {
            r('number' == typeof t && t >= 0)
            var e = 0 | Math.ceil(t / 26),
              i = t % 26
            this._expand(e), i > 0 && e--
            for (var n = 0; n < e; n++)
              this.words[n] = 67108863 & ~this.words[n]
            return (
              i > 0 &&
                (this.words[n] = ~this.words[n] & (67108863 >> (26 - i))),
              this.strip()
            )
          }),
          (n.prototype.notn = function (t) {
            return this.clone().inotn(t)
          }),
          (n.prototype.setn = function (t, e) {
            r('number' == typeof t && t >= 0)
            var i = (t / 26) | 0,
              n = t % 26
            return (
              this._expand(i + 1),
              (this.words[i] = e
                ? this.words[i] | (1 << n)
                : this.words[i] & ~(1 << n)),
              this.strip()
            )
          }),
          (n.prototype.iadd = function (t) {
            var e, r, i
            if (0 !== this.negative && 0 === t.negative)
              return (
                (this.negative = 0),
                (e = this.isub(t)),
                (this.negative ^= 1),
                this._normSign()
              )
            if (0 === this.negative && 0 !== t.negative)
              return (
                (t.negative = 0),
                (e = this.isub(t)),
                (t.negative = 1),
                e._normSign()
              )
            this.length > t.length
              ? ((r = this), (i = t))
              : ((r = t), (i = this))
            for (var n = 0, o = 0; o < i.length; o++)
              (this.words[o] =
                67108863 & (e = (0 | r.words[o]) + (0 | i.words[o]) + n)),
                (n = e >>> 26)
            for (; 0 !== n && o < r.length; o++)
              (this.words[o] = 67108863 & (e = (0 | r.words[o]) + n)),
                (n = e >>> 26)
            if (((this.length = r.length), 0 !== n))
              (this.words[this.length] = n), this.length++
            else if (r !== this)
              for (; o < r.length; o++) this.words[o] = r.words[o]
            return this
          }),
          (n.prototype.add = function (t) {
            var e
            return 0 !== t.negative && 0 === this.negative
              ? ((t.negative = 0), (e = this.sub(t)), (t.negative ^= 1), e)
              : 0 === t.negative && 0 !== this.negative
              ? ((this.negative = 0), (e = t.sub(this)), (this.negative = 1), e)
              : this.length > t.length
              ? this.clone().iadd(t)
              : t.clone().iadd(this)
          }),
          (n.prototype.isub = function (t) {
            if (0 !== t.negative) {
              t.negative = 0
              var e = this.iadd(t)
              return (t.negative = 1), e._normSign()
            }
            if (0 !== this.negative)
              return (
                (this.negative = 0),
                this.iadd(t),
                (this.negative = 1),
                this._normSign()
              )
            var r,
              i,
              n = this.cmp(t)
            if (0 === n)
              return (
                (this.negative = 0),
                (this.length = 1),
                (this.words[0] = 0),
                this
              )
            n > 0 ? ((r = this), (i = t)) : ((r = t), (i = this))
            for (var o = 0, s = 0; s < i.length; s++)
              (o = (e = (0 | r.words[s]) - (0 | i.words[s]) + o) >> 26),
                (this.words[s] = 67108863 & e)
            for (; 0 !== o && s < r.length; s++)
              (o = (e = (0 | r.words[s]) + o) >> 26),
                (this.words[s] = 67108863 & e)
            if (0 === o && s < r.length && r !== this)
              for (; s < r.length; s++) this.words[s] = r.words[s]
            return (
              (this.length = Math.max(this.length, s)),
              r !== this && (this.negative = 1),
              this.strip()
            )
          }),
          (n.prototype.sub = function (t) {
            return this.clone().isub(t)
          })
        var c = function (t, e, r) {
          var i,
            n,
            o,
            s = t.words,
            a = e.words,
            h = r.words,
            u = 0,
            f = 0 | s[0],
            d = 8191 & f,
            l = f >>> 13,
            c = 0 | s[1],
            p = 8191 & c,
            m = c >>> 13,
            b = 0 | s[2],
            g = 8191 & b,
            v = b >>> 13,
            y = 0 | s[3],
            w = 8191 & y,
            M = y >>> 13,
            _ = 0 | s[4],
            S = 8191 & _,
            A = _ >>> 13,
            k = 0 | s[5],
            x = 8191 & k,
            E = k >>> 13,
            R = 0 | s[6],
            B = 8191 & R,
            I = R >>> 13,
            N = 0 | s[7],
            T = 8191 & N,
            P = N >>> 13,
            O = 0 | s[8],
            q = 8191 & O,
            L = O >>> 13,
            z = 0 | s[9],
            j = 8191 & z,
            C = z >>> 13,
            U = 0 | a[0],
            D = 8191 & U,
            Z = U >>> 13,
            F = 0 | a[1],
            K = 8191 & F,
            H = F >>> 13,
            V = 0 | a[2],
            $ = 8191 & V,
            W = V >>> 13,
            J = 0 | a[3],
            G = 8191 & J,
            X = J >>> 13,
            Y = 0 | a[4],
            Q = 8191 & Y,
            tt = Y >>> 13,
            et = 0 | a[5],
            rt = 8191 & et,
            it = et >>> 13,
            nt = 0 | a[6],
            ot = 8191 & nt,
            st = nt >>> 13,
            at = 0 | a[7],
            ht = 8191 & at,
            ut = at >>> 13,
            ft = 0 | a[8],
            dt = 8191 & ft,
            lt = ft >>> 13,
            ct = 0 | a[9],
            pt = 8191 & ct,
            mt = ct >>> 13
          ;(r.negative = t.negative ^ e.negative), (r.length = 19)
          var bt =
            (((u + (i = Math.imul(d, D))) | 0) +
              ((8191 & (n = ((n = Math.imul(d, Z)) + Math.imul(l, D)) | 0)) <<
                13)) |
            0
          ;(u = ((((o = Math.imul(l, Z)) + (n >>> 13)) | 0) + (bt >>> 26)) | 0),
            (bt &= 67108863),
            (i = Math.imul(p, D)),
            (n = ((n = Math.imul(p, Z)) + Math.imul(m, D)) | 0),
            (o = Math.imul(m, Z))
          var gt =
            (((u + (i = (i + Math.imul(d, K)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(d, H)) | 0) + Math.imul(l, K)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(l, H)) | 0) + (n >>> 13)) | 0) +
              (gt >>> 26)) |
            0),
            (gt &= 67108863),
            (i = Math.imul(g, D)),
            (n = ((n = Math.imul(g, Z)) + Math.imul(v, D)) | 0),
            (o = Math.imul(v, Z)),
            (i = (i + Math.imul(p, K)) | 0),
            (n = ((n = (n + Math.imul(p, H)) | 0) + Math.imul(m, K)) | 0),
            (o = (o + Math.imul(m, H)) | 0)
          var vt =
            (((u + (i = (i + Math.imul(d, $)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(d, W)) | 0) + Math.imul(l, $)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(l, W)) | 0) + (n >>> 13)) | 0) +
              (vt >>> 26)) |
            0),
            (vt &= 67108863),
            (i = Math.imul(w, D)),
            (n = ((n = Math.imul(w, Z)) + Math.imul(M, D)) | 0),
            (o = Math.imul(M, Z)),
            (i = (i + Math.imul(g, K)) | 0),
            (n = ((n = (n + Math.imul(g, H)) | 0) + Math.imul(v, K)) | 0),
            (o = (o + Math.imul(v, H)) | 0),
            (i = (i + Math.imul(p, $)) | 0),
            (n = ((n = (n + Math.imul(p, W)) | 0) + Math.imul(m, $)) | 0),
            (o = (o + Math.imul(m, W)) | 0)
          var yt =
            (((u + (i = (i + Math.imul(d, G)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(d, X)) | 0) + Math.imul(l, G)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(l, X)) | 0) + (n >>> 13)) | 0) +
              (yt >>> 26)) |
            0),
            (yt &= 67108863),
            (i = Math.imul(S, D)),
            (n = ((n = Math.imul(S, Z)) + Math.imul(A, D)) | 0),
            (o = Math.imul(A, Z)),
            (i = (i + Math.imul(w, K)) | 0),
            (n = ((n = (n + Math.imul(w, H)) | 0) + Math.imul(M, K)) | 0),
            (o = (o + Math.imul(M, H)) | 0),
            (i = (i + Math.imul(g, $)) | 0),
            (n = ((n = (n + Math.imul(g, W)) | 0) + Math.imul(v, $)) | 0),
            (o = (o + Math.imul(v, W)) | 0),
            (i = (i + Math.imul(p, G)) | 0),
            (n = ((n = (n + Math.imul(p, X)) | 0) + Math.imul(m, G)) | 0),
            (o = (o + Math.imul(m, X)) | 0)
          var wt =
            (((u + (i = (i + Math.imul(d, Q)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(d, tt)) | 0) + Math.imul(l, Q)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(l, tt)) | 0) + (n >>> 13)) | 0) +
              (wt >>> 26)) |
            0),
            (wt &= 67108863),
            (i = Math.imul(x, D)),
            (n = ((n = Math.imul(x, Z)) + Math.imul(E, D)) | 0),
            (o = Math.imul(E, Z)),
            (i = (i + Math.imul(S, K)) | 0),
            (n = ((n = (n + Math.imul(S, H)) | 0) + Math.imul(A, K)) | 0),
            (o = (o + Math.imul(A, H)) | 0),
            (i = (i + Math.imul(w, $)) | 0),
            (n = ((n = (n + Math.imul(w, W)) | 0) + Math.imul(M, $)) | 0),
            (o = (o + Math.imul(M, W)) | 0),
            (i = (i + Math.imul(g, G)) | 0),
            (n = ((n = (n + Math.imul(g, X)) | 0) + Math.imul(v, G)) | 0),
            (o = (o + Math.imul(v, X)) | 0),
            (i = (i + Math.imul(p, Q)) | 0),
            (n = ((n = (n + Math.imul(p, tt)) | 0) + Math.imul(m, Q)) | 0),
            (o = (o + Math.imul(m, tt)) | 0)
          var Mt =
            (((u + (i = (i + Math.imul(d, rt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(d, it)) | 0) + Math.imul(l, rt)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(l, it)) | 0) + (n >>> 13)) | 0) +
              (Mt >>> 26)) |
            0),
            (Mt &= 67108863),
            (i = Math.imul(B, D)),
            (n = ((n = Math.imul(B, Z)) + Math.imul(I, D)) | 0),
            (o = Math.imul(I, Z)),
            (i = (i + Math.imul(x, K)) | 0),
            (n = ((n = (n + Math.imul(x, H)) | 0) + Math.imul(E, K)) | 0),
            (o = (o + Math.imul(E, H)) | 0),
            (i = (i + Math.imul(S, $)) | 0),
            (n = ((n = (n + Math.imul(S, W)) | 0) + Math.imul(A, $)) | 0),
            (o = (o + Math.imul(A, W)) | 0),
            (i = (i + Math.imul(w, G)) | 0),
            (n = ((n = (n + Math.imul(w, X)) | 0) + Math.imul(M, G)) | 0),
            (o = (o + Math.imul(M, X)) | 0),
            (i = (i + Math.imul(g, Q)) | 0),
            (n = ((n = (n + Math.imul(g, tt)) | 0) + Math.imul(v, Q)) | 0),
            (o = (o + Math.imul(v, tt)) | 0),
            (i = (i + Math.imul(p, rt)) | 0),
            (n = ((n = (n + Math.imul(p, it)) | 0) + Math.imul(m, rt)) | 0),
            (o = (o + Math.imul(m, it)) | 0)
          var _t =
            (((u + (i = (i + Math.imul(d, ot)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(d, st)) | 0) + Math.imul(l, ot)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(l, st)) | 0) + (n >>> 13)) | 0) +
              (_t >>> 26)) |
            0),
            (_t &= 67108863),
            (i = Math.imul(T, D)),
            (n = ((n = Math.imul(T, Z)) + Math.imul(P, D)) | 0),
            (o = Math.imul(P, Z)),
            (i = (i + Math.imul(B, K)) | 0),
            (n = ((n = (n + Math.imul(B, H)) | 0) + Math.imul(I, K)) | 0),
            (o = (o + Math.imul(I, H)) | 0),
            (i = (i + Math.imul(x, $)) | 0),
            (n = ((n = (n + Math.imul(x, W)) | 0) + Math.imul(E, $)) | 0),
            (o = (o + Math.imul(E, W)) | 0),
            (i = (i + Math.imul(S, G)) | 0),
            (n = ((n = (n + Math.imul(S, X)) | 0) + Math.imul(A, G)) | 0),
            (o = (o + Math.imul(A, X)) | 0),
            (i = (i + Math.imul(w, Q)) | 0),
            (n = ((n = (n + Math.imul(w, tt)) | 0) + Math.imul(M, Q)) | 0),
            (o = (o + Math.imul(M, tt)) | 0),
            (i = (i + Math.imul(g, rt)) | 0),
            (n = ((n = (n + Math.imul(g, it)) | 0) + Math.imul(v, rt)) | 0),
            (o = (o + Math.imul(v, it)) | 0),
            (i = (i + Math.imul(p, ot)) | 0),
            (n = ((n = (n + Math.imul(p, st)) | 0) + Math.imul(m, ot)) | 0),
            (o = (o + Math.imul(m, st)) | 0)
          var St =
            (((u + (i = (i + Math.imul(d, ht)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(d, ut)) | 0) + Math.imul(l, ht)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(l, ut)) | 0) + (n >>> 13)) | 0) +
              (St >>> 26)) |
            0),
            (St &= 67108863),
            (i = Math.imul(q, D)),
            (n = ((n = Math.imul(q, Z)) + Math.imul(L, D)) | 0),
            (o = Math.imul(L, Z)),
            (i = (i + Math.imul(T, K)) | 0),
            (n = ((n = (n + Math.imul(T, H)) | 0) + Math.imul(P, K)) | 0),
            (o = (o + Math.imul(P, H)) | 0),
            (i = (i + Math.imul(B, $)) | 0),
            (n = ((n = (n + Math.imul(B, W)) | 0) + Math.imul(I, $)) | 0),
            (o = (o + Math.imul(I, W)) | 0),
            (i = (i + Math.imul(x, G)) | 0),
            (n = ((n = (n + Math.imul(x, X)) | 0) + Math.imul(E, G)) | 0),
            (o = (o + Math.imul(E, X)) | 0),
            (i = (i + Math.imul(S, Q)) | 0),
            (n = ((n = (n + Math.imul(S, tt)) | 0) + Math.imul(A, Q)) | 0),
            (o = (o + Math.imul(A, tt)) | 0),
            (i = (i + Math.imul(w, rt)) | 0),
            (n = ((n = (n + Math.imul(w, it)) | 0) + Math.imul(M, rt)) | 0),
            (o = (o + Math.imul(M, it)) | 0),
            (i = (i + Math.imul(g, ot)) | 0),
            (n = ((n = (n + Math.imul(g, st)) | 0) + Math.imul(v, ot)) | 0),
            (o = (o + Math.imul(v, st)) | 0),
            (i = (i + Math.imul(p, ht)) | 0),
            (n = ((n = (n + Math.imul(p, ut)) | 0) + Math.imul(m, ht)) | 0),
            (o = (o + Math.imul(m, ut)) | 0)
          var At =
            (((u + (i = (i + Math.imul(d, dt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(d, lt)) | 0) + Math.imul(l, dt)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(l, lt)) | 0) + (n >>> 13)) | 0) +
              (At >>> 26)) |
            0),
            (At &= 67108863),
            (i = Math.imul(j, D)),
            (n = ((n = Math.imul(j, Z)) + Math.imul(C, D)) | 0),
            (o = Math.imul(C, Z)),
            (i = (i + Math.imul(q, K)) | 0),
            (n = ((n = (n + Math.imul(q, H)) | 0) + Math.imul(L, K)) | 0),
            (o = (o + Math.imul(L, H)) | 0),
            (i = (i + Math.imul(T, $)) | 0),
            (n = ((n = (n + Math.imul(T, W)) | 0) + Math.imul(P, $)) | 0),
            (o = (o + Math.imul(P, W)) | 0),
            (i = (i + Math.imul(B, G)) | 0),
            (n = ((n = (n + Math.imul(B, X)) | 0) + Math.imul(I, G)) | 0),
            (o = (o + Math.imul(I, X)) | 0),
            (i = (i + Math.imul(x, Q)) | 0),
            (n = ((n = (n + Math.imul(x, tt)) | 0) + Math.imul(E, Q)) | 0),
            (o = (o + Math.imul(E, tt)) | 0),
            (i = (i + Math.imul(S, rt)) | 0),
            (n = ((n = (n + Math.imul(S, it)) | 0) + Math.imul(A, rt)) | 0),
            (o = (o + Math.imul(A, it)) | 0),
            (i = (i + Math.imul(w, ot)) | 0),
            (n = ((n = (n + Math.imul(w, st)) | 0) + Math.imul(M, ot)) | 0),
            (o = (o + Math.imul(M, st)) | 0),
            (i = (i + Math.imul(g, ht)) | 0),
            (n = ((n = (n + Math.imul(g, ut)) | 0) + Math.imul(v, ht)) | 0),
            (o = (o + Math.imul(v, ut)) | 0),
            (i = (i + Math.imul(p, dt)) | 0),
            (n = ((n = (n + Math.imul(p, lt)) | 0) + Math.imul(m, dt)) | 0),
            (o = (o + Math.imul(m, lt)) | 0)
          var kt =
            (((u + (i = (i + Math.imul(d, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(d, mt)) | 0) + Math.imul(l, pt)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(l, mt)) | 0) + (n >>> 13)) | 0) +
              (kt >>> 26)) |
            0),
            (kt &= 67108863),
            (i = Math.imul(j, K)),
            (n = ((n = Math.imul(j, H)) + Math.imul(C, K)) | 0),
            (o = Math.imul(C, H)),
            (i = (i + Math.imul(q, $)) | 0),
            (n = ((n = (n + Math.imul(q, W)) | 0) + Math.imul(L, $)) | 0),
            (o = (o + Math.imul(L, W)) | 0),
            (i = (i + Math.imul(T, G)) | 0),
            (n = ((n = (n + Math.imul(T, X)) | 0) + Math.imul(P, G)) | 0),
            (o = (o + Math.imul(P, X)) | 0),
            (i = (i + Math.imul(B, Q)) | 0),
            (n = ((n = (n + Math.imul(B, tt)) | 0) + Math.imul(I, Q)) | 0),
            (o = (o + Math.imul(I, tt)) | 0),
            (i = (i + Math.imul(x, rt)) | 0),
            (n = ((n = (n + Math.imul(x, it)) | 0) + Math.imul(E, rt)) | 0),
            (o = (o + Math.imul(E, it)) | 0),
            (i = (i + Math.imul(S, ot)) | 0),
            (n = ((n = (n + Math.imul(S, st)) | 0) + Math.imul(A, ot)) | 0),
            (o = (o + Math.imul(A, st)) | 0),
            (i = (i + Math.imul(w, ht)) | 0),
            (n = ((n = (n + Math.imul(w, ut)) | 0) + Math.imul(M, ht)) | 0),
            (o = (o + Math.imul(M, ut)) | 0),
            (i = (i + Math.imul(g, dt)) | 0),
            (n = ((n = (n + Math.imul(g, lt)) | 0) + Math.imul(v, dt)) | 0),
            (o = (o + Math.imul(v, lt)) | 0)
          var xt =
            (((u + (i = (i + Math.imul(p, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(p, mt)) | 0) + Math.imul(m, pt)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(m, mt)) | 0) + (n >>> 13)) | 0) +
              (xt >>> 26)) |
            0),
            (xt &= 67108863),
            (i = Math.imul(j, $)),
            (n = ((n = Math.imul(j, W)) + Math.imul(C, $)) | 0),
            (o = Math.imul(C, W)),
            (i = (i + Math.imul(q, G)) | 0),
            (n = ((n = (n + Math.imul(q, X)) | 0) + Math.imul(L, G)) | 0),
            (o = (o + Math.imul(L, X)) | 0),
            (i = (i + Math.imul(T, Q)) | 0),
            (n = ((n = (n + Math.imul(T, tt)) | 0) + Math.imul(P, Q)) | 0),
            (o = (o + Math.imul(P, tt)) | 0),
            (i = (i + Math.imul(B, rt)) | 0),
            (n = ((n = (n + Math.imul(B, it)) | 0) + Math.imul(I, rt)) | 0),
            (o = (o + Math.imul(I, it)) | 0),
            (i = (i + Math.imul(x, ot)) | 0),
            (n = ((n = (n + Math.imul(x, st)) | 0) + Math.imul(E, ot)) | 0),
            (o = (o + Math.imul(E, st)) | 0),
            (i = (i + Math.imul(S, ht)) | 0),
            (n = ((n = (n + Math.imul(S, ut)) | 0) + Math.imul(A, ht)) | 0),
            (o = (o + Math.imul(A, ut)) | 0),
            (i = (i + Math.imul(w, dt)) | 0),
            (n = ((n = (n + Math.imul(w, lt)) | 0) + Math.imul(M, dt)) | 0),
            (o = (o + Math.imul(M, lt)) | 0)
          var Et =
            (((u + (i = (i + Math.imul(g, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(g, mt)) | 0) + Math.imul(v, pt)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(v, mt)) | 0) + (n >>> 13)) | 0) +
              (Et >>> 26)) |
            0),
            (Et &= 67108863),
            (i = Math.imul(j, G)),
            (n = ((n = Math.imul(j, X)) + Math.imul(C, G)) | 0),
            (o = Math.imul(C, X)),
            (i = (i + Math.imul(q, Q)) | 0),
            (n = ((n = (n + Math.imul(q, tt)) | 0) + Math.imul(L, Q)) | 0),
            (o = (o + Math.imul(L, tt)) | 0),
            (i = (i + Math.imul(T, rt)) | 0),
            (n = ((n = (n + Math.imul(T, it)) | 0) + Math.imul(P, rt)) | 0),
            (o = (o + Math.imul(P, it)) | 0),
            (i = (i + Math.imul(B, ot)) | 0),
            (n = ((n = (n + Math.imul(B, st)) | 0) + Math.imul(I, ot)) | 0),
            (o = (o + Math.imul(I, st)) | 0),
            (i = (i + Math.imul(x, ht)) | 0),
            (n = ((n = (n + Math.imul(x, ut)) | 0) + Math.imul(E, ht)) | 0),
            (o = (o + Math.imul(E, ut)) | 0),
            (i = (i + Math.imul(S, dt)) | 0),
            (n = ((n = (n + Math.imul(S, lt)) | 0) + Math.imul(A, dt)) | 0),
            (o = (o + Math.imul(A, lt)) | 0)
          var Rt =
            (((u + (i = (i + Math.imul(w, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(w, mt)) | 0) + Math.imul(M, pt)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(M, mt)) | 0) + (n >>> 13)) | 0) +
              (Rt >>> 26)) |
            0),
            (Rt &= 67108863),
            (i = Math.imul(j, Q)),
            (n = ((n = Math.imul(j, tt)) + Math.imul(C, Q)) | 0),
            (o = Math.imul(C, tt)),
            (i = (i + Math.imul(q, rt)) | 0),
            (n = ((n = (n + Math.imul(q, it)) | 0) + Math.imul(L, rt)) | 0),
            (o = (o + Math.imul(L, it)) | 0),
            (i = (i + Math.imul(T, ot)) | 0),
            (n = ((n = (n + Math.imul(T, st)) | 0) + Math.imul(P, ot)) | 0),
            (o = (o + Math.imul(P, st)) | 0),
            (i = (i + Math.imul(B, ht)) | 0),
            (n = ((n = (n + Math.imul(B, ut)) | 0) + Math.imul(I, ht)) | 0),
            (o = (o + Math.imul(I, ut)) | 0),
            (i = (i + Math.imul(x, dt)) | 0),
            (n = ((n = (n + Math.imul(x, lt)) | 0) + Math.imul(E, dt)) | 0),
            (o = (o + Math.imul(E, lt)) | 0)
          var Bt =
            (((u + (i = (i + Math.imul(S, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(S, mt)) | 0) + Math.imul(A, pt)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(A, mt)) | 0) + (n >>> 13)) | 0) +
              (Bt >>> 26)) |
            0),
            (Bt &= 67108863),
            (i = Math.imul(j, rt)),
            (n = ((n = Math.imul(j, it)) + Math.imul(C, rt)) | 0),
            (o = Math.imul(C, it)),
            (i = (i + Math.imul(q, ot)) | 0),
            (n = ((n = (n + Math.imul(q, st)) | 0) + Math.imul(L, ot)) | 0),
            (o = (o + Math.imul(L, st)) | 0),
            (i = (i + Math.imul(T, ht)) | 0),
            (n = ((n = (n + Math.imul(T, ut)) | 0) + Math.imul(P, ht)) | 0),
            (o = (o + Math.imul(P, ut)) | 0),
            (i = (i + Math.imul(B, dt)) | 0),
            (n = ((n = (n + Math.imul(B, lt)) | 0) + Math.imul(I, dt)) | 0),
            (o = (o + Math.imul(I, lt)) | 0)
          var It =
            (((u + (i = (i + Math.imul(x, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(x, mt)) | 0) + Math.imul(E, pt)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(E, mt)) | 0) + (n >>> 13)) | 0) +
              (It >>> 26)) |
            0),
            (It &= 67108863),
            (i = Math.imul(j, ot)),
            (n = ((n = Math.imul(j, st)) + Math.imul(C, ot)) | 0),
            (o = Math.imul(C, st)),
            (i = (i + Math.imul(q, ht)) | 0),
            (n = ((n = (n + Math.imul(q, ut)) | 0) + Math.imul(L, ht)) | 0),
            (o = (o + Math.imul(L, ut)) | 0),
            (i = (i + Math.imul(T, dt)) | 0),
            (n = ((n = (n + Math.imul(T, lt)) | 0) + Math.imul(P, dt)) | 0),
            (o = (o + Math.imul(P, lt)) | 0)
          var Nt =
            (((u + (i = (i + Math.imul(B, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(B, mt)) | 0) + Math.imul(I, pt)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(I, mt)) | 0) + (n >>> 13)) | 0) +
              (Nt >>> 26)) |
            0),
            (Nt &= 67108863),
            (i = Math.imul(j, ht)),
            (n = ((n = Math.imul(j, ut)) + Math.imul(C, ht)) | 0),
            (o = Math.imul(C, ut)),
            (i = (i + Math.imul(q, dt)) | 0),
            (n = ((n = (n + Math.imul(q, lt)) | 0) + Math.imul(L, dt)) | 0),
            (o = (o + Math.imul(L, lt)) | 0)
          var Tt =
            (((u + (i = (i + Math.imul(T, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(T, mt)) | 0) + Math.imul(P, pt)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(P, mt)) | 0) + (n >>> 13)) | 0) +
              (Tt >>> 26)) |
            0),
            (Tt &= 67108863),
            (i = Math.imul(j, dt)),
            (n = ((n = Math.imul(j, lt)) + Math.imul(C, dt)) | 0),
            (o = Math.imul(C, lt))
          var Pt =
            (((u + (i = (i + Math.imul(q, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(q, mt)) | 0) + Math.imul(L, pt)) | 0)) <<
                13)) |
            0
          ;(u =
            ((((o = (o + Math.imul(L, mt)) | 0) + (n >>> 13)) | 0) +
              (Pt >>> 26)) |
            0),
            (Pt &= 67108863)
          var Ot =
            (((u + (i = Math.imul(j, pt))) | 0) +
              ((8191 & (n = ((n = Math.imul(j, mt)) + Math.imul(C, pt)) | 0)) <<
                13)) |
            0
          return (
            (u =
              ((((o = Math.imul(C, mt)) + (n >>> 13)) | 0) + (Ot >>> 26)) | 0),
            (Ot &= 67108863),
            (h[0] = bt),
            (h[1] = gt),
            (h[2] = vt),
            (h[3] = yt),
            (h[4] = wt),
            (h[5] = Mt),
            (h[6] = _t),
            (h[7] = St),
            (h[8] = At),
            (h[9] = kt),
            (h[10] = xt),
            (h[11] = Et),
            (h[12] = Rt),
            (h[13] = Bt),
            (h[14] = It),
            (h[15] = Nt),
            (h[16] = Tt),
            (h[17] = Pt),
            (h[18] = Ot),
            0 !== u && ((h[19] = u), r.length++),
            r
          )
        }
        function p(t, e, r) {
          return new m().mulp(t, e, r)
        }
        function m(t, e) {
          ;(this.x = t), (this.y = e)
        }
        Math.imul || (c = l),
          (n.prototype.mulTo = function (t, e) {
            var r,
              i = this.length + t.length
            return (
              (r =
                10 === this.length && 10 === t.length
                  ? c(this, t, e)
                  : i < 63
                  ? l(this, t, e)
                  : i < 1024
                  ? (function (t, e, r) {
                      ;(r.negative = e.negative ^ t.negative),
                        (r.length = t.length + e.length)
                      for (var i = 0, n = 0, o = 0; o < r.length - 1; o++) {
                        var s = n
                        n = 0
                        for (
                          var a = 67108863 & i,
                            h = Math.min(o, e.length - 1),
                            u = Math.max(0, o - t.length + 1);
                          u <= h;
                          u++
                        ) {
                          var f = (0 | t.words[o - u]) * (0 | e.words[u]),
                            d = 67108863 & f
                          ;(a = 67108863 & (d = (d + a) | 0)),
                            (n +=
                              (s =
                                ((s = (s + ((f / 67108864) | 0)) | 0) +
                                  (d >>> 26)) |
                                0) >>> 26),
                            (s &= 67108863)
                        }
                        ;(r.words[o] = a), (i = s), (s = n)
                      }
                      return 0 !== i ? (r.words[o] = i) : r.length--, r.strip()
                    })(this, t, e)
                  : p(this, t, e)),
              r
            )
          }),
          (m.prototype.makeRBT = function (t) {
            for (
              var e = new Array(t), r = n.prototype._countBits(t) - 1, i = 0;
              i < t;
              i++
            )
              e[i] = this.revBin(i, r, t)
            return e
          }),
          (m.prototype.revBin = function (t, e, r) {
            if (0 === t || t === r - 1) return t
            for (var i = 0, n = 0; n < e; n++)
              (i |= (1 & t) << (e - n - 1)), (t >>= 1)
            return i
          }),
          (m.prototype.permute = function (t, e, r, i, n, o) {
            for (var s = 0; s < o; s++) (i[s] = e[t[s]]), (n[s] = r[t[s]])
          }),
          (m.prototype.transform = function (t, e, r, i, n, o) {
            this.permute(o, t, e, r, i, n)
            for (var s = 1; s < n; s <<= 1)
              for (
                var a = s << 1,
                  h = Math.cos((2 * Math.PI) / a),
                  u = Math.sin((2 * Math.PI) / a),
                  f = 0;
                f < n;
                f += a
              )
                for (var d = h, l = u, c = 0; c < s; c++) {
                  var p = r[f + c],
                    m = i[f + c],
                    b = r[f + c + s],
                    g = i[f + c + s],
                    v = d * b - l * g
                  ;(g = d * g + l * b),
                    (r[f + c] = p + (b = v)),
                    (i[f + c] = m + g),
                    (r[f + c + s] = p - b),
                    (i[f + c + s] = m - g),
                    c !== a &&
                      ((v = h * d - u * l), (l = h * l + u * d), (d = v))
                }
          }),
          (m.prototype.guessLen13b = function (t, e) {
            var r = 1 | Math.max(e, t),
              i = 1 & r,
              n = 0
            for (r = (r / 2) | 0; r; r >>>= 1) n++
            return 1 << (n + 1 + i)
          }),
          (m.prototype.conjugate = function (t, e, r) {
            if (!(r <= 1))
              for (var i = 0; i < r / 2; i++) {
                var n = t[i]
                ;(t[i] = t[r - i - 1]),
                  (t[r - i - 1] = n),
                  (n = e[i]),
                  (e[i] = -e[r - i - 1]),
                  (e[r - i - 1] = -n)
              }
          }),
          (m.prototype.normalize13b = function (t, e) {
            for (var r = 0, i = 0; i < e / 2; i++) {
              var n =
                8192 * Math.round(t[2 * i + 1] / e) +
                Math.round(t[2 * i] / e) +
                r
              ;(t[i] = 67108863 & n),
                (r = n < 67108864 ? 0 : (n / 67108864) | 0)
            }
            return t
          }),
          (m.prototype.convert13b = function (t, e, i, n) {
            for (var o = 0, s = 0; s < e; s++)
              (i[2 * s] = 8191 & (o += 0 | t[s])),
                (i[2 * s + 1] = 8191 & (o >>>= 13)),
                (o >>>= 13)
            for (s = 2 * e; s < n; ++s) i[s] = 0
            r(0 === o), r(0 == (-8192 & o))
          }),
          (m.prototype.stub = function (t) {
            for (var e = new Array(t), r = 0; r < t; r++) e[r] = 0
            return e
          }),
          (m.prototype.mulp = function (t, e, r) {
            var i = 2 * this.guessLen13b(t.length, e.length),
              n = this.makeRBT(i),
              o = this.stub(i),
              s = new Array(i),
              a = new Array(i),
              h = new Array(i),
              u = new Array(i),
              f = new Array(i),
              d = new Array(i),
              l = r.words
            ;(l.length = i),
              this.convert13b(t.words, t.length, s, i),
              this.convert13b(e.words, e.length, u, i),
              this.transform(s, o, a, h, i, n),
              this.transform(u, o, f, d, i, n)
            for (var c = 0; c < i; c++) {
              var p = a[c] * f[c] - h[c] * d[c]
              ;(h[c] = a[c] * d[c] + h[c] * f[c]), (a[c] = p)
            }
            return (
              this.conjugate(a, h, i),
              this.transform(a, h, l, o, i, n),
              this.conjugate(l, o, i),
              this.normalize13b(l, i),
              (r.negative = t.negative ^ e.negative),
              (r.length = t.length + e.length),
              r.strip()
            )
          }),
          (n.prototype.mul = function (t) {
            var e = new n(null)
            return (
              (e.words = new Array(this.length + t.length)), this.mulTo(t, e)
            )
          }),
          (n.prototype.mulf = function (t) {
            var e = new n(null)
            return (e.words = new Array(this.length + t.length)), p(this, t, e)
          }),
          (n.prototype.imul = function (t) {
            return this.clone().mulTo(t, this)
          }),
          (n.prototype.imuln = function (t) {
            r('number' == typeof t), r(t < 67108864)
            for (var e = 0, i = 0; i < this.length; i++) {
              var n = (0 | this.words[i]) * t,
                o = (67108863 & n) + (67108863 & e)
              ;(e >>= 26),
                (e += (n / 67108864) | 0),
                (e += o >>> 26),
                (this.words[i] = 67108863 & o)
            }
            return 0 !== e && ((this.words[i] = e), this.length++), this
          }),
          (n.prototype.muln = function (t) {
            return this.clone().imuln(t)
          }),
          (n.prototype.sqr = function () {
            return this.mul(this)
          }),
          (n.prototype.isqr = function () {
            return this.imul(this.clone())
          }),
          (n.prototype.pow = function (t) {
            var e = (function (t) {
              for (var e = new Array(t.bitLength()), r = 0; r < e.length; r++) {
                var i = r % 26
                e[r] = (t.words[(r / 26) | 0] & (1 << i)) >>> i
              }
              return e
            })(t)
            if (0 === e.length) return new n(1)
            for (
              var r = this, i = 0;
              i < e.length && 0 === e[i];
              i++, r = r.sqr()
            );
            if (++i < e.length)
              for (var o = r.sqr(); i < e.length; i++, o = o.sqr())
                0 !== e[i] && (r = r.mul(o))
            return r
          }),
          (n.prototype.iushln = function (t) {
            r('number' == typeof t && t >= 0)
            var e,
              i = t % 26,
              n = (t - i) / 26,
              o = (67108863 >>> (26 - i)) << (26 - i)
            if (0 !== i) {
              var s = 0
              for (e = 0; e < this.length; e++) {
                var a = this.words[e] & o
                ;(this.words[e] = (((0 | this.words[e]) - a) << i) | s),
                  (s = a >>> (26 - i))
              }
              s && ((this.words[e] = s), this.length++)
            }
            if (0 !== n) {
              for (e = this.length - 1; e >= 0; e--)
                this.words[e + n] = this.words[e]
              for (e = 0; e < n; e++) this.words[e] = 0
              this.length += n
            }
            return this.strip()
          }),
          (n.prototype.ishln = function (t) {
            return r(0 === this.negative), this.iushln(t)
          }),
          (n.prototype.iushrn = function (t, e, i) {
            var n
            r('number' == typeof t && t >= 0), (n = e ? (e - (e % 26)) / 26 : 0)
            var o = t % 26,
              s = Math.min((t - o) / 26, this.length),
              a = 67108863 ^ ((67108863 >>> o) << o),
              h = i
            if (((n -= s), (n = Math.max(0, n)), h)) {
              for (var u = 0; u < s; u++) h.words[u] = this.words[u]
              h.length = s
            }
            if (0 === s);
            else if (this.length > s)
              for (this.length -= s, u = 0; u < this.length; u++)
                this.words[u] = this.words[u + s]
            else (this.words[0] = 0), (this.length = 1)
            var f = 0
            for (u = this.length - 1; u >= 0 && (0 !== f || u >= n); u--) {
              var d = 0 | this.words[u]
              ;(this.words[u] = (f << (26 - o)) | (d >>> o)), (f = d & a)
            }
            return (
              h && 0 !== f && (h.words[h.length++] = f),
              0 === this.length && ((this.words[0] = 0), (this.length = 1)),
              this.strip()
            )
          }),
          (n.prototype.ishrn = function (t, e, i) {
            return r(0 === this.negative), this.iushrn(t, e, i)
          }),
          (n.prototype.shln = function (t) {
            return this.clone().ishln(t)
          }),
          (n.prototype.ushln = function (t) {
            return this.clone().iushln(t)
          }),
          (n.prototype.shrn = function (t) {
            return this.clone().ishrn(t)
          }),
          (n.prototype.ushrn = function (t) {
            return this.clone().iushrn(t)
          }),
          (n.prototype.testn = function (t) {
            r('number' == typeof t && t >= 0)
            var e = t % 26,
              i = (t - e) / 26
            return !(this.length <= i || !(this.words[i] & (1 << e)))
          }),
          (n.prototype.imaskn = function (t) {
            r('number' == typeof t && t >= 0)
            var e = t % 26,
              i = (t - e) / 26
            return (
              r(0 === this.negative, 'imaskn works only with positive numbers'),
              this.length <= i
                ? this
                : (0 !== e && i++,
                  (this.length = Math.min(i, this.length)),
                  0 !== e &&
                    (this.words[this.length - 1] &=
                      67108863 ^ ((67108863 >>> e) << e)),
                  this.strip())
            )
          }),
          (n.prototype.maskn = function (t) {
            return this.clone().imaskn(t)
          }),
          (n.prototype.iaddn = function (t) {
            return (
              r('number' == typeof t),
              r(t < 67108864),
              t < 0
                ? this.isubn(-t)
                : 0 !== this.negative
                ? 1 === this.length && (0 | this.words[0]) < t
                  ? ((this.words[0] = t - (0 | this.words[0])),
                    (this.negative = 0),
                    this)
                  : ((this.negative = 0),
                    this.isubn(t),
                    (this.negative = 1),
                    this)
                : this._iaddn(t)
            )
          }),
          (n.prototype._iaddn = function (t) {
            this.words[0] += t
            for (var e = 0; e < this.length && this.words[e] >= 67108864; e++)
              (this.words[e] -= 67108864),
                e === this.length - 1
                  ? (this.words[e + 1] = 1)
                  : this.words[e + 1]++
            return (this.length = Math.max(this.length, e + 1)), this
          }),
          (n.prototype.isubn = function (t) {
            if ((r('number' == typeof t), r(t < 67108864), t < 0))
              return this.iaddn(-t)
            if (0 !== this.negative)
              return (
                (this.negative = 0), this.iaddn(t), (this.negative = 1), this
              )
            if (((this.words[0] -= t), 1 === this.length && this.words[0] < 0))
              (this.words[0] = -this.words[0]), (this.negative = 1)
            else
              for (var e = 0; e < this.length && this.words[e] < 0; e++)
                (this.words[e] += 67108864), (this.words[e + 1] -= 1)
            return this.strip()
          }),
          (n.prototype.addn = function (t) {
            return this.clone().iaddn(t)
          }),
          (n.prototype.subn = function (t) {
            return this.clone().isubn(t)
          }),
          (n.prototype.iabs = function () {
            return (this.negative = 0), this
          }),
          (n.prototype.abs = function () {
            return this.clone().iabs()
          }),
          (n.prototype._ishlnsubmul = function (t, e, i) {
            var n, o
            this._expand(t.length + i)
            var s = 0
            for (n = 0; n < t.length; n++) {
              o = (0 | this.words[n + i]) + s
              var a = (0 | t.words[n]) * e
              ;(s = ((o -= 67108863 & a) >> 26) - ((a / 67108864) | 0)),
                (this.words[n + i] = 67108863 & o)
            }
            for (; n < this.length - i; n++)
              (s = (o = (0 | this.words[n + i]) + s) >> 26),
                (this.words[n + i] = 67108863 & o)
            if (0 === s) return this.strip()
            for (r(-1 === s), s = 0, n = 0; n < this.length; n++)
              (s = (o = -(0 | this.words[n]) + s) >> 26),
                (this.words[n] = 67108863 & o)
            return (this.negative = 1), this.strip()
          }),
          (n.prototype._wordDiv = function (t, e) {
            var r,
              i = this.clone(),
              o = t,
              s = 0 | o.words[o.length - 1]
            0 != (r = 26 - this._countBits(s)) &&
              ((o = o.ushln(r)), i.iushln(r), (s = 0 | o.words[o.length - 1]))
            var a,
              h = i.length - o.length
            if ('mod' !== e) {
              ;((a = new n(null)).length = h + 1),
                (a.words = new Array(a.length))
              for (var u = 0; u < a.length; u++) a.words[u] = 0
            }
            var f = i.clone()._ishlnsubmul(o, 1, h)
            0 === f.negative && ((i = f), a && (a.words[h] = 1))
            for (var d = h - 1; d >= 0; d--) {
              var l =
                67108864 * (0 | i.words[o.length + d]) +
                (0 | i.words[o.length + d - 1])
              for (
                l = Math.min((l / s) | 0, 67108863), i._ishlnsubmul(o, l, d);
                0 !== i.negative;

              )
                l--,
                  (i.negative = 0),
                  i._ishlnsubmul(o, 1, d),
                  i.isZero() || (i.negative ^= 1)
              a && (a.words[d] = l)
            }
            return (
              a && a.strip(),
              i.strip(),
              'div' !== e && 0 !== r && i.iushrn(r),
              { div: a || null, mod: i }
            )
          }),
          (n.prototype.divmod = function (t, e, i) {
            return (
              r(!t.isZero()),
              this.isZero()
                ? { div: new n(0), mod: new n(0) }
                : 0 !== this.negative && 0 === t.negative
                ? ((a = this.neg().divmod(t, e)),
                  'mod' !== e && (o = a.div.neg()),
                  'div' !== e &&
                    ((s = a.mod.neg()), i && 0 !== s.negative && s.iadd(t)),
                  { div: o, mod: s })
                : 0 === this.negative && 0 !== t.negative
                ? ((a = this.divmod(t.neg(), e)),
                  'mod' !== e && (o = a.div.neg()),
                  { div: o, mod: a.mod })
                : 0 != (this.negative & t.negative)
                ? ((a = this.neg().divmod(t.neg(), e)),
                  'div' !== e &&
                    ((s = a.mod.neg()), i && 0 !== s.negative && s.isub(t)),
                  { div: a.div, mod: s })
                : t.length > this.length || this.cmp(t) < 0
                ? { div: new n(0), mod: this }
                : 1 === t.length
                ? 'div' === e
                  ? { div: this.divn(t.words[0]), mod: null }
                  : 'mod' === e
                  ? { div: null, mod: new n(this.modn(t.words[0])) }
                  : {
                      div: this.divn(t.words[0]),
                      mod: new n(this.modn(t.words[0]))
                    }
                : this._wordDiv(t, e)
            )
            var o, s, a
          }),
          (n.prototype.div = function (t) {
            return this.divmod(t, 'div', !1).div
          }),
          (n.prototype.mod = function (t) {
            return this.divmod(t, 'mod', !1).mod
          }),
          (n.prototype.umod = function (t) {
            return this.divmod(t, 'mod', !0).mod
          }),
          (n.prototype.divRound = function (t) {
            var e = this.divmod(t)
            if (e.mod.isZero()) return e.div
            var r = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
              i = t.ushrn(1),
              n = t.andln(1),
              o = r.cmp(i)
            return o < 0 || (1 === n && 0 === o)
              ? e.div
              : 0 !== e.div.negative
              ? e.div.isubn(1)
              : e.div.iaddn(1)
          }),
          (n.prototype.modn = function (t) {
            r(t <= 67108863)
            for (var e = (1 << 26) % t, i = 0, n = this.length - 1; n >= 0; n--)
              i = (e * i + (0 | this.words[n])) % t
            return i
          }),
          (n.prototype.idivn = function (t) {
            r(t <= 67108863)
            for (var e = 0, i = this.length - 1; i >= 0; i--) {
              var n = (0 | this.words[i]) + 67108864 * e
              ;(this.words[i] = (n / t) | 0), (e = n % t)
            }
            return this.strip()
          }),
          (n.prototype.divn = function (t) {
            return this.clone().idivn(t)
          }),
          (n.prototype.egcd = function (t) {
            r(0 === t.negative), r(!t.isZero())
            var e = this,
              i = t.clone()
            e = 0 !== e.negative ? e.umod(t) : e.clone()
            for (
              var o = new n(1), s = new n(0), a = new n(0), h = new n(1), u = 0;
              e.isEven() && i.isEven();

            )
              e.iushrn(1), i.iushrn(1), ++u
            for (var f = i.clone(), d = e.clone(); !e.isZero(); ) {
              for (
                var l = 0, c = 1;
                0 == (e.words[0] & c) && l < 26;
                ++l, c <<= 1
              );
              if (l > 0)
                for (e.iushrn(l); l-- > 0; )
                  (o.isOdd() || s.isOdd()) && (o.iadd(f), s.isub(d)),
                    o.iushrn(1),
                    s.iushrn(1)
              for (
                var p = 0, m = 1;
                0 == (i.words[0] & m) && p < 26;
                ++p, m <<= 1
              );
              if (p > 0)
                for (i.iushrn(p); p-- > 0; )
                  (a.isOdd() || h.isOdd()) && (a.iadd(f), h.isub(d)),
                    a.iushrn(1),
                    h.iushrn(1)
              e.cmp(i) >= 0
                ? (e.isub(i), o.isub(a), s.isub(h))
                : (i.isub(e), a.isub(o), h.isub(s))
            }
            return { a: a, b: h, gcd: i.iushln(u) }
          }),
          (n.prototype._invmp = function (t) {
            r(0 === t.negative), r(!t.isZero())
            var e = this,
              i = t.clone()
            e = 0 !== e.negative ? e.umod(t) : e.clone()
            for (
              var o, s = new n(1), a = new n(0), h = i.clone();
              e.cmpn(1) > 0 && i.cmpn(1) > 0;

            ) {
              for (
                var u = 0, f = 1;
                0 == (e.words[0] & f) && u < 26;
                ++u, f <<= 1
              );
              if (u > 0)
                for (e.iushrn(u); u-- > 0; ) s.isOdd() && s.iadd(h), s.iushrn(1)
              for (
                var d = 0, l = 1;
                0 == (i.words[0] & l) && d < 26;
                ++d, l <<= 1
              );
              if (d > 0)
                for (i.iushrn(d); d-- > 0; ) a.isOdd() && a.iadd(h), a.iushrn(1)
              e.cmp(i) >= 0 ? (e.isub(i), s.isub(a)) : (i.isub(e), a.isub(s))
            }
            return (o = 0 === e.cmpn(1) ? s : a).cmpn(0) < 0 && o.iadd(t), o
          }),
          (n.prototype.gcd = function (t) {
            if (this.isZero()) return t.abs()
            if (t.isZero()) return this.abs()
            var e = this.clone(),
              r = t.clone()
            ;(e.negative = 0), (r.negative = 0)
            for (var i = 0; e.isEven() && r.isEven(); i++)
              e.iushrn(1), r.iushrn(1)
            for (;;) {
              for (; e.isEven(); ) e.iushrn(1)
              for (; r.isEven(); ) r.iushrn(1)
              var n = e.cmp(r)
              if (n < 0) {
                var o = e
                ;(e = r), (r = o)
              } else if (0 === n || 0 === r.cmpn(1)) break
              e.isub(r)
            }
            return r.iushln(i)
          }),
          (n.prototype.invm = function (t) {
            return this.egcd(t).a.umod(t)
          }),
          (n.prototype.isEven = function () {
            return 0 == (1 & this.words[0])
          }),
          (n.prototype.isOdd = function () {
            return 1 == (1 & this.words[0])
          }),
          (n.prototype.andln = function (t) {
            return this.words[0] & t
          }),
          (n.prototype.bincn = function (t) {
            r('number' == typeof t)
            var e = t % 26,
              i = (t - e) / 26,
              n = 1 << e
            if (this.length <= i)
              return this._expand(i + 1), (this.words[i] |= n), this
            for (var o = n, s = i; 0 !== o && s < this.length; s++) {
              var a = 0 | this.words[s]
              ;(o = (a += o) >>> 26), (this.words[s] = a &= 67108863)
            }
            return 0 !== o && ((this.words[s] = o), this.length++), this
          }),
          (n.prototype.isZero = function () {
            return 1 === this.length && 0 === this.words[0]
          }),
          (n.prototype.cmpn = function (t) {
            var e,
              i = t < 0
            if (0 !== this.negative && !i) return -1
            if (0 === this.negative && i) return 1
            if ((this.strip(), this.length > 1)) e = 1
            else {
              i && (t = -t), r(t <= 67108863, 'Number is too big')
              var n = 0 | this.words[0]
              e = n === t ? 0 : n < t ? -1 : 1
            }
            return 0 !== this.negative ? 0 | -e : e
          }),
          (n.prototype.cmp = function (t) {
            if (0 !== this.negative && 0 === t.negative) return -1
            if (0 === this.negative && 0 !== t.negative) return 1
            var e = this.ucmp(t)
            return 0 !== this.negative ? 0 | -e : e
          }),
          (n.prototype.ucmp = function (t) {
            if (this.length > t.length) return 1
            if (this.length < t.length) return -1
            for (var e = 0, r = this.length - 1; r >= 0; r--) {
              var i = 0 | this.words[r],
                n = 0 | t.words[r]
              if (i !== n) {
                i < n ? (e = -1) : i > n && (e = 1)
                break
              }
            }
            return e
          }),
          (n.prototype.gtn = function (t) {
            return 1 === this.cmpn(t)
          }),
          (n.prototype.gt = function (t) {
            return 1 === this.cmp(t)
          }),
          (n.prototype.gten = function (t) {
            return this.cmpn(t) >= 0
          }),
          (n.prototype.gte = function (t) {
            return this.cmp(t) >= 0
          }),
          (n.prototype.ltn = function (t) {
            return -1 === this.cmpn(t)
          }),
          (n.prototype.lt = function (t) {
            return -1 === this.cmp(t)
          }),
          (n.prototype.lten = function (t) {
            return this.cmpn(t) <= 0
          }),
          (n.prototype.lte = function (t) {
            return this.cmp(t) <= 0
          }),
          (n.prototype.eqn = function (t) {
            return 0 === this.cmpn(t)
          }),
          (n.prototype.eq = function (t) {
            return 0 === this.cmp(t)
          }),
          (n.red = function (t) {
            return new _(t)
          }),
          (n.prototype.toRed = function (t) {
            return (
              r(!this.red, 'Already a number in reduction context'),
              r(0 === this.negative, 'red works only with positives'),
              t.convertTo(this)._forceRed(t)
            )
          }),
          (n.prototype.fromRed = function () {
            return (
              r(
                this.red,
                'fromRed works only with numbers in reduction context'
              ),
              this.red.convertFrom(this)
            )
          }),
          (n.prototype._forceRed = function (t) {
            return (this.red = t), this
          }),
          (n.prototype.forceRed = function (t) {
            return (
              r(!this.red, 'Already a number in reduction context'),
              this._forceRed(t)
            )
          }),
          (n.prototype.redAdd = function (t) {
            return (
              r(this.red, 'redAdd works only with red numbers'),
              this.red.add(this, t)
            )
          }),
          (n.prototype.redIAdd = function (t) {
            return (
              r(this.red, 'redIAdd works only with red numbers'),
              this.red.iadd(this, t)
            )
          }),
          (n.prototype.redSub = function (t) {
            return (
              r(this.red, 'redSub works only with red numbers'),
              this.red.sub(this, t)
            )
          }),
          (n.prototype.redISub = function (t) {
            return (
              r(this.red, 'redISub works only with red numbers'),
              this.red.isub(this, t)
            )
          }),
          (n.prototype.redShl = function (t) {
            return (
              r(this.red, 'redShl works only with red numbers'),
              this.red.shl(this, t)
            )
          }),
          (n.prototype.redMul = function (t) {
            return (
              r(this.red, 'redMul works only with red numbers'),
              this.red._verify2(this, t),
              this.red.mul(this, t)
            )
          }),
          (n.prototype.redIMul = function (t) {
            return (
              r(this.red, 'redMul works only with red numbers'),
              this.red._verify2(this, t),
              this.red.imul(this, t)
            )
          }),
          (n.prototype.redSqr = function () {
            return (
              r(this.red, 'redSqr works only with red numbers'),
              this.red._verify1(this),
              this.red.sqr(this)
            )
          }),
          (n.prototype.redISqr = function () {
            return (
              r(this.red, 'redISqr works only with red numbers'),
              this.red._verify1(this),
              this.red.isqr(this)
            )
          }),
          (n.prototype.redSqrt = function () {
            return (
              r(this.red, 'redSqrt works only with red numbers'),
              this.red._verify1(this),
              this.red.sqrt(this)
            )
          }),
          (n.prototype.redInvm = function () {
            return (
              r(this.red, 'redInvm works only with red numbers'),
              this.red._verify1(this),
              this.red.invm(this)
            )
          }),
          (n.prototype.redNeg = function () {
            return (
              r(this.red, 'redNeg works only with red numbers'),
              this.red._verify1(this),
              this.red.neg(this)
            )
          }),
          (n.prototype.redPow = function (t) {
            return (
              r(this.red && !t.red, 'redPow(normalNum)'),
              this.red._verify1(this),
              this.red.pow(this, t)
            )
          })
        var b = { k256: null, p224: null, p192: null, p25519: null }
        function g(t, e) {
          ;(this.name = t),
            (this.p = new n(e, 16)),
            (this.n = this.p.bitLength()),
            (this.k = new n(1).iushln(this.n).isub(this.p)),
            (this.tmp = this._tmp())
        }
        function v() {
          g.call(
            this,
            'k256',
            'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f'
          )
        }
        function y() {
          g.call(
            this,
            'p224',
            'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001'
          )
        }
        function w() {
          g.call(
            this,
            'p192',
            'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff'
          )
        }
        function M() {
          g.call(
            this,
            '25519',
            '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed'
          )
        }
        function _(t) {
          if ('string' == typeof t) {
            var e = n._prime(t)
            ;(this.m = e.p), (this.prime = e)
          } else r(t.gtn(1), 'modulus must be greater than 1'), (this.m = t), (this.prime = null)
        }
        function S(t) {
          _.call(this, t),
            (this.shift = this.m.bitLength()),
            this.shift % 26 != 0 && (this.shift += 26 - (this.shift % 26)),
            (this.r = new n(1).iushln(this.shift)),
            (this.r2 = this.imod(this.r.sqr())),
            (this.rinv = this.r._invmp(this.m)),
            (this.minv = this.rinv.mul(this.r).isubn(1).div(this.m)),
            (this.minv = this.minv.umod(this.r)),
            (this.minv = this.r.sub(this.minv))
        }
        ;(g.prototype._tmp = function () {
          var t = new n(null)
          return (t.words = new Array(Math.ceil(this.n / 13))), t
        }),
          (g.prototype.ireduce = function (t) {
            var e,
              r = t
            do {
              this.split(r, this.tmp),
                (e = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength())
            } while (e > this.n)
            var i = e < this.n ? -1 : r.ucmp(this.p)
            return (
              0 === i
                ? ((r.words[0] = 0), (r.length = 1))
                : i > 0
                ? r.isub(this.p)
                : void 0 !== r.strip
                ? r.strip()
                : r._strip(),
              r
            )
          }),
          (g.prototype.split = function (t, e) {
            t.iushrn(this.n, 0, e)
          }),
          (g.prototype.imulK = function (t) {
            return t.imul(this.k)
          }),
          i(v, g),
          (v.prototype.split = function (t, e) {
            for (var r = 4194303, i = Math.min(t.length, 9), n = 0; n < i; n++)
              e.words[n] = t.words[n]
            if (((e.length = i), t.length <= 9))
              return (t.words[0] = 0), void (t.length = 1)
            var o = t.words[9]
            for (e.words[e.length++] = o & r, n = 10; n < t.length; n++) {
              var s = 0 | t.words[n]
              ;(t.words[n - 10] = ((s & r) << 4) | (o >>> 22)), (o = s)
            }
            ;(t.words[n - 10] = o >>>= 22),
              (t.length -= 0 === o && t.length > 10 ? 10 : 9)
          }),
          (v.prototype.imulK = function (t) {
            ;(t.words[t.length] = 0),
              (t.words[t.length + 1] = 0),
              (t.length += 2)
            for (var e = 0, r = 0; r < t.length; r++) {
              var i = 0 | t.words[r]
              ;(t.words[r] = 67108863 & (e += 977 * i)),
                (e = 64 * i + ((e / 67108864) | 0))
            }
            return (
              0 === t.words[t.length - 1] &&
                (t.length--, 0 === t.words[t.length - 1] && t.length--),
              t
            )
          }),
          i(y, g),
          i(w, g),
          i(M, g),
          (M.prototype.imulK = function (t) {
            for (var e = 0, r = 0; r < t.length; r++) {
              var i = 19 * (0 | t.words[r]) + e,
                n = 67108863 & i
              ;(i >>>= 26), (t.words[r] = n), (e = i)
            }
            return 0 !== e && (t.words[t.length++] = e), t
          }),
          (n._prime = function (t) {
            if (b[t]) return b[t]
            var e
            if ('k256' === t) e = new v()
            else if ('p224' === t) e = new y()
            else if ('p192' === t) e = new w()
            else {
              if ('p25519' !== t) throw new Error('Unknown prime ' + t)
              e = new M()
            }
            return (b[t] = e), e
          }),
          (_.prototype._verify1 = function (t) {
            r(0 === t.negative, 'red works only with positives'),
              r(t.red, 'red works only with red numbers')
          }),
          (_.prototype._verify2 = function (t, e) {
            r(0 == (t.negative | e.negative), 'red works only with positives'),
              r(t.red && t.red === e.red, 'red works only with red numbers')
          }),
          (_.prototype.imod = function (t) {
            return this.prime
              ? this.prime.ireduce(t)._forceRed(this)
              : t.umod(this.m)._forceRed(this)
          }),
          (_.prototype.neg = function (t) {
            return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this)
          }),
          (_.prototype.add = function (t, e) {
            this._verify2(t, e)
            var r = t.add(e)
            return r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this)
          }),
          (_.prototype.iadd = function (t, e) {
            this._verify2(t, e)
            var r = t.iadd(e)
            return r.cmp(this.m) >= 0 && r.isub(this.m), r
          }),
          (_.prototype.sub = function (t, e) {
            this._verify2(t, e)
            var r = t.sub(e)
            return r.cmpn(0) < 0 && r.iadd(this.m), r._forceRed(this)
          }),
          (_.prototype.isub = function (t, e) {
            this._verify2(t, e)
            var r = t.isub(e)
            return r.cmpn(0) < 0 && r.iadd(this.m), r
          }),
          (_.prototype.shl = function (t, e) {
            return this._verify1(t), this.imod(t.ushln(e))
          }),
          (_.prototype.imul = function (t, e) {
            return this._verify2(t, e), this.imod(t.imul(e))
          }),
          (_.prototype.mul = function (t, e) {
            return this._verify2(t, e), this.imod(t.mul(e))
          }),
          (_.prototype.isqr = function (t) {
            return this.imul(t, t.clone())
          }),
          (_.prototype.sqr = function (t) {
            return this.mul(t, t)
          }),
          (_.prototype.sqrt = function (t) {
            if (t.isZero()) return t.clone()
            var e = this.m.andln(3)
            if ((r(e % 2 == 1), 3 === e)) {
              var i = this.m.add(new n(1)).iushrn(2)
              return this.pow(t, i)
            }
            for (
              var o = this.m.subn(1), s = 0;
              !o.isZero() && 0 === o.andln(1);

            )
              s++, o.iushrn(1)
            r(!o.isZero())
            var a = new n(1).toRed(this),
              h = a.redNeg(),
              u = this.m.subn(1).iushrn(1),
              f = this.m.bitLength()
            for (
              f = new n(2 * f * f).toRed(this);
              0 !== this.pow(f, u).cmp(h);

            )
              f.redIAdd(h)
            for (
              var d = this.pow(f, o),
                l = this.pow(t, o.addn(1).iushrn(1)),
                c = this.pow(t, o),
                p = s;
              0 !== c.cmp(a);

            ) {
              for (var m = c, b = 0; 0 !== m.cmp(a); b++) m = m.redSqr()
              r(b < p)
              var g = this.pow(d, new n(1).iushln(p - b - 1))
              ;(l = l.redMul(g)), (d = g.redSqr()), (c = c.redMul(d)), (p = b)
            }
            return l
          }),
          (_.prototype.invm = function (t) {
            var e = t._invmp(this.m)
            return 0 !== e.negative
              ? ((e.negative = 0), this.imod(e).redNeg())
              : this.imod(e)
          }),
          (_.prototype.pow = function (t, e) {
            if (e.isZero()) return new n(1).toRed(this)
            if (0 === e.cmpn(1)) return t.clone()
            var r = new Array(16)
            ;(r[0] = new n(1).toRed(this)), (r[1] = t)
            for (var i = 2; i < r.length; i++) r[i] = this.mul(r[i - 1], t)
            var o = r[0],
              s = 0,
              a = 0,
              h = e.bitLength() % 26
            for (0 === h && (h = 26), i = e.length - 1; i >= 0; i--) {
              for (var u = e.words[i], f = h - 1; f >= 0; f--) {
                var d = (u >> f) & 1
                o !== r[0] && (o = this.sqr(o)),
                  0 !== d || 0 !== s
                    ? ((s <<= 1),
                      (s |= d),
                      (4 == ++a || (0 === i && 0 === f)) &&
                        ((o = this.mul(o, r[s])), (a = 0), (s = 0)))
                    : (a = 0)
              }
              h = 26
            }
            return o
          }),
          (_.prototype.convertTo = function (t) {
            var e = t.umod(this.m)
            return e === t ? e.clone() : e
          }),
          (_.prototype.convertFrom = function (t) {
            var e = t.clone()
            return (e.red = null), e
          }),
          (n.mont = function (t) {
            return new S(t)
          }),
          i(S, _),
          (S.prototype.convertTo = function (t) {
            return this.imod(t.ushln(this.shift))
          }),
          (S.prototype.convertFrom = function (t) {
            var e = this.imod(t.mul(this.rinv))
            return (e.red = null), e
          }),
          (S.prototype.imul = function (t, e) {
            if (t.isZero() || e.isZero())
              return (t.words[0] = 0), (t.length = 1), t
            var r = t.imul(e),
              i = r
                .maskn(this.shift)
                .mul(this.minv)
                .imaskn(this.shift)
                .mul(this.m),
              n = r.isub(i).iushrn(this.shift),
              o = n
            return (
              n.cmp(this.m) >= 0
                ? (o = n.isub(this.m))
                : n.cmpn(0) < 0 && (o = n.iadd(this.m)),
              o._forceRed(this)
            )
          }),
          (S.prototype.mul = function (t, e) {
            if (t.isZero() || e.isZero()) return new n(0)._forceRed(this)
            var r = t.mul(e),
              i = r
                .maskn(this.shift)
                .mul(this.minv)
                .imaskn(this.shift)
                .mul(this.m),
              o = r.isub(i).iushrn(this.shift),
              s = o
            return (
              o.cmp(this.m) >= 0
                ? (s = o.isub(this.m))
                : o.cmpn(0) < 0 && (s = o.iadd(this.m)),
              s._forceRed(this)
            )
          }),
          (S.prototype.invm = function (t) {
            return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this)
          })
      })(t, ft)
    })
    dt(function (t, e) {
      !(function (t) {
        var e,
          r,
          i,
          n = String.fromCharCode
        function o(t) {
          for (var e, r, i = [], n = 0, o = t.length; n < o; )
            (e = t.charCodeAt(n++)) >= 55296 && e <= 56319 && n < o
              ? 56320 == (64512 & (r = t.charCodeAt(n++)))
                ? i.push(((1023 & e) << 10) + (1023 & r) + 65536)
                : (i.push(e), n--)
              : i.push(e)
          return i
        }
        function s(t) {
          if (t >= 55296 && t <= 57343)
            throw Error(
              'Lone surrogate U+' +
                t.toString(16).toUpperCase() +
                ' is not a scalar value'
            )
        }
        function a(t, e) {
          return n(((t >> e) & 63) | 128)
        }
        function h(t) {
          if (0 == (4294967168 & t)) return n(t)
          var e = ''
          return (
            0 == (4294965248 & t)
              ? (e = n(((t >> 6) & 31) | 192))
              : 0 == (4294901760 & t)
              ? (s(t), (e = n(((t >> 12) & 15) | 224)), (e += a(t, 6)))
              : 0 == (4292870144 & t) &&
                ((e = n(((t >> 18) & 7) | 240)),
                (e += a(t, 12)),
                (e += a(t, 6))),
            e + n((63 & t) | 128)
          )
        }
        function u() {
          if (i >= r) throw Error('Invalid byte index')
          var t = 255 & e[i]
          if ((i++, 128 == (192 & t))) return 63 & t
          throw Error('Invalid continuation byte')
        }
        function f() {
          var t, n
          if (i > r) throw Error('Invalid byte index')
          if (i == r) return !1
          if (((t = 255 & e[i]), i++, 0 == (128 & t))) return t
          if (192 == (224 & t)) {
            if ((n = ((31 & t) << 6) | u()) >= 128) return n
            throw Error('Invalid continuation byte')
          }
          if (224 == (240 & t)) {
            if ((n = ((15 & t) << 12) | (u() << 6) | u()) >= 2048)
              return s(n), n
            throw Error('Invalid continuation byte')
          }
          if (
            240 == (248 & t) &&
            (n = ((7 & t) << 18) | (u() << 12) | (u() << 6) | u()) >= 65536 &&
            n <= 1114111
          )
            return n
          throw Error('Invalid UTF-8 detected')
        }
        ;(t.version = '3.0.0'),
          (t.encode = function (t) {
            for (var e = o(t), r = e.length, i = -1, n = ''; ++i < r; )
              n += h(e[i])
            return n
          }),
          (t.decode = function (t) {
            ;(e = o(t)), (r = e.length), (i = 0)
            for (var s, a = []; !1 !== (s = f()); ) a.push(s)
            return (function (t) {
              for (var e, r = t.length, i = -1, o = ''; ++i < r; )
                (e = t[i]) > 65535 &&
                  ((o += n((((e -= 65536) >>> 10) & 1023) | 55296)),
                  (e = 56320 | (1023 & e))),
                  (o += n(e))
              return o
            })(a)
          })
      })(e)
    })
    var mt = dt(function (t) {
        !(function (t, e) {
          function r(t, e) {
            if (!t) throw new Error(e || 'Assertion failed')
          }
          function i(t, e) {
            t.super_ = e
            var r = function () {}
            ;(r.prototype = e.prototype),
              (t.prototype = new r()),
              (t.prototype.constructor = t)
          }
          function n(t, e, r) {
            if (n.isBN(t)) return t
            ;(this.negative = 0),
              (this.words = null),
              (this.length = 0),
              (this.red = null),
              null !== t &&
                (('le' !== e && 'be' !== e) || ((r = e), (e = 10)),
                this._init(t || 0, e || 10, r || 'be'))
          }
          var o
          'object' == typeof t ? (t.exports = n) : (e.BN = n),
            (n.BN = n),
            (n.wordSize = 26)
          try {
            o =
              'undefined' != typeof window && void 0 !== window.Buffer
                ? window.Buffer
                : P.default.Buffer
          } catch (t) {}
          function s(t, e) {
            var i = t.charCodeAt(e)
            return i >= 48 && i <= 57
              ? i - 48
              : i >= 65 && i <= 70
              ? i - 55
              : i >= 97 && i <= 102
              ? i - 87
              : void r(!1, 'Invalid character in ' + t)
          }
          function a(t, e, r) {
            var i = s(t, r)
            return r - 1 >= e && (i |= s(t, r - 1) << 4), i
          }
          function h(t, e, i, n) {
            for (
              var o = 0, s = 0, a = Math.min(t.length, i), h = e;
              h < a;
              h++
            ) {
              var u = t.charCodeAt(h) - 48
              ;(o *= n),
                (s = u >= 49 ? u - 49 + 10 : u >= 17 ? u - 17 + 10 : u),
                r(u >= 0 && s < n, 'Invalid character'),
                (o += s)
            }
            return o
          }
          function u(t, e) {
            ;(t.words = e.words),
              (t.length = e.length),
              (t.negative = e.negative),
              (t.red = e.red)
          }
          if (
            ((n.isBN = function (t) {
              return (
                t instanceof n ||
                (null !== t &&
                  'object' == typeof t &&
                  t.constructor.wordSize === n.wordSize &&
                  Array.isArray(t.words))
              )
            }),
            (n.max = function (t, e) {
              return t.cmp(e) > 0 ? t : e
            }),
            (n.min = function (t, e) {
              return t.cmp(e) < 0 ? t : e
            }),
            (n.prototype._init = function (t, e, i) {
              if ('number' == typeof t) return this._initNumber(t, e, i)
              if ('object' == typeof t) return this._initArray(t, e, i)
              'hex' === e && (e = 16), r(e === (0 | e) && e >= 2 && e <= 36)
              var n = 0
              '-' === (t = t.toString().replace(/\s+/g, ''))[0] &&
                (n++, (this.negative = 1)),
                n < t.length &&
                  (16 === e
                    ? this._parseHex(t, n, i)
                    : (this._parseBase(t, e, n),
                      'le' === i && this._initArray(this.toArray(), e, i)))
            }),
            (n.prototype._initNumber = function (t, e, i) {
              t < 0 && ((this.negative = 1), (t = -t)),
                t < 67108864
                  ? ((this.words = [67108863 & t]), (this.length = 1))
                  : t < 4503599627370496
                  ? ((this.words = [67108863 & t, (t / 67108864) & 67108863]),
                    (this.length = 2))
                  : (r(t < 9007199254740992),
                    (this.words = [67108863 & t, (t / 67108864) & 67108863, 1]),
                    (this.length = 3)),
                'le' === i && this._initArray(this.toArray(), e, i)
            }),
            (n.prototype._initArray = function (t, e, i) {
              if ((r('number' == typeof t.length), t.length <= 0))
                return (this.words = [0]), (this.length = 1), this
              ;(this.length = Math.ceil(t.length / 3)),
                (this.words = new Array(this.length))
              for (var n = 0; n < this.length; n++) this.words[n] = 0
              var o,
                s,
                a = 0
              if ('be' === i)
                for (n = t.length - 1, o = 0; n >= 0; n -= 3)
                  (this.words[o] |=
                    ((s = t[n] | (t[n - 1] << 8) | (t[n - 2] << 16)) << a) &
                    67108863),
                    (this.words[o + 1] = (s >>> (26 - a)) & 67108863),
                    (a += 24) >= 26 && ((a -= 26), o++)
              else if ('le' === i)
                for (n = 0, o = 0; n < t.length; n += 3)
                  (this.words[o] |=
                    ((s = t[n] | (t[n + 1] << 8) | (t[n + 2] << 16)) << a) &
                    67108863),
                    (this.words[o + 1] = (s >>> (26 - a)) & 67108863),
                    (a += 24) >= 26 && ((a -= 26), o++)
              return this._strip()
            }),
            (n.prototype._parseHex = function (t, e, r) {
              ;(this.length = Math.ceil((t.length - e) / 6)),
                (this.words = new Array(this.length))
              for (var i = 0; i < this.length; i++) this.words[i] = 0
              var n,
                o = 0,
                s = 0
              if ('be' === r)
                for (i = t.length - 1; i >= e; i -= 2)
                  (n = a(t, e, i) << o),
                    (this.words[s] |= 67108863 & n),
                    o >= 18
                      ? ((o -= 18), (this.words[(s += 1)] |= n >>> 26))
                      : (o += 8)
              else
                for (
                  i = (t.length - e) % 2 == 0 ? e + 1 : e;
                  i < t.length;
                  i += 2
                )
                  (n = a(t, e, i) << o),
                    (this.words[s] |= 67108863 & n),
                    o >= 18
                      ? ((o -= 18), (this.words[(s += 1)] |= n >>> 26))
                      : (o += 8)
              this._strip()
            }),
            (n.prototype._parseBase = function (t, e, r) {
              ;(this.words = [0]), (this.length = 1)
              for (var i = 0, n = 1; n <= 67108863; n *= e) i++
              i--, (n = (n / e) | 0)
              for (
                var o = t.length - r,
                  s = o % i,
                  a = Math.min(o, o - s) + r,
                  u = 0,
                  f = r;
                f < a;
                f += i
              )
                (u = h(t, f, f + i, e)),
                  this.imuln(n),
                  this.words[0] + u < 67108864
                    ? (this.words[0] += u)
                    : this._iaddn(u)
              if (0 !== s) {
                var d = 1
                for (u = h(t, f, t.length, e), f = 0; f < s; f++) d *= e
                this.imuln(d),
                  this.words[0] + u < 67108864
                    ? (this.words[0] += u)
                    : this._iaddn(u)
              }
              this._strip()
            }),
            (n.prototype.copy = function (t) {
              t.words = new Array(this.length)
              for (var e = 0; e < this.length; e++) t.words[e] = this.words[e]
              ;(t.length = this.length),
                (t.negative = this.negative),
                (t.red = this.red)
            }),
            (n.prototype._move = function (t) {
              u(t, this)
            }),
            (n.prototype.clone = function () {
              var t = new n(null)
              return this.copy(t), t
            }),
            (n.prototype._expand = function (t) {
              for (; this.length < t; ) this.words[this.length++] = 0
              return this
            }),
            (n.prototype._strip = function () {
              for (; this.length > 1 && 0 === this.words[this.length - 1]; )
                this.length--
              return this._normSign()
            }),
            (n.prototype._normSign = function () {
              return (
                1 === this.length && 0 === this.words[0] && (this.negative = 0),
                this
              )
            }),
            'undefined' != typeof Symbol && 'function' == typeof Symbol.for)
          )
            try {
              n.prototype[Symbol.for('nodejs.util.inspect.custom')] = f
            } catch (t) {
              n.prototype.inspect = f
            }
          else n.prototype.inspect = f
          function f() {
            return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>'
          }
          var d = [
              '',
              '0',
              '00',
              '000',
              '0000',
              '00000',
              '000000',
              '0000000',
              '00000000',
              '000000000',
              '0000000000',
              '00000000000',
              '000000000000',
              '0000000000000',
              '00000000000000',
              '000000000000000',
              '0000000000000000',
              '00000000000000000',
              '000000000000000000',
              '0000000000000000000',
              '00000000000000000000',
              '000000000000000000000',
              '0000000000000000000000',
              '00000000000000000000000',
              '000000000000000000000000',
              '0000000000000000000000000'
            ],
            l = [
              0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6,
              6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
            ],
            c = [
              0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607,
              16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536,
              11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101,
              5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368,
              20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875,
              60466176
            ]
          function p(t, e, r) {
            r.negative = e.negative ^ t.negative
            var i = (t.length + e.length) | 0
            ;(r.length = i), (i = (i - 1) | 0)
            var n = 0 | t.words[0],
              o = 0 | e.words[0],
              s = n * o,
              a = (s / 67108864) | 0
            r.words[0] = 67108863 & s
            for (var h = 1; h < i; h++) {
              for (
                var u = a >>> 26,
                  f = 67108863 & a,
                  d = Math.min(h, e.length - 1),
                  l = Math.max(0, h - t.length + 1);
                l <= d;
                l++
              )
                (u +=
                  ((s =
                    (n = 0 | t.words[(h - l) | 0]) * (o = 0 | e.words[l]) + f) /
                    67108864) |
                  0),
                  (f = 67108863 & s)
              ;(r.words[h] = 0 | f), (a = 0 | u)
            }
            return 0 !== a ? (r.words[h] = 0 | a) : r.length--, r._strip()
          }
          ;(n.prototype.toString = function (t, e) {
            var i
            if (((e = 0 | e || 1), 16 === (t = t || 10) || 'hex' === t)) {
              i = ''
              for (var n = 0, o = 0, s = 0; s < this.length; s++) {
                var a = this.words[s],
                  h = (16777215 & ((a << n) | o)).toString(16)
                ;(o = (a >>> (24 - n)) & 16777215),
                  (n += 2) >= 26 && ((n -= 26), s--),
                  (i =
                    0 !== o || s !== this.length - 1
                      ? d[6 - h.length] + h + i
                      : h + i)
              }
              for (0 !== o && (i = o.toString(16) + i); i.length % e != 0; )
                i = '0' + i
              return 0 !== this.negative && (i = '-' + i), i
            }
            if (t === (0 | t) && t >= 2 && t <= 36) {
              var u = l[t],
                f = c[t]
              i = ''
              var p = this.clone()
              for (p.negative = 0; !p.isZero(); ) {
                var m = p.modrn(f).toString(t)
                i = (p = p.idivn(f)).isZero() ? m + i : d[u - m.length] + m + i
              }
              for (this.isZero() && (i = '0' + i); i.length % e != 0; )
                i = '0' + i
              return 0 !== this.negative && (i = '-' + i), i
            }
            r(!1, 'Base should be between 2 and 36')
          }),
            (n.prototype.toNumber = function () {
              var t = this.words[0]
              return (
                2 === this.length
                  ? (t += 67108864 * this.words[1])
                  : 3 === this.length && 1 === this.words[2]
                  ? (t += 4503599627370496 + 67108864 * this.words[1])
                  : this.length > 2 &&
                    r(!1, 'Number can only safely store up to 53 bits'),
                0 !== this.negative ? -t : t
              )
            }),
            (n.prototype.toJSON = function () {
              return this.toString(16, 2)
            }),
            o &&
              (n.prototype.toBuffer = function (t, e) {
                return this.toArrayLike(o, t, e)
              }),
            (n.prototype.toArray = function (t, e) {
              return this.toArrayLike(Array, t, e)
            }),
            (n.prototype.toArrayLike = function (t, e, i) {
              this._strip()
              var n = this.byteLength(),
                o = i || Math.max(1, n)
              r(n <= o, 'byte array longer than desired length'),
                r(o > 0, 'Requested array length <= 0')
              var s = (function (t, e) {
                return t.allocUnsafe ? t.allocUnsafe(e) : new t(e)
              })(t, o)
              return this['_toArrayLike' + ('le' === e ? 'LE' : 'BE')](s, n), s
            }),
            (n.prototype._toArrayLikeLE = function (t, e) {
              for (var r = 0, i = 0, n = 0, o = 0; n < this.length; n++) {
                var s = (this.words[n] << o) | i
                ;(t[r++] = 255 & s),
                  r < t.length && (t[r++] = (s >> 8) & 255),
                  r < t.length && (t[r++] = (s >> 16) & 255),
                  6 === o
                    ? (r < t.length && (t[r++] = (s >> 24) & 255),
                      (i = 0),
                      (o = 0))
                    : ((i = s >>> 24), (o += 2))
              }
              if (r < t.length) for (t[r++] = i; r < t.length; ) t[r++] = 0
            }),
            (n.prototype._toArrayLikeBE = function (t, e) {
              for (
                var r = t.length - 1, i = 0, n = 0, o = 0;
                n < this.length;
                n++
              ) {
                var s = (this.words[n] << o) | i
                ;(t[r--] = 255 & s),
                  r >= 0 && (t[r--] = (s >> 8) & 255),
                  r >= 0 && (t[r--] = (s >> 16) & 255),
                  6 === o
                    ? (r >= 0 && (t[r--] = (s >> 24) & 255), (i = 0), (o = 0))
                    : ((i = s >>> 24), (o += 2))
              }
              if (r >= 0) for (t[r--] = i; r >= 0; ) t[r--] = 0
            }),
            (n.prototype._countBits = Math.clz32
              ? function (t) {
                  return 32 - Math.clz32(t)
                }
              : function (t) {
                  var e = t,
                    r = 0
                  return (
                    e >= 4096 && ((r += 13), (e >>>= 13)),
                    e >= 64 && ((r += 7), (e >>>= 7)),
                    e >= 8 && ((r += 4), (e >>>= 4)),
                    e >= 2 && ((r += 2), (e >>>= 2)),
                    r + e
                  )
                }),
            (n.prototype._zeroBits = function (t) {
              if (0 === t) return 26
              var e = t,
                r = 0
              return (
                0 == (8191 & e) && ((r += 13), (e >>>= 13)),
                0 == (127 & e) && ((r += 7), (e >>>= 7)),
                0 == (15 & e) && ((r += 4), (e >>>= 4)),
                0 == (3 & e) && ((r += 2), (e >>>= 2)),
                0 == (1 & e) && r++,
                r
              )
            }),
            (n.prototype.bitLength = function () {
              var t = this._countBits(this.words[this.length - 1])
              return 26 * (this.length - 1) + t
            }),
            (n.prototype.zeroBits = function () {
              if (this.isZero()) return 0
              for (var t = 0, e = 0; e < this.length; e++) {
                var r = this._zeroBits(this.words[e])
                if (((t += r), 26 !== r)) break
              }
              return t
            }),
            (n.prototype.byteLength = function () {
              return Math.ceil(this.bitLength() / 8)
            }),
            (n.prototype.toTwos = function (t) {
              return 0 !== this.negative
                ? this.abs().inotn(t).iaddn(1)
                : this.clone()
            }),
            (n.prototype.fromTwos = function (t) {
              return this.testn(t - 1)
                ? this.notn(t).iaddn(1).ineg()
                : this.clone()
            }),
            (n.prototype.isNeg = function () {
              return 0 !== this.negative
            }),
            (n.prototype.neg = function () {
              return this.clone().ineg()
            }),
            (n.prototype.ineg = function () {
              return this.isZero() || (this.negative ^= 1), this
            }),
            (n.prototype.iuor = function (t) {
              for (; this.length < t.length; ) this.words[this.length++] = 0
              for (var e = 0; e < t.length; e++)
                this.words[e] = this.words[e] | t.words[e]
              return this._strip()
            }),
            (n.prototype.ior = function (t) {
              return r(0 == (this.negative | t.negative)), this.iuor(t)
            }),
            (n.prototype.or = function (t) {
              return this.length > t.length
                ? this.clone().ior(t)
                : t.clone().ior(this)
            }),
            (n.prototype.uor = function (t) {
              return this.length > t.length
                ? this.clone().iuor(t)
                : t.clone().iuor(this)
            }),
            (n.prototype.iuand = function (t) {
              var e
              e = this.length > t.length ? t : this
              for (var r = 0; r < e.length; r++)
                this.words[r] = this.words[r] & t.words[r]
              return (this.length = e.length), this._strip()
            }),
            (n.prototype.iand = function (t) {
              return r(0 == (this.negative | t.negative)), this.iuand(t)
            }),
            (n.prototype.and = function (t) {
              return this.length > t.length
                ? this.clone().iand(t)
                : t.clone().iand(this)
            }),
            (n.prototype.uand = function (t) {
              return this.length > t.length
                ? this.clone().iuand(t)
                : t.clone().iuand(this)
            }),
            (n.prototype.iuxor = function (t) {
              var e, r
              this.length > t.length
                ? ((e = this), (r = t))
                : ((e = t), (r = this))
              for (var i = 0; i < r.length; i++)
                this.words[i] = e.words[i] ^ r.words[i]
              if (this !== e)
                for (; i < e.length; i++) this.words[i] = e.words[i]
              return (this.length = e.length), this._strip()
            }),
            (n.prototype.ixor = function (t) {
              return r(0 == (this.negative | t.negative)), this.iuxor(t)
            }),
            (n.prototype.xor = function (t) {
              return this.length > t.length
                ? this.clone().ixor(t)
                : t.clone().ixor(this)
            }),
            (n.prototype.uxor = function (t) {
              return this.length > t.length
                ? this.clone().iuxor(t)
                : t.clone().iuxor(this)
            }),
            (n.prototype.inotn = function (t) {
              r('number' == typeof t && t >= 0)
              var e = 0 | Math.ceil(t / 26),
                i = t % 26
              this._expand(e), i > 0 && e--
              for (var n = 0; n < e; n++)
                this.words[n] = 67108863 & ~this.words[n]
              return (
                i > 0 &&
                  (this.words[n] = ~this.words[n] & (67108863 >> (26 - i))),
                this._strip()
              )
            }),
            (n.prototype.notn = function (t) {
              return this.clone().inotn(t)
            }),
            (n.prototype.setn = function (t, e) {
              r('number' == typeof t && t >= 0)
              var i = (t / 26) | 0,
                n = t % 26
              return (
                this._expand(i + 1),
                (this.words[i] = e
                  ? this.words[i] | (1 << n)
                  : this.words[i] & ~(1 << n)),
                this._strip()
              )
            }),
            (n.prototype.iadd = function (t) {
              var e, r, i
              if (0 !== this.negative && 0 === t.negative)
                return (
                  (this.negative = 0),
                  (e = this.isub(t)),
                  (this.negative ^= 1),
                  this._normSign()
                )
              if (0 === this.negative && 0 !== t.negative)
                return (
                  (t.negative = 0),
                  (e = this.isub(t)),
                  (t.negative = 1),
                  e._normSign()
                )
              this.length > t.length
                ? ((r = this), (i = t))
                : ((r = t), (i = this))
              for (var n = 0, o = 0; o < i.length; o++)
                (this.words[o] =
                  67108863 & (e = (0 | r.words[o]) + (0 | i.words[o]) + n)),
                  (n = e >>> 26)
              for (; 0 !== n && o < r.length; o++)
                (this.words[o] = 67108863 & (e = (0 | r.words[o]) + n)),
                  (n = e >>> 26)
              if (((this.length = r.length), 0 !== n))
                (this.words[this.length] = n), this.length++
              else if (r !== this)
                for (; o < r.length; o++) this.words[o] = r.words[o]
              return this
            }),
            (n.prototype.add = function (t) {
              var e
              return 0 !== t.negative && 0 === this.negative
                ? ((t.negative = 0), (e = this.sub(t)), (t.negative ^= 1), e)
                : 0 === t.negative && 0 !== this.negative
                ? ((this.negative = 0),
                  (e = t.sub(this)),
                  (this.negative = 1),
                  e)
                : this.length > t.length
                ? this.clone().iadd(t)
                : t.clone().iadd(this)
            }),
            (n.prototype.isub = function (t) {
              if (0 !== t.negative) {
                t.negative = 0
                var e = this.iadd(t)
                return (t.negative = 1), e._normSign()
              }
              if (0 !== this.negative)
                return (
                  (this.negative = 0),
                  this.iadd(t),
                  (this.negative = 1),
                  this._normSign()
                )
              var r,
                i,
                n = this.cmp(t)
              if (0 === n)
                return (
                  (this.negative = 0),
                  (this.length = 1),
                  (this.words[0] = 0),
                  this
                )
              n > 0 ? ((r = this), (i = t)) : ((r = t), (i = this))
              for (var o = 0, s = 0; s < i.length; s++)
                (o = (e = (0 | r.words[s]) - (0 | i.words[s]) + o) >> 26),
                  (this.words[s] = 67108863 & e)
              for (; 0 !== o && s < r.length; s++)
                (o = (e = (0 | r.words[s]) + o) >> 26),
                  (this.words[s] = 67108863 & e)
              if (0 === o && s < r.length && r !== this)
                for (; s < r.length; s++) this.words[s] = r.words[s]
              return (
                (this.length = Math.max(this.length, s)),
                r !== this && (this.negative = 1),
                this._strip()
              )
            }),
            (n.prototype.sub = function (t) {
              return this.clone().isub(t)
            })
          var m = function (t, e, r) {
            var i,
              n,
              o,
              s = t.words,
              a = e.words,
              h = r.words,
              u = 0,
              f = 0 | s[0],
              d = 8191 & f,
              l = f >>> 13,
              c = 0 | s[1],
              p = 8191 & c,
              m = c >>> 13,
              b = 0 | s[2],
              g = 8191 & b,
              v = b >>> 13,
              y = 0 | s[3],
              w = 8191 & y,
              M = y >>> 13,
              _ = 0 | s[4],
              S = 8191 & _,
              A = _ >>> 13,
              k = 0 | s[5],
              x = 8191 & k,
              E = k >>> 13,
              R = 0 | s[6],
              B = 8191 & R,
              I = R >>> 13,
              N = 0 | s[7],
              T = 8191 & N,
              P = N >>> 13,
              O = 0 | s[8],
              q = 8191 & O,
              L = O >>> 13,
              z = 0 | s[9],
              j = 8191 & z,
              C = z >>> 13,
              U = 0 | a[0],
              D = 8191 & U,
              Z = U >>> 13,
              F = 0 | a[1],
              K = 8191 & F,
              H = F >>> 13,
              V = 0 | a[2],
              $ = 8191 & V,
              W = V >>> 13,
              J = 0 | a[3],
              G = 8191 & J,
              X = J >>> 13,
              Y = 0 | a[4],
              Q = 8191 & Y,
              tt = Y >>> 13,
              et = 0 | a[5],
              rt = 8191 & et,
              it = et >>> 13,
              nt = 0 | a[6],
              ot = 8191 & nt,
              st = nt >>> 13,
              at = 0 | a[7],
              ht = 8191 & at,
              ut = at >>> 13,
              ft = 0 | a[8],
              dt = 8191 & ft,
              lt = ft >>> 13,
              ct = 0 | a[9],
              pt = 8191 & ct,
              mt = ct >>> 13
            ;(r.negative = t.negative ^ e.negative), (r.length = 19)
            var bt =
              (((u + (i = Math.imul(d, D))) | 0) +
                ((8191 & (n = ((n = Math.imul(d, Z)) + Math.imul(l, D)) | 0)) <<
                  13)) |
              0
            ;(u =
              ((((o = Math.imul(l, Z)) + (n >>> 13)) | 0) + (bt >>> 26)) | 0),
              (bt &= 67108863),
              (i = Math.imul(p, D)),
              (n = ((n = Math.imul(p, Z)) + Math.imul(m, D)) | 0),
              (o = Math.imul(m, Z))
            var gt =
              (((u + (i = (i + Math.imul(d, K)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(d, H)) | 0) + Math.imul(l, K)) | 0)) <<
                  13)) |
              0
            ;(u =
              ((((o = (o + Math.imul(l, H)) | 0) + (n >>> 13)) | 0) +
                (gt >>> 26)) |
              0),
              (gt &= 67108863),
              (i = Math.imul(g, D)),
              (n = ((n = Math.imul(g, Z)) + Math.imul(v, D)) | 0),
              (o = Math.imul(v, Z)),
              (i = (i + Math.imul(p, K)) | 0),
              (n = ((n = (n + Math.imul(p, H)) | 0) + Math.imul(m, K)) | 0),
              (o = (o + Math.imul(m, H)) | 0)
            var vt =
              (((u + (i = (i + Math.imul(d, $)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(d, W)) | 0) + Math.imul(l, $)) | 0)) <<
                  13)) |
              0
            ;(u =
              ((((o = (o + Math.imul(l, W)) | 0) + (n >>> 13)) | 0) +
                (vt >>> 26)) |
              0),
              (vt &= 67108863),
              (i = Math.imul(w, D)),
              (n = ((n = Math.imul(w, Z)) + Math.imul(M, D)) | 0),
              (o = Math.imul(M, Z)),
              (i = (i + Math.imul(g, K)) | 0),
              (n = ((n = (n + Math.imul(g, H)) | 0) + Math.imul(v, K)) | 0),
              (o = (o + Math.imul(v, H)) | 0),
              (i = (i + Math.imul(p, $)) | 0),
              (n = ((n = (n + Math.imul(p, W)) | 0) + Math.imul(m, $)) | 0),
              (o = (o + Math.imul(m, W)) | 0)
            var yt =
              (((u + (i = (i + Math.imul(d, G)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(d, X)) | 0) + Math.imul(l, G)) | 0)) <<
                  13)) |
              0
            ;(u =
              ((((o = (o + Math.imul(l, X)) | 0) + (n >>> 13)) | 0) +
                (yt >>> 26)) |
              0),
              (yt &= 67108863),
              (i = Math.imul(S, D)),
              (n = ((n = Math.imul(S, Z)) + Math.imul(A, D)) | 0),
              (o = Math.imul(A, Z)),
              (i = (i + Math.imul(w, K)) | 0),
              (n = ((n = (n + Math.imul(w, H)) | 0) + Math.imul(M, K)) | 0),
              (o = (o + Math.imul(M, H)) | 0),
              (i = (i + Math.imul(g, $)) | 0),
              (n = ((n = (n + Math.imul(g, W)) | 0) + Math.imul(v, $)) | 0),
              (o = (o + Math.imul(v, W)) | 0),
              (i = (i + Math.imul(p, G)) | 0),
              (n = ((n = (n + Math.imul(p, X)) | 0) + Math.imul(m, G)) | 0),
              (o = (o + Math.imul(m, X)) | 0)
            var wt =
              (((u + (i = (i + Math.imul(d, Q)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(d, tt)) | 0) + Math.imul(l, Q)) |
                    0)) <<
                  13)) |
              0
            ;(u =
              ((((o = (o + Math.imul(l, tt)) | 0) + (n >>> 13)) | 0) +
                (wt >>> 26)) |
              0),
              (wt &= 67108863),
              (i = Math.imul(x, D)),
              (n = ((n = Math.imul(x, Z)) + Math.imul(E, D)) | 0),
              (o = Math.imul(E, Z)),
              (i = (i + Math.imul(S, K)) | 0),
              (n = ((n = (n + Math.imul(S, H)) | 0) + Math.imul(A, K)) | 0),
              (o = (o + Math.imul(A, H)) | 0),
              (i = (i + Math.imul(w, $)) | 0),
              (n = ((n = (n + Math.imul(w, W)) | 0) + Math.imul(M, $)) | 0),
              (o = (o + Math.imul(M, W)) | 0),
              (i = (i + Math.imul(g, G)) | 0),
              (n = ((n = (n + Math.imul(g, X)) | 0) + Math.imul(v, G)) | 0),
              (o = (o + Math.imul(v, X)) | 0),
              (i = (i + Math.imul(p, Q)) | 0),
              (n = ((n = (n + Math.imul(p, tt)) | 0) + Math.imul(m, Q)) | 0),
              (o = (o + Math.imul(m, tt)) | 0)
            var Mt =
              (((u + (i = (i + Math.imul(d, rt)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(d, it)) | 0) + Math.imul(l, rt)) |
                    0)) <<
                  13)) |
              0
            ;(u =
              ((((o = (o + Math.imul(l, it)) | 0) + (n >>> 13)) | 0) +
                (Mt >>> 26)) |
              0),
              (Mt &= 67108863),
              (i = Math.imul(B, D)),
              (n = ((n = Math.imul(B, Z)) + Math.imul(I, D)) | 0),
              (o = Math.imul(I, Z)),
              (i = (i + Math.imul(x, K)) | 0),
              (n = ((n = (n + Math.imul(x, H)) | 0) + Math.imul(E, K)) | 0),
              (o = (o + Math.imul(E, H)) | 0),
              (i = (i + Math.imul(S, $)) | 0),
              (n = ((n = (n + Math.imul(S, W)) | 0) + Math.imul(A, $)) | 0),
              (o = (o + Math.imul(A, W)) | 0),
              (i = (i + Math.imul(w, G)) | 0),
              (n = ((n = (n + Math.imul(w, X)) | 0) + Math.imul(M, G)) | 0),
              (o = (o + Math.imul(M, X)) | 0),
              (i = (i + Math.imul(g, Q)) | 0),
              (n = ((n = (n + Math.imul(g, tt)) | 0) + Math.imul(v, Q)) | 0),
              (o = (o + Math.imul(v, tt)) | 0),
              (i = (i + Math.imul(p, rt)) | 0),
              (n = ((n = (n + Math.imul(p, it)) | 0) + Math.imul(m, rt)) | 0),
              (o = (o + Math.imul(m, it)) | 0)
            var _t =
              (((u + (i = (i + Math.imul(d, ot)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(d, st)) | 0) + Math.imul(l, ot)) |
                    0)) <<
                  13)) |
              0
            ;(u =
              ((((o = (o + Math.imul(l, st)) | 0) + (n >>> 13)) | 0) +
                (_t >>> 26)) |
              0),
              (_t &= 67108863),
              (i = Math.imul(T, D)),
              (n = ((n = Math.imul(T, Z)) + Math.imul(P, D)) | 0),
              (o = Math.imul(P, Z)),
              (i = (i + Math.imul(B, K)) | 0),
              (n = ((n = (n + Math.imul(B, H)) | 0) + Math.imul(I, K)) | 0),
              (o = (o + Math.imul(I, H)) | 0),
              (i = (i + Math.imul(x, $)) | 0),
              (n = ((n = (n + Math.imul(x, W)) | 0) + Math.imul(E, $)) | 0),
              (o = (o + Math.imul(E, W)) | 0),
              (i = (i + Math.imul(S, G)) | 0),
              (n = ((n = (n + Math.imul(S, X)) | 0) + Math.imul(A, G)) | 0),
              (o = (o + Math.imul(A, X)) | 0),
              (i = (i + Math.imul(w, Q)) | 0),
              (n = ((n = (n + Math.imul(w, tt)) | 0) + Math.imul(M, Q)) | 0),
              (o = (o + Math.imul(M, tt)) | 0),
              (i = (i + Math.imul(g, rt)) | 0),
              (n = ((n = (n + Math.imul(g, it)) | 0) + Math.imul(v, rt)) | 0),
              (o = (o + Math.imul(v, it)) | 0),
              (i = (i + Math.imul(p, ot)) | 0),
              (n = ((n = (n + Math.imul(p, st)) | 0) + Math.imul(m, ot)) | 0),
              (o = (o + Math.imul(m, st)) | 0)
            var St =
              (((u + (i = (i + Math.imul(d, ht)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(d, ut)) | 0) + Math.imul(l, ht)) |
                    0)) <<
                  13)) |
              0
            ;(u =
              ((((o = (o + Math.imul(l, ut)) | 0) + (n >>> 13)) | 0) +
                (St >>> 26)) |
              0),
              (St &= 67108863),
              (i = Math.imul(q, D)),
              (n = ((n = Math.imul(q, Z)) + Math.imul(L, D)) | 0),
              (o = Math.imul(L, Z)),
              (i = (i + Math.imul(T, K)) | 0),
              (n = ((n = (n + Math.imul(T, H)) | 0) + Math.imul(P, K)) | 0),
              (o = (o + Math.imul(P, H)) | 0),
              (i = (i + Math.imul(B, $)) | 0),
              (n = ((n = (n + Math.imul(B, W)) | 0) + Math.imul(I, $)) | 0),
              (o = (o + Math.imul(I, W)) | 0),
              (i = (i + Math.imul(x, G)) | 0),
              (n = ((n = (n + Math.imul(x, X)) | 0) + Math.imul(E, G)) | 0),
              (o = (o + Math.imul(E, X)) | 0),
              (i = (i + Math.imul(S, Q)) | 0),
              (n = ((n = (n + Math.imul(S, tt)) | 0) + Math.imul(A, Q)) | 0),
              (o = (o + Math.imul(A, tt)) | 0),
              (i = (i + Math.imul(w, rt)) | 0),
              (n = ((n = (n + Math.imul(w, it)) | 0) + Math.imul(M, rt)) | 0),
              (o = (o + Math.imul(M, it)) | 0),
              (i = (i + Math.imul(g, ot)) | 0),
              (n = ((n = (n + Math.imul(g, st)) | 0) + Math.imul(v, ot)) | 0),
              (o = (o + Math.imul(v, st)) | 0),
              (i = (i + Math.imul(p, ht)) | 0),
              (n = ((n = (n + Math.imul(p, ut)) | 0) + Math.imul(m, ht)) | 0),
              (o = (o + Math.imul(m, ut)) | 0)
            var At =
              (((u + (i = (i + Math.imul(d, dt)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(d, lt)) | 0) + Math.imul(l, dt)) |
                    0)) <<
                  13)) |
              0
            ;(u =
              ((((o = (o + Math.imul(l, lt)) | 0) + (n >>> 13)) | 0) +
                (At >>> 26)) |
              0),
              (At &= 67108863),
              (i = Math.imul(j, D)),
              (n = ((n = Math.imul(j, Z)) + Math.imul(C, D)) | 0),
              (o = Math.imul(C, Z)),
              (i = (i + Math.imul(q, K)) | 0),
              (n = ((n = (n + Math.imul(q, H)) | 0) + Math.imul(L, K)) | 0),
              (o = (o + Math.imul(L, H)) | 0),
              (i = (i + Math.imul(T, $)) | 0),
              (n = ((n = (n + Math.imul(T, W)) | 0) + Math.imul(P, $)) | 0),
              (o = (o + Math.imul(P, W)) | 0),
              (i = (i + Math.imul(B, G)) | 0),
              (n = ((n = (n + Math.imul(B, X)) | 0) + Math.imul(I, G)) | 0),
              (o = (o + Math.imul(I, X)) | 0),
              (i = (i + Math.imul(x, Q)) | 0),
              (n = ((n = (n + Math.imul(x, tt)) | 0) + Math.imul(E, Q)) | 0),
              (o = (o + Math.imul(E, tt)) | 0),
              (i = (i + Math.imul(S, rt)) | 0),
              (n = ((n = (n + Math.imul(S, it)) | 0) + Math.imul(A, rt)) | 0),
              (o = (o + Math.imul(A, it)) | 0),
              (i = (i + Math.imul(w, ot)) | 0),
              (n = ((n = (n + Math.imul(w, st)) | 0) + Math.imul(M, ot)) | 0),
              (o = (o + Math.imul(M, st)) | 0),
              (i = (i + Math.imul(g, ht)) | 0),
              (n = ((n = (n + Math.imul(g, ut)) | 0) + Math.imul(v, ht)) | 0),
              (o = (o + Math.imul(v, ut)) | 0),
              (i = (i + Math.imul(p, dt)) | 0),
              (n = ((n = (n + Math.imul(p, lt)) | 0) + Math.imul(m, dt)) | 0),
              (o = (o + Math.imul(m, lt)) | 0)
            var kt =
              (((u + (i = (i + Math.imul(d, pt)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(d, mt)) | 0) + Math.imul(l, pt)) |
                    0)) <<
                  13)) |
              0
            ;(u =
              ((((o = (o + Math.imul(l, mt)) | 0) + (n >>> 13)) | 0) +
                (kt >>> 26)) |
              0),
              (kt &= 67108863),
              (i = Math.imul(j, K)),
              (n = ((n = Math.imul(j, H)) + Math.imul(C, K)) | 0),
              (o = Math.imul(C, H)),
              (i = (i + Math.imul(q, $)) | 0),
              (n = ((n = (n + Math.imul(q, W)) | 0) + Math.imul(L, $)) | 0),
              (o = (o + Math.imul(L, W)) | 0),
              (i = (i + Math.imul(T, G)) | 0),
              (n = ((n = (n + Math.imul(T, X)) | 0) + Math.imul(P, G)) | 0),
              (o = (o + Math.imul(P, X)) | 0),
              (i = (i + Math.imul(B, Q)) | 0),
              (n = ((n = (n + Math.imul(B, tt)) | 0) + Math.imul(I, Q)) | 0),
              (o = (o + Math.imul(I, tt)) | 0),
              (i = (i + Math.imul(x, rt)) | 0),
              (n = ((n = (n + Math.imul(x, it)) | 0) + Math.imul(E, rt)) | 0),
              (o = (o + Math.imul(E, it)) | 0),
              (i = (i + Math.imul(S, ot)) | 0),
              (n = ((n = (n + Math.imul(S, st)) | 0) + Math.imul(A, ot)) | 0),
              (o = (o + Math.imul(A, st)) | 0),
              (i = (i + Math.imul(w, ht)) | 0),
              (n = ((n = (n + Math.imul(w, ut)) | 0) + Math.imul(M, ht)) | 0),
              (o = (o + Math.imul(M, ut)) | 0),
              (i = (i + Math.imul(g, dt)) | 0),
              (n = ((n = (n + Math.imul(g, lt)) | 0) + Math.imul(v, dt)) | 0),
              (o = (o + Math.imul(v, lt)) | 0)
            var xt =
              (((u + (i = (i + Math.imul(p, pt)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(p, mt)) | 0) + Math.imul(m, pt)) |
                    0)) <<
                  13)) |
              0
            ;(u =
              ((((o = (o + Math.imul(m, mt)) | 0) + (n >>> 13)) | 0) +
                (xt >>> 26)) |
              0),
              (xt &= 67108863),
              (i = Math.imul(j, $)),
              (n = ((n = Math.imul(j, W)) + Math.imul(C, $)) | 0),
              (o = Math.imul(C, W)),
              (i = (i + Math.imul(q, G)) | 0),
              (n = ((n = (n + Math.imul(q, X)) | 0) + Math.imul(L, G)) | 0),
              (o = (o + Math.imul(L, X)) | 0),
              (i = (i + Math.imul(T, Q)) | 0),
              (n = ((n = (n + Math.imul(T, tt)) | 0) + Math.imul(P, Q)) | 0),
              (o = (o + Math.imul(P, tt)) | 0),
              (i = (i + Math.imul(B, rt)) | 0),
              (n = ((n = (n + Math.imul(B, it)) | 0) + Math.imul(I, rt)) | 0),
              (o = (o + Math.imul(I, it)) | 0),
              (i = (i + Math.imul(x, ot)) | 0),
              (n = ((n = (n + Math.imul(x, st)) | 0) + Math.imul(E, ot)) | 0),
              (o = (o + Math.imul(E, st)) | 0),
              (i = (i + Math.imul(S, ht)) | 0),
              (n = ((n = (n + Math.imul(S, ut)) | 0) + Math.imul(A, ht)) | 0),
              (o = (o + Math.imul(A, ut)) | 0),
              (i = (i + Math.imul(w, dt)) | 0),
              (n = ((n = (n + Math.imul(w, lt)) | 0) + Math.imul(M, dt)) | 0),
              (o = (o + Math.imul(M, lt)) | 0)
            var Et =
              (((u + (i = (i + Math.imul(g, pt)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(g, mt)) | 0) + Math.imul(v, pt)) |
                    0)) <<
                  13)) |
              0
            ;(u =
              ((((o = (o + Math.imul(v, mt)) | 0) + (n >>> 13)) | 0) +
                (Et >>> 26)) |
              0),
              (Et &= 67108863),
              (i = Math.imul(j, G)),
              (n = ((n = Math.imul(j, X)) + Math.imul(C, G)) | 0),
              (o = Math.imul(C, X)),
              (i = (i + Math.imul(q, Q)) | 0),
              (n = ((n = (n + Math.imul(q, tt)) | 0) + Math.imul(L, Q)) | 0),
              (o = (o + Math.imul(L, tt)) | 0),
              (i = (i + Math.imul(T, rt)) | 0),
              (n = ((n = (n + Math.imul(T, it)) | 0) + Math.imul(P, rt)) | 0),
              (o = (o + Math.imul(P, it)) | 0),
              (i = (i + Math.imul(B, ot)) | 0),
              (n = ((n = (n + Math.imul(B, st)) | 0) + Math.imul(I, ot)) | 0),
              (o = (o + Math.imul(I, st)) | 0),
              (i = (i + Math.imul(x, ht)) | 0),
              (n = ((n = (n + Math.imul(x, ut)) | 0) + Math.imul(E, ht)) | 0),
              (o = (o + Math.imul(E, ut)) | 0),
              (i = (i + Math.imul(S, dt)) | 0),
              (n = ((n = (n + Math.imul(S, lt)) | 0) + Math.imul(A, dt)) | 0),
              (o = (o + Math.imul(A, lt)) | 0)
            var Rt =
              (((u + (i = (i + Math.imul(w, pt)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(w, mt)) | 0) + Math.imul(M, pt)) |
                    0)) <<
                  13)) |
              0
            ;(u =
              ((((o = (o + Math.imul(M, mt)) | 0) + (n >>> 13)) | 0) +
                (Rt >>> 26)) |
              0),
              (Rt &= 67108863),
              (i = Math.imul(j, Q)),
              (n = ((n = Math.imul(j, tt)) + Math.imul(C, Q)) | 0),
              (o = Math.imul(C, tt)),
              (i = (i + Math.imul(q, rt)) | 0),
              (n = ((n = (n + Math.imul(q, it)) | 0) + Math.imul(L, rt)) | 0),
              (o = (o + Math.imul(L, it)) | 0),
              (i = (i + Math.imul(T, ot)) | 0),
              (n = ((n = (n + Math.imul(T, st)) | 0) + Math.imul(P, ot)) | 0),
              (o = (o + Math.imul(P, st)) | 0),
              (i = (i + Math.imul(B, ht)) | 0),
              (n = ((n = (n + Math.imul(B, ut)) | 0) + Math.imul(I, ht)) | 0),
              (o = (o + Math.imul(I, ut)) | 0),
              (i = (i + Math.imul(x, dt)) | 0),
              (n = ((n = (n + Math.imul(x, lt)) | 0) + Math.imul(E, dt)) | 0),
              (o = (o + Math.imul(E, lt)) | 0)
            var Bt =
              (((u + (i = (i + Math.imul(S, pt)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(S, mt)) | 0) + Math.imul(A, pt)) |
                    0)) <<
                  13)) |
              0
            ;(u =
              ((((o = (o + Math.imul(A, mt)) | 0) + (n >>> 13)) | 0) +
                (Bt >>> 26)) |
              0),
              (Bt &= 67108863),
              (i = Math.imul(j, rt)),
              (n = ((n = Math.imul(j, it)) + Math.imul(C, rt)) | 0),
              (o = Math.imul(C, it)),
              (i = (i + Math.imul(q, ot)) | 0),
              (n = ((n = (n + Math.imul(q, st)) | 0) + Math.imul(L, ot)) | 0),
              (o = (o + Math.imul(L, st)) | 0),
              (i = (i + Math.imul(T, ht)) | 0),
              (n = ((n = (n + Math.imul(T, ut)) | 0) + Math.imul(P, ht)) | 0),
              (o = (o + Math.imul(P, ut)) | 0),
              (i = (i + Math.imul(B, dt)) | 0),
              (n = ((n = (n + Math.imul(B, lt)) | 0) + Math.imul(I, dt)) | 0),
              (o = (o + Math.imul(I, lt)) | 0)
            var It =
              (((u + (i = (i + Math.imul(x, pt)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(x, mt)) | 0) + Math.imul(E, pt)) |
                    0)) <<
                  13)) |
              0
            ;(u =
              ((((o = (o + Math.imul(E, mt)) | 0) + (n >>> 13)) | 0) +
                (It >>> 26)) |
              0),
              (It &= 67108863),
              (i = Math.imul(j, ot)),
              (n = ((n = Math.imul(j, st)) + Math.imul(C, ot)) | 0),
              (o = Math.imul(C, st)),
              (i = (i + Math.imul(q, ht)) | 0),
              (n = ((n = (n + Math.imul(q, ut)) | 0) + Math.imul(L, ht)) | 0),
              (o = (o + Math.imul(L, ut)) | 0),
              (i = (i + Math.imul(T, dt)) | 0),
              (n = ((n = (n + Math.imul(T, lt)) | 0) + Math.imul(P, dt)) | 0),
              (o = (o + Math.imul(P, lt)) | 0)
            var Nt =
              (((u + (i = (i + Math.imul(B, pt)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(B, mt)) | 0) + Math.imul(I, pt)) |
                    0)) <<
                  13)) |
              0
            ;(u =
              ((((o = (o + Math.imul(I, mt)) | 0) + (n >>> 13)) | 0) +
                (Nt >>> 26)) |
              0),
              (Nt &= 67108863),
              (i = Math.imul(j, ht)),
              (n = ((n = Math.imul(j, ut)) + Math.imul(C, ht)) | 0),
              (o = Math.imul(C, ut)),
              (i = (i + Math.imul(q, dt)) | 0),
              (n = ((n = (n + Math.imul(q, lt)) | 0) + Math.imul(L, dt)) | 0),
              (o = (o + Math.imul(L, lt)) | 0)
            var Tt =
              (((u + (i = (i + Math.imul(T, pt)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(T, mt)) | 0) + Math.imul(P, pt)) |
                    0)) <<
                  13)) |
              0
            ;(u =
              ((((o = (o + Math.imul(P, mt)) | 0) + (n >>> 13)) | 0) +
                (Tt >>> 26)) |
              0),
              (Tt &= 67108863),
              (i = Math.imul(j, dt)),
              (n = ((n = Math.imul(j, lt)) + Math.imul(C, dt)) | 0),
              (o = Math.imul(C, lt))
            var Pt =
              (((u + (i = (i + Math.imul(q, pt)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(q, mt)) | 0) + Math.imul(L, pt)) |
                    0)) <<
                  13)) |
              0
            ;(u =
              ((((o = (o + Math.imul(L, mt)) | 0) + (n >>> 13)) | 0) +
                (Pt >>> 26)) |
              0),
              (Pt &= 67108863)
            var Ot =
              (((u + (i = Math.imul(j, pt))) | 0) +
                ((8191 &
                  (n = ((n = Math.imul(j, mt)) + Math.imul(C, pt)) | 0)) <<
                  13)) |
              0
            return (
              (u =
                ((((o = Math.imul(C, mt)) + (n >>> 13)) | 0) + (Ot >>> 26)) |
                0),
              (Ot &= 67108863),
              (h[0] = bt),
              (h[1] = gt),
              (h[2] = vt),
              (h[3] = yt),
              (h[4] = wt),
              (h[5] = Mt),
              (h[6] = _t),
              (h[7] = St),
              (h[8] = At),
              (h[9] = kt),
              (h[10] = xt),
              (h[11] = Et),
              (h[12] = Rt),
              (h[13] = Bt),
              (h[14] = It),
              (h[15] = Nt),
              (h[16] = Tt),
              (h[17] = Pt),
              (h[18] = Ot),
              0 !== u && ((h[19] = u), r.length++),
              r
            )
          }
          function b(t, e, r) {
            ;(r.negative = e.negative ^ t.negative),
              (r.length = t.length + e.length)
            for (var i = 0, n = 0, o = 0; o < r.length - 1; o++) {
              var s = n
              n = 0
              for (
                var a = 67108863 & i,
                  h = Math.min(o, e.length - 1),
                  u = Math.max(0, o - t.length + 1);
                u <= h;
                u++
              ) {
                var f = (0 | t.words[o - u]) * (0 | e.words[u]),
                  d = 67108863 & f
                ;(a = 67108863 & (d = (d + a) | 0)),
                  (n +=
                    (s =
                      ((s = (s + ((f / 67108864) | 0)) | 0) + (d >>> 26)) |
                      0) >>> 26),
                  (s &= 67108863)
              }
              ;(r.words[o] = a), (i = s), (s = n)
            }
            return 0 !== i ? (r.words[o] = i) : r.length--, r._strip()
          }
          function g(t, e, r) {
            return b(t, e, r)
          }
          Math.imul || (m = p),
            (n.prototype.mulTo = function (t, e) {
              var r = this.length + t.length
              return 10 === this.length && 10 === t.length
                ? m(this, t, e)
                : r < 63
                ? p(this, t, e)
                : r < 1024
                ? b(this, t, e)
                : g(this, t, e)
            }),
            (n.prototype.mul = function (t) {
              var e = new n(null)
              return (
                (e.words = new Array(this.length + t.length)), this.mulTo(t, e)
              )
            }),
            (n.prototype.mulf = function (t) {
              var e = new n(null)
              return (
                (e.words = new Array(this.length + t.length)), g(this, t, e)
              )
            }),
            (n.prototype.imul = function (t) {
              return this.clone().mulTo(t, this)
            }),
            (n.prototype.imuln = function (t) {
              var e = t < 0
              e && (t = -t), r('number' == typeof t), r(t < 67108864)
              for (var i = 0, n = 0; n < this.length; n++) {
                var o = (0 | this.words[n]) * t,
                  s = (67108863 & o) + (67108863 & i)
                ;(i >>= 26),
                  (i += (o / 67108864) | 0),
                  (i += s >>> 26),
                  (this.words[n] = 67108863 & s)
              }
              return (
                0 !== i && ((this.words[n] = i), this.length++),
                e ? this.ineg() : this
              )
            }),
            (n.prototype.muln = function (t) {
              return this.clone().imuln(t)
            }),
            (n.prototype.sqr = function () {
              return this.mul(this)
            }),
            (n.prototype.isqr = function () {
              return this.imul(this.clone())
            }),
            (n.prototype.pow = function (t) {
              var e = (function (t) {
                for (var e = new Array(t.bitLength()), r = 0; r < e.length; r++)
                  e[r] = (t.words[(r / 26) | 0] >>> r % 26) & 1
                return e
              })(t)
              if (0 === e.length) return new n(1)
              for (
                var r = this, i = 0;
                i < e.length && 0 === e[i];
                i++, r = r.sqr()
              );
              if (++i < e.length)
                for (var o = r.sqr(); i < e.length; i++, o = o.sqr())
                  0 !== e[i] && (r = r.mul(o))
              return r
            }),
            (n.prototype.iushln = function (t) {
              r('number' == typeof t && t >= 0)
              var e,
                i = t % 26,
                n = (t - i) / 26,
                o = (67108863 >>> (26 - i)) << (26 - i)
              if (0 !== i) {
                var s = 0
                for (e = 0; e < this.length; e++) {
                  var a = this.words[e] & o
                  ;(this.words[e] = (((0 | this.words[e]) - a) << i) | s),
                    (s = a >>> (26 - i))
                }
                s && ((this.words[e] = s), this.length++)
              }
              if (0 !== n) {
                for (e = this.length - 1; e >= 0; e--)
                  this.words[e + n] = this.words[e]
                for (e = 0; e < n; e++) this.words[e] = 0
                this.length += n
              }
              return this._strip()
            }),
            (n.prototype.ishln = function (t) {
              return r(0 === this.negative), this.iushln(t)
            }),
            (n.prototype.iushrn = function (t, e, i) {
              var n
              r('number' == typeof t && t >= 0),
                (n = e ? (e - (e % 26)) / 26 : 0)
              var o = t % 26,
                s = Math.min((t - o) / 26, this.length),
                a = 67108863 ^ ((67108863 >>> o) << o),
                h = i
              if (((n -= s), (n = Math.max(0, n)), h)) {
                for (var u = 0; u < s; u++) h.words[u] = this.words[u]
                h.length = s
              }
              if (0 === s);
              else if (this.length > s)
                for (this.length -= s, u = 0; u < this.length; u++)
                  this.words[u] = this.words[u + s]
              else (this.words[0] = 0), (this.length = 1)
              var f = 0
              for (u = this.length - 1; u >= 0 && (0 !== f || u >= n); u--) {
                var d = 0 | this.words[u]
                ;(this.words[u] = (f << (26 - o)) | (d >>> o)), (f = d & a)
              }
              return (
                h && 0 !== f && (h.words[h.length++] = f),
                0 === this.length && ((this.words[0] = 0), (this.length = 1)),
                this._strip()
              )
            }),
            (n.prototype.ishrn = function (t, e, i) {
              return r(0 === this.negative), this.iushrn(t, e, i)
            }),
            (n.prototype.shln = function (t) {
              return this.clone().ishln(t)
            }),
            (n.prototype.ushln = function (t) {
              return this.clone().iushln(t)
            }),
            (n.prototype.shrn = function (t) {
              return this.clone().ishrn(t)
            }),
            (n.prototype.ushrn = function (t) {
              return this.clone().iushrn(t)
            }),
            (n.prototype.testn = function (t) {
              r('number' == typeof t && t >= 0)
              var e = t % 26,
                i = (t - e) / 26
              return !(this.length <= i || !(this.words[i] & (1 << e)))
            }),
            (n.prototype.imaskn = function (t) {
              r('number' == typeof t && t >= 0)
              var e = t % 26,
                i = (t - e) / 26
              return (
                r(
                  0 === this.negative,
                  'imaskn works only with positive numbers'
                ),
                this.length <= i
                  ? this
                  : (0 !== e && i++,
                    (this.length = Math.min(i, this.length)),
                    0 !== e &&
                      (this.words[this.length - 1] &=
                        67108863 ^ ((67108863 >>> e) << e)),
                    this._strip())
              )
            }),
            (n.prototype.maskn = function (t) {
              return this.clone().imaskn(t)
            }),
            (n.prototype.iaddn = function (t) {
              return (
                r('number' == typeof t),
                r(t < 67108864),
                t < 0
                  ? this.isubn(-t)
                  : 0 !== this.negative
                  ? 1 === this.length && (0 | this.words[0]) <= t
                    ? ((this.words[0] = t - (0 | this.words[0])),
                      (this.negative = 0),
                      this)
                    : ((this.negative = 0),
                      this.isubn(t),
                      (this.negative = 1),
                      this)
                  : this._iaddn(t)
              )
            }),
            (n.prototype._iaddn = function (t) {
              this.words[0] += t
              for (var e = 0; e < this.length && this.words[e] >= 67108864; e++)
                (this.words[e] -= 67108864),
                  e === this.length - 1
                    ? (this.words[e + 1] = 1)
                    : this.words[e + 1]++
              return (this.length = Math.max(this.length, e + 1)), this
            }),
            (n.prototype.isubn = function (t) {
              if ((r('number' == typeof t), r(t < 67108864), t < 0))
                return this.iaddn(-t)
              if (0 !== this.negative)
                return (
                  (this.negative = 0), this.iaddn(t), (this.negative = 1), this
                )
              if (
                ((this.words[0] -= t), 1 === this.length && this.words[0] < 0)
              )
                (this.words[0] = -this.words[0]), (this.negative = 1)
              else
                for (var e = 0; e < this.length && this.words[e] < 0; e++)
                  (this.words[e] += 67108864), (this.words[e + 1] -= 1)
              return this._strip()
            }),
            (n.prototype.addn = function (t) {
              return this.clone().iaddn(t)
            }),
            (n.prototype.subn = function (t) {
              return this.clone().isubn(t)
            }),
            (n.prototype.iabs = function () {
              return (this.negative = 0), this
            }),
            (n.prototype.abs = function () {
              return this.clone().iabs()
            }),
            (n.prototype._ishlnsubmul = function (t, e, i) {
              var n, o
              this._expand(t.length + i)
              var s = 0
              for (n = 0; n < t.length; n++) {
                o = (0 | this.words[n + i]) + s
                var a = (0 | t.words[n]) * e
                ;(s = ((o -= 67108863 & a) >> 26) - ((a / 67108864) | 0)),
                  (this.words[n + i] = 67108863 & o)
              }
              for (; n < this.length - i; n++)
                (s = (o = (0 | this.words[n + i]) + s) >> 26),
                  (this.words[n + i] = 67108863 & o)
              if (0 === s) return this._strip()
              for (r(-1 === s), s = 0, n = 0; n < this.length; n++)
                (s = (o = -(0 | this.words[n]) + s) >> 26),
                  (this.words[n] = 67108863 & o)
              return (this.negative = 1), this._strip()
            }),
            (n.prototype._wordDiv = function (t, e) {
              var r,
                i = this.clone(),
                o = t,
                s = 0 | o.words[o.length - 1]
              0 != (r = 26 - this._countBits(s)) &&
                ((o = o.ushln(r)), i.iushln(r), (s = 0 | o.words[o.length - 1]))
              var a,
                h = i.length - o.length
              if ('mod' !== e) {
                ;((a = new n(null)).length = h + 1),
                  (a.words = new Array(a.length))
                for (var u = 0; u < a.length; u++) a.words[u] = 0
              }
              var f = i.clone()._ishlnsubmul(o, 1, h)
              0 === f.negative && ((i = f), a && (a.words[h] = 1))
              for (var d = h - 1; d >= 0; d--) {
                var l =
                  67108864 * (0 | i.words[o.length + d]) +
                  (0 | i.words[o.length + d - 1])
                for (
                  l = Math.min((l / s) | 0, 67108863), i._ishlnsubmul(o, l, d);
                  0 !== i.negative;

                )
                  l--,
                    (i.negative = 0),
                    i._ishlnsubmul(o, 1, d),
                    i.isZero() || (i.negative ^= 1)
                a && (a.words[d] = l)
              }
              return (
                a && a._strip(),
                i._strip(),
                'div' !== e && 0 !== r && i.iushrn(r),
                { div: a || null, mod: i }
              )
            }),
            (n.prototype.divmod = function (t, e, i) {
              return (
                r(!t.isZero()),
                this.isZero()
                  ? { div: new n(0), mod: new n(0) }
                  : 0 !== this.negative && 0 === t.negative
                  ? ((a = this.neg().divmod(t, e)),
                    'mod' !== e && (o = a.div.neg()),
                    'div' !== e &&
                      ((s = a.mod.neg()), i && 0 !== s.negative && s.iadd(t)),
                    { div: o, mod: s })
                  : 0 === this.negative && 0 !== t.negative
                  ? ((a = this.divmod(t.neg(), e)),
                    'mod' !== e && (o = a.div.neg()),
                    { div: o, mod: a.mod })
                  : 0 != (this.negative & t.negative)
                  ? ((a = this.neg().divmod(t.neg(), e)),
                    'div' !== e &&
                      ((s = a.mod.neg()), i && 0 !== s.negative && s.isub(t)),
                    { div: a.div, mod: s })
                  : t.length > this.length || this.cmp(t) < 0
                  ? { div: new n(0), mod: this }
                  : 1 === t.length
                  ? 'div' === e
                    ? { div: this.divn(t.words[0]), mod: null }
                    : 'mod' === e
                    ? { div: null, mod: new n(this.modrn(t.words[0])) }
                    : {
                        div: this.divn(t.words[0]),
                        mod: new n(this.modrn(t.words[0]))
                      }
                  : this._wordDiv(t, e)
              )
              var o, s, a
            }),
            (n.prototype.div = function (t) {
              return this.divmod(t, 'div', !1).div
            }),
            (n.prototype.mod = function (t) {
              return this.divmod(t, 'mod', !1).mod
            }),
            (n.prototype.umod = function (t) {
              return this.divmod(t, 'mod', !0).mod
            }),
            (n.prototype.divRound = function (t) {
              var e = this.divmod(t)
              if (e.mod.isZero()) return e.div
              var r = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
                i = t.ushrn(1),
                n = t.andln(1),
                o = r.cmp(i)
              return o < 0 || (1 === n && 0 === o)
                ? e.div
                : 0 !== e.div.negative
                ? e.div.isubn(1)
                : e.div.iaddn(1)
            }),
            (n.prototype.modrn = function (t) {
              var e = t < 0
              e && (t = -t), r(t <= 67108863)
              for (
                var i = (1 << 26) % t, n = 0, o = this.length - 1;
                o >= 0;
                o--
              )
                n = (i * n + (0 | this.words[o])) % t
              return e ? -n : n
            }),
            (n.prototype.modn = function (t) {
              return this.modrn(t)
            }),
            (n.prototype.idivn = function (t) {
              var e = t < 0
              e && (t = -t), r(t <= 67108863)
              for (var i = 0, n = this.length - 1; n >= 0; n--) {
                var o = (0 | this.words[n]) + 67108864 * i
                ;(this.words[n] = (o / t) | 0), (i = o % t)
              }
              return this._strip(), e ? this.ineg() : this
            }),
            (n.prototype.divn = function (t) {
              return this.clone().idivn(t)
            }),
            (n.prototype.egcd = function (t) {
              r(0 === t.negative), r(!t.isZero())
              var e = this,
                i = t.clone()
              e = 0 !== e.negative ? e.umod(t) : e.clone()
              for (
                var o = new n(1),
                  s = new n(0),
                  a = new n(0),
                  h = new n(1),
                  u = 0;
                e.isEven() && i.isEven();

              )
                e.iushrn(1), i.iushrn(1), ++u
              for (var f = i.clone(), d = e.clone(); !e.isZero(); ) {
                for (
                  var l = 0, c = 1;
                  0 == (e.words[0] & c) && l < 26;
                  ++l, c <<= 1
                );
                if (l > 0)
                  for (e.iushrn(l); l-- > 0; )
                    (o.isOdd() || s.isOdd()) && (o.iadd(f), s.isub(d)),
                      o.iushrn(1),
                      s.iushrn(1)
                for (
                  var p = 0, m = 1;
                  0 == (i.words[0] & m) && p < 26;
                  ++p, m <<= 1
                );
                if (p > 0)
                  for (i.iushrn(p); p-- > 0; )
                    (a.isOdd() || h.isOdd()) && (a.iadd(f), h.isub(d)),
                      a.iushrn(1),
                      h.iushrn(1)
                e.cmp(i) >= 0
                  ? (e.isub(i), o.isub(a), s.isub(h))
                  : (i.isub(e), a.isub(o), h.isub(s))
              }
              return { a: a, b: h, gcd: i.iushln(u) }
            }),
            (n.prototype._invmp = function (t) {
              r(0 === t.negative), r(!t.isZero())
              var e = this,
                i = t.clone()
              e = 0 !== e.negative ? e.umod(t) : e.clone()
              for (
                var o, s = new n(1), a = new n(0), h = i.clone();
                e.cmpn(1) > 0 && i.cmpn(1) > 0;

              ) {
                for (
                  var u = 0, f = 1;
                  0 == (e.words[0] & f) && u < 26;
                  ++u, f <<= 1
                );
                if (u > 0)
                  for (e.iushrn(u); u-- > 0; )
                    s.isOdd() && s.iadd(h), s.iushrn(1)
                for (
                  var d = 0, l = 1;
                  0 == (i.words[0] & l) && d < 26;
                  ++d, l <<= 1
                );
                if (d > 0)
                  for (i.iushrn(d); d-- > 0; )
                    a.isOdd() && a.iadd(h), a.iushrn(1)
                e.cmp(i) >= 0 ? (e.isub(i), s.isub(a)) : (i.isub(e), a.isub(s))
              }
              return (o = 0 === e.cmpn(1) ? s : a).cmpn(0) < 0 && o.iadd(t), o
            }),
            (n.prototype.gcd = function (t) {
              if (this.isZero()) return t.abs()
              if (t.isZero()) return this.abs()
              var e = this.clone(),
                r = t.clone()
              ;(e.negative = 0), (r.negative = 0)
              for (var i = 0; e.isEven() && r.isEven(); i++)
                e.iushrn(1), r.iushrn(1)
              for (;;) {
                for (; e.isEven(); ) e.iushrn(1)
                for (; r.isEven(); ) r.iushrn(1)
                var n = e.cmp(r)
                if (n < 0) {
                  var o = e
                  ;(e = r), (r = o)
                } else if (0 === n || 0 === r.cmpn(1)) break
                e.isub(r)
              }
              return r.iushln(i)
            }),
            (n.prototype.invm = function (t) {
              return this.egcd(t).a.umod(t)
            }),
            (n.prototype.isEven = function () {
              return 0 == (1 & this.words[0])
            }),
            (n.prototype.isOdd = function () {
              return 1 == (1 & this.words[0])
            }),
            (n.prototype.andln = function (t) {
              return this.words[0] & t
            }),
            (n.prototype.bincn = function (t) {
              r('number' == typeof t)
              var e = t % 26,
                i = (t - e) / 26,
                n = 1 << e
              if (this.length <= i)
                return this._expand(i + 1), (this.words[i] |= n), this
              for (var o = n, s = i; 0 !== o && s < this.length; s++) {
                var a = 0 | this.words[s]
                ;(o = (a += o) >>> 26), (this.words[s] = a &= 67108863)
              }
              return 0 !== o && ((this.words[s] = o), this.length++), this
            }),
            (n.prototype.isZero = function () {
              return 1 === this.length && 0 === this.words[0]
            }),
            (n.prototype.cmpn = function (t) {
              var e,
                i = t < 0
              if (0 !== this.negative && !i) return -1
              if (0 === this.negative && i) return 1
              if ((this._strip(), this.length > 1)) e = 1
              else {
                i && (t = -t), r(t <= 67108863, 'Number is too big')
                var n = 0 | this.words[0]
                e = n === t ? 0 : n < t ? -1 : 1
              }
              return 0 !== this.negative ? 0 | -e : e
            }),
            (n.prototype.cmp = function (t) {
              if (0 !== this.negative && 0 === t.negative) return -1
              if (0 === this.negative && 0 !== t.negative) return 1
              var e = this.ucmp(t)
              return 0 !== this.negative ? 0 | -e : e
            }),
            (n.prototype.ucmp = function (t) {
              if (this.length > t.length) return 1
              if (this.length < t.length) return -1
              for (var e = 0, r = this.length - 1; r >= 0; r--) {
                var i = 0 | this.words[r],
                  n = 0 | t.words[r]
                if (i !== n) {
                  i < n ? (e = -1) : i > n && (e = 1)
                  break
                }
              }
              return e
            }),
            (n.prototype.gtn = function (t) {
              return 1 === this.cmpn(t)
            }),
            (n.prototype.gt = function (t) {
              return 1 === this.cmp(t)
            }),
            (n.prototype.gten = function (t) {
              return this.cmpn(t) >= 0
            }),
            (n.prototype.gte = function (t) {
              return this.cmp(t) >= 0
            }),
            (n.prototype.ltn = function (t) {
              return -1 === this.cmpn(t)
            }),
            (n.prototype.lt = function (t) {
              return -1 === this.cmp(t)
            }),
            (n.prototype.lten = function (t) {
              return this.cmpn(t) <= 0
            }),
            (n.prototype.lte = function (t) {
              return this.cmp(t) <= 0
            }),
            (n.prototype.eqn = function (t) {
              return 0 === this.cmpn(t)
            }),
            (n.prototype.eq = function (t) {
              return 0 === this.cmp(t)
            }),
            (n.red = function (t) {
              return new A(t)
            }),
            (n.prototype.toRed = function (t) {
              return (
                r(!this.red, 'Already a number in reduction context'),
                r(0 === this.negative, 'red works only with positives'),
                t.convertTo(this)._forceRed(t)
              )
            }),
            (n.prototype.fromRed = function () {
              return (
                r(
                  this.red,
                  'fromRed works only with numbers in reduction context'
                ),
                this.red.convertFrom(this)
              )
            }),
            (n.prototype._forceRed = function (t) {
              return (this.red = t), this
            }),
            (n.prototype.forceRed = function (t) {
              return (
                r(!this.red, 'Already a number in reduction context'),
                this._forceRed(t)
              )
            }),
            (n.prototype.redAdd = function (t) {
              return (
                r(this.red, 'redAdd works only with red numbers'),
                this.red.add(this, t)
              )
            }),
            (n.prototype.redIAdd = function (t) {
              return (
                r(this.red, 'redIAdd works only with red numbers'),
                this.red.iadd(this, t)
              )
            }),
            (n.prototype.redSub = function (t) {
              return (
                r(this.red, 'redSub works only with red numbers'),
                this.red.sub(this, t)
              )
            }),
            (n.prototype.redISub = function (t) {
              return (
                r(this.red, 'redISub works only with red numbers'),
                this.red.isub(this, t)
              )
            }),
            (n.prototype.redShl = function (t) {
              return (
                r(this.red, 'redShl works only with red numbers'),
                this.red.shl(this, t)
              )
            }),
            (n.prototype.redMul = function (t) {
              return (
                r(this.red, 'redMul works only with red numbers'),
                this.red._verify2(this, t),
                this.red.mul(this, t)
              )
            }),
            (n.prototype.redIMul = function (t) {
              return (
                r(this.red, 'redMul works only with red numbers'),
                this.red._verify2(this, t),
                this.red.imul(this, t)
              )
            }),
            (n.prototype.redSqr = function () {
              return (
                r(this.red, 'redSqr works only with red numbers'),
                this.red._verify1(this),
                this.red.sqr(this)
              )
            }),
            (n.prototype.redISqr = function () {
              return (
                r(this.red, 'redISqr works only with red numbers'),
                this.red._verify1(this),
                this.red.isqr(this)
              )
            }),
            (n.prototype.redSqrt = function () {
              return (
                r(this.red, 'redSqrt works only with red numbers'),
                this.red._verify1(this),
                this.red.sqrt(this)
              )
            }),
            (n.prototype.redInvm = function () {
              return (
                r(this.red, 'redInvm works only with red numbers'),
                this.red._verify1(this),
                this.red.invm(this)
              )
            }),
            (n.prototype.redNeg = function () {
              return (
                r(this.red, 'redNeg works only with red numbers'),
                this.red._verify1(this),
                this.red.neg(this)
              )
            }),
            (n.prototype.redPow = function (t) {
              return (
                r(this.red && !t.red, 'redPow(normalNum)'),
                this.red._verify1(this),
                this.red.pow(this, t)
              )
            })
          var v = { k256: null, p224: null, p192: null, p25519: null }
          function y(t, e) {
            ;(this.name = t),
              (this.p = new n(e, 16)),
              (this.n = this.p.bitLength()),
              (this.k = new n(1).iushln(this.n).isub(this.p)),
              (this.tmp = this._tmp())
          }
          function w() {
            y.call(
              this,
              'k256',
              'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f'
            )
          }
          function M() {
            y.call(
              this,
              'p224',
              'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001'
            )
          }
          function _() {
            y.call(
              this,
              'p192',
              'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff'
            )
          }
          function S() {
            y.call(
              this,
              '25519',
              '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed'
            )
          }
          function A(t) {
            if ('string' == typeof t) {
              var e = n._prime(t)
              ;(this.m = e.p), (this.prime = e)
            } else r(t.gtn(1), 'modulus must be greater than 1'), (this.m = t), (this.prime = null)
          }
          function k(t) {
            A.call(this, t),
              (this.shift = this.m.bitLength()),
              this.shift % 26 != 0 && (this.shift += 26 - (this.shift % 26)),
              (this.r = new n(1).iushln(this.shift)),
              (this.r2 = this.imod(this.r.sqr())),
              (this.rinv = this.r._invmp(this.m)),
              (this.minv = this.rinv.mul(this.r).isubn(1).div(this.m)),
              (this.minv = this.minv.umod(this.r)),
              (this.minv = this.r.sub(this.minv))
          }
          ;(y.prototype._tmp = function () {
            var t = new n(null)
            return (t.words = new Array(Math.ceil(this.n / 13))), t
          }),
            (y.prototype.ireduce = function (t) {
              var e,
                r = t
              do {
                this.split(r, this.tmp),
                  (e = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength())
              } while (e > this.n)
              var i = e < this.n ? -1 : r.ucmp(this.p)
              return (
                0 === i
                  ? ((r.words[0] = 0), (r.length = 1))
                  : i > 0
                  ? r.isub(this.p)
                  : void 0 !== r.strip
                  ? r.strip()
                  : r._strip(),
                r
              )
            }),
            (y.prototype.split = function (t, e) {
              t.iushrn(this.n, 0, e)
            }),
            (y.prototype.imulK = function (t) {
              return t.imul(this.k)
            }),
            i(w, y),
            (w.prototype.split = function (t, e) {
              for (
                var r = 4194303, i = Math.min(t.length, 9), n = 0;
                n < i;
                n++
              )
                e.words[n] = t.words[n]
              if (((e.length = i), t.length <= 9))
                return (t.words[0] = 0), void (t.length = 1)
              var o = t.words[9]
              for (e.words[e.length++] = o & r, n = 10; n < t.length; n++) {
                var s = 0 | t.words[n]
                ;(t.words[n - 10] = ((s & r) << 4) | (o >>> 22)), (o = s)
              }
              ;(t.words[n - 10] = o >>>= 22),
                (t.length -= 0 === o && t.length > 10 ? 10 : 9)
            }),
            (w.prototype.imulK = function (t) {
              ;(t.words[t.length] = 0),
                (t.words[t.length + 1] = 0),
                (t.length += 2)
              for (var e = 0, r = 0; r < t.length; r++) {
                var i = 0 | t.words[r]
                ;(t.words[r] = 67108863 & (e += 977 * i)),
                  (e = 64 * i + ((e / 67108864) | 0))
              }
              return (
                0 === t.words[t.length - 1] &&
                  (t.length--, 0 === t.words[t.length - 1] && t.length--),
                t
              )
            }),
            i(M, y),
            i(_, y),
            i(S, y),
            (S.prototype.imulK = function (t) {
              for (var e = 0, r = 0; r < t.length; r++) {
                var i = 19 * (0 | t.words[r]) + e,
                  n = 67108863 & i
                ;(i >>>= 26), (t.words[r] = n), (e = i)
              }
              return 0 !== e && (t.words[t.length++] = e), t
            }),
            (n._prime = function (t) {
              if (v[t]) return v[t]
              var e
              if ('k256' === t) e = new w()
              else if ('p224' === t) e = new M()
              else if ('p192' === t) e = new _()
              else {
                if ('p25519' !== t) throw new Error('Unknown prime ' + t)
                e = new S()
              }
              return (v[t] = e), e
            }),
            (A.prototype._verify1 = function (t) {
              r(0 === t.negative, 'red works only with positives'),
                r(t.red, 'red works only with red numbers')
            }),
            (A.prototype._verify2 = function (t, e) {
              r(
                0 == (t.negative | e.negative),
                'red works only with positives'
              ),
                r(t.red && t.red === e.red, 'red works only with red numbers')
            }),
            (A.prototype.imod = function (t) {
              return this.prime
                ? this.prime.ireduce(t)._forceRed(this)
                : (u(t, t.umod(this.m)._forceRed(this)), t)
            }),
            (A.prototype.neg = function (t) {
              return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this)
            }),
            (A.prototype.add = function (t, e) {
              this._verify2(t, e)
              var r = t.add(e)
              return r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this)
            }),
            (A.prototype.iadd = function (t, e) {
              this._verify2(t, e)
              var r = t.iadd(e)
              return r.cmp(this.m) >= 0 && r.isub(this.m), r
            }),
            (A.prototype.sub = function (t, e) {
              this._verify2(t, e)
              var r = t.sub(e)
              return r.cmpn(0) < 0 && r.iadd(this.m), r._forceRed(this)
            }),
            (A.prototype.isub = function (t, e) {
              this._verify2(t, e)
              var r = t.isub(e)
              return r.cmpn(0) < 0 && r.iadd(this.m), r
            }),
            (A.prototype.shl = function (t, e) {
              return this._verify1(t), this.imod(t.ushln(e))
            }),
            (A.prototype.imul = function (t, e) {
              return this._verify2(t, e), this.imod(t.imul(e))
            }),
            (A.prototype.mul = function (t, e) {
              return this._verify2(t, e), this.imod(t.mul(e))
            }),
            (A.prototype.isqr = function (t) {
              return this.imul(t, t.clone())
            }),
            (A.prototype.sqr = function (t) {
              return this.mul(t, t)
            }),
            (A.prototype.sqrt = function (t) {
              if (t.isZero()) return t.clone()
              var e = this.m.andln(3)
              if ((r(e % 2 == 1), 3 === e)) {
                var i = this.m.add(new n(1)).iushrn(2)
                return this.pow(t, i)
              }
              for (
                var o = this.m.subn(1), s = 0;
                !o.isZero() && 0 === o.andln(1);

              )
                s++, o.iushrn(1)
              r(!o.isZero())
              var a = new n(1).toRed(this),
                h = a.redNeg(),
                u = this.m.subn(1).iushrn(1),
                f = this.m.bitLength()
              for (
                f = new n(2 * f * f).toRed(this);
                0 !== this.pow(f, u).cmp(h);

              )
                f.redIAdd(h)
              for (
                var d = this.pow(f, o),
                  l = this.pow(t, o.addn(1).iushrn(1)),
                  c = this.pow(t, o),
                  p = s;
                0 !== c.cmp(a);

              ) {
                for (var m = c, b = 0; 0 !== m.cmp(a); b++) m = m.redSqr()
                r(b < p)
                var g = this.pow(d, new n(1).iushln(p - b - 1))
                ;(l = l.redMul(g)), (d = g.redSqr()), (c = c.redMul(d)), (p = b)
              }
              return l
            }),
            (A.prototype.invm = function (t) {
              var e = t._invmp(this.m)
              return 0 !== e.negative
                ? ((e.negative = 0), this.imod(e).redNeg())
                : this.imod(e)
            }),
            (A.prototype.pow = function (t, e) {
              if (e.isZero()) return new n(1).toRed(this)
              if (0 === e.cmpn(1)) return t.clone()
              var r = new Array(16)
              ;(r[0] = new n(1).toRed(this)), (r[1] = t)
              for (var i = 2; i < r.length; i++) r[i] = this.mul(r[i - 1], t)
              var o = r[0],
                s = 0,
                a = 0,
                h = e.bitLength() % 26
              for (0 === h && (h = 26), i = e.length - 1; i >= 0; i--) {
                for (var u = e.words[i], f = h - 1; f >= 0; f--) {
                  var d = (u >> f) & 1
                  o !== r[0] && (o = this.sqr(o)),
                    0 !== d || 0 !== s
                      ? ((s <<= 1),
                        (s |= d),
                        (4 == ++a || (0 === i && 0 === f)) &&
                          ((o = this.mul(o, r[s])), (a = 0), (s = 0)))
                      : (a = 0)
                }
                h = 26
              }
              return o
            }),
            (A.prototype.convertTo = function (t) {
              var e = t.umod(this.m)
              return e === t ? e.clone() : e
            }),
            (A.prototype.convertFrom = function (t) {
              var e = t.clone()
              return (e.red = null), e
            }),
            (n.mont = function (t) {
              return new k(t)
            }),
            i(k, A),
            (k.prototype.convertTo = function (t) {
              return this.imod(t.ushln(this.shift))
            }),
            (k.prototype.convertFrom = function (t) {
              var e = this.imod(t.mul(this.rinv))
              return (e.red = null), e
            }),
            (k.prototype.imul = function (t, e) {
              if (t.isZero() || e.isZero())
                return (t.words[0] = 0), (t.length = 1), t
              var r = t.imul(e),
                i = r
                  .maskn(this.shift)
                  .mul(this.minv)
                  .imaskn(this.shift)
                  .mul(this.m),
                n = r.isub(i).iushrn(this.shift),
                o = n
              return (
                n.cmp(this.m) >= 0
                  ? (o = n.isub(this.m))
                  : n.cmpn(0) < 0 && (o = n.iadd(this.m)),
                o._forceRed(this)
              )
            }),
            (k.prototype.mul = function (t, e) {
              if (t.isZero() || e.isZero()) return new n(0)._forceRed(this)
              var r = t.mul(e),
                i = r
                  .maskn(this.shift)
                  .mul(this.minv)
                  .imaskn(this.shift)
                  .mul(this.m),
                o = r.isub(i).iushrn(this.shift),
                s = o
              return (
                o.cmp(this.m) >= 0
                  ? (s = o.isub(this.m))
                  : o.cmpn(0) < 0 && (s = o.iadd(this.m)),
                s._forceRed(this)
              )
            }),
            (k.prototype.invm = function (t) {
              return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this)
            })
        })(t, ft)
      }),
      bt = dt(function (t) {
        !(function (t, e) {
          function r(t, e) {
            if (!t) throw new Error(e || 'Assertion failed')
          }
          function i(t, e) {
            t.super_ = e
            var r = function () {}
            ;(r.prototype = e.prototype),
              (t.prototype = new r()),
              (t.prototype.constructor = t)
          }
          function n(t, e, r) {
            if (n.isBN(t)) return t
            ;(this.negative = 0),
              (this.words = null),
              (this.length = 0),
              (this.red = null),
              null !== t &&
                (('le' !== e && 'be' !== e) || ((r = e), (e = 10)),
                this._init(t || 0, e || 10, r || 'be'))
          }
          var o
          'object' == typeof t ? (t.exports = n) : (e.BN = n),
            (n.BN = n),
            (n.wordSize = 26)
          try {
            o =
              'undefined' != typeof window && void 0 !== window.Buffer
                ? window.Buffer
                : P.default.Buffer
          } catch (t) {}
          function s(t, e) {
            var i = t.charCodeAt(e)
            return i >= 48 && i <= 57
              ? i - 48
              : i >= 65 && i <= 70
              ? i - 55
              : i >= 97 && i <= 102
              ? i - 87
              : void r(!1, 'Invalid character in ' + t)
          }
          function a(t, e, r) {
            var i = s(t, r)
            return r - 1 >= e && (i |= s(t, r - 1) << 4), i
          }
          function h(t, e, i, n) {
            for (
              var o = 0, s = 0, a = Math.min(t.length, i), h = e;
              h < a;
              h++
            ) {
              var u = t.charCodeAt(h) - 48
              ;(o *= n),
                (s = u >= 49 ? u - 49 + 10 : u >= 17 ? u - 17 + 10 : u),
                r(u >= 0 && s < n, 'Invalid character'),
                (o += s)
            }
            return o
          }
          function u(t, e) {
            ;(t.words = e.words),
              (t.length = e.length),
              (t.negative = e.negative),
              (t.red = e.red)
          }
          if (
            ((n.isBN = function (t) {
              return (
                t instanceof n ||
                (null !== t &&
                  'object' == typeof t &&
                  t.constructor.wordSize === n.wordSize &&
                  Array.isArray(t.words))
              )
            }),
            (n.max = function (t, e) {
              return t.cmp(e) > 0 ? t : e
            }),
            (n.min = function (t, e) {
              return t.cmp(e) < 0 ? t : e
            }),
            (n.prototype._init = function (t, e, i) {
              if ('number' == typeof t) return this._initNumber(t, e, i)
              if ('object' == typeof t) return this._initArray(t, e, i)
              'hex' === e && (e = 16), r(e === (0 | e) && e >= 2 && e <= 36)
              var n = 0
              '-' === (t = t.toString().replace(/\s+/g, ''))[0] &&
                (n++, (this.negative = 1)),
                n < t.length &&
                  (16 === e
                    ? this._parseHex(t, n, i)
                    : (this._parseBase(t, e, n),
                      'le' === i && this._initArray(this.toArray(), e, i)))
            }),
            (n.prototype._initNumber = function (t, e, i) {
              t < 0 && ((this.negative = 1), (t = -t)),
                t < 67108864
                  ? ((this.words = [67108863 & t]), (this.length = 1))
                  : t < 4503599627370496
                  ? ((this.words = [67108863 & t, (t / 67108864) & 67108863]),
                    (this.length = 2))
                  : (r(t < 9007199254740992),
                    (this.words = [67108863 & t, (t / 67108864) & 67108863, 1]),
                    (this.length = 3)),
                'le' === i && this._initArray(this.toArray(), e, i)
            }),
            (n.prototype._initArray = function (t, e, i) {
              if ((r('number' == typeof t.length), t.length <= 0))
                return (this.words = [0]), (this.length = 1), this
              ;(this.length = Math.ceil(t.length / 3)),
                (this.words = new Array(this.length))
              for (var n = 0; n < this.length; n++) this.words[n] = 0
              var o,
                s,
                a = 0
              if ('be' === i)
                for (n = t.length - 1, o = 0; n >= 0; n -= 3)
                  (this.words[o] |=
                    ((s = t[n] | (t[n - 1] << 8) | (t[n - 2] << 16)) << a) &
                    67108863),
                    (this.words[o + 1] = (s >>> (26 - a)) & 67108863),
                    (a += 24) >= 26 && ((a -= 26), o++)
              else if ('le' === i)
                for (n = 0, o = 0; n < t.length; n += 3)
                  (this.words[o] |=
                    ((s = t[n] | (t[n + 1] << 8) | (t[n + 2] << 16)) << a) &
                    67108863),
                    (this.words[o + 1] = (s >>> (26 - a)) & 67108863),
                    (a += 24) >= 26 && ((a -= 26), o++)
              return this._strip()
            }),
            (n.prototype._parseHex = function (t, e, r) {
              ;(this.length = Math.ceil((t.length - e) / 6)),
                (this.words = new Array(this.length))
              for (var i = 0; i < this.length; i++) this.words[i] = 0
              var n,
                o = 0,
                s = 0
              if ('be' === r)
                for (i = t.length - 1; i >= e; i -= 2)
                  (n = a(t, e, i) << o),
                    (this.words[s] |= 67108863 & n),
                    o >= 18
                      ? ((o -= 18), (this.words[(s += 1)] |= n >>> 26))
                      : (o += 8)
              else
                for (
                  i = (t.length - e) % 2 == 0 ? e + 1 : e;
                  i < t.length;
                  i += 2
                )
                  (n = a(t, e, i) << o),
                    (this.words[s] |= 67108863 & n),
                    o >= 18
                      ? ((o -= 18), (this.words[(s += 1)] |= n >>> 26))
                      : (o += 8)
              this._strip()
            }),
            (n.prototype._parseBase = function (t, e, r) {
              ;(this.words = [0]), (this.length = 1)
              for (var i = 0, n = 1; n <= 67108863; n *= e) i++
              i--, (n = (n / e) | 0)
              for (
                var o = t.length - r,
                  s = o % i,
                  a = Math.min(o, o - s) + r,
                  u = 0,
                  f = r;
                f < a;
                f += i
              )
                (u = h(t, f, f + i, e)),
                  this.imuln(n),
                  this.words[0] + u < 67108864
                    ? (this.words[0] += u)
                    : this._iaddn(u)
              if (0 !== s) {
                var d = 1
                for (u = h(t, f, t.length, e), f = 0; f < s; f++) d *= e
                this.imuln(d),
                  this.words[0] + u < 67108864
                    ? (this.words[0] += u)
                    : this._iaddn(u)
              }
              this._strip()
            }),
            (n.prototype.copy = function (t) {
              t.words = new Array(this.length)
              for (var e = 0; e < this.length; e++) t.words[e] = this.words[e]
              ;(t.length = this.length),
                (t.negative = this.negative),
                (t.red = this.red)
            }),
            (n.prototype._move = function (t) {
              u(t, this)
            }),
            (n.prototype.clone = function () {
              var t = new n(null)
              return this.copy(t), t
            }),
            (n.prototype._expand = function (t) {
              for (; this.length < t; ) this.words[this.length++] = 0
              return this
            }),
            (n.prototype._strip = function () {
              for (; this.length > 1 && 0 === this.words[this.length - 1]; )
                this.length--
              return this._normSign()
            }),
            (n.prototype._normSign = function () {
              return (
                1 === this.length && 0 === this.words[0] && (this.negative = 0),
                this
              )
            }),
            'undefined' != typeof Symbol && 'function' == typeof Symbol.for)
          )
            try {
              n.prototype[Symbol.for('nodejs.util.inspect.custom')] = f
            } catch (t) {
              n.prototype.inspect = f
            }
          else n.prototype.inspect = f
          function f() {
            return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>'
          }
          var d = [
              '',
              '0',
              '00',
              '000',
              '0000',
              '00000',
              '000000',
              '0000000',
              '00000000',
              '000000000',
              '0000000000',
              '00000000000',
              '000000000000',
              '0000000000000',
              '00000000000000',
              '000000000000000',
              '0000000000000000',
              '00000000000000000',
              '000000000000000000',
              '0000000000000000000',
              '00000000000000000000',
              '000000000000000000000',
              '0000000000000000000000',
              '00000000000000000000000',
              '000000000000000000000000',
              '0000000000000000000000000'
            ],
            l = [
              0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6,
              6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
            ],
            c = [
              0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607,
              16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536,
              11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101,
              5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368,
              20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875,
              60466176
            ]
          function p(t, e, r) {
            r.negative = e.negative ^ t.negative
            var i = (t.length + e.length) | 0
            ;(r.length = i), (i = (i - 1) | 0)
            var n = 0 | t.words[0],
              o = 0 | e.words[0],
              s = n * o,
              a = (s / 67108864) | 0
            r.words[0] = 67108863 & s
            for (var h = 1; h < i; h++) {
              for (
                var u = a >>> 26,
                  f = 67108863 & a,
                  d = Math.min(h, e.length - 1),
                  l = Math.max(0, h - t.length + 1);
                l <= d;
                l++
              )
                (u +=
                  ((s =
                    (n = 0 | t.words[(h - l) | 0]) * (o = 0 | e.words[l]) + f) /
                    67108864) |
                  0),
                  (f = 67108863 & s)
              ;(r.words[h] = 0 | f), (a = 0 | u)
            }
            return 0 !== a ? (r.words[h] = 0 | a) : r.length--, r._strip()
          }
          ;(n.prototype.toString = function (t, e) {
            var i
            if (((e = 0 | e || 1), 16 === (t = t || 10) || 'hex' === t)) {
              i = ''
              for (var n = 0, o = 0, s = 0; s < this.length; s++) {
                var a = this.words[s],
                  h = (16777215 & ((a << n) | o)).toString(16)
                ;(o = (a >>> (24 - n)) & 16777215),
                  (n += 2) >= 26 && ((n -= 26), s--),
                  (i =
                    0 !== o || s !== this.length - 1
                      ? d[6 - h.length] + h + i
                      : h + i)
              }
              for (0 !== o && (i = o.toString(16) + i); i.length % e != 0; )
                i = '0' + i
              return 0 !== this.negative && (i = '-' + i), i
            }
            if (t === (0 | t) && t >= 2 && t <= 36) {
              var u = l[t],
                f = c[t]
              i = ''
              var p = this.clone()
              for (p.negative = 0; !p.isZero(); ) {
                var m = p.modrn(f).toString(t)
                i = (p = p.idivn(f)).isZero() ? m + i : d[u - m.length] + m + i
              }
              for (this.isZero() && (i = '0' + i); i.length % e != 0; )
                i = '0' + i
              return 0 !== this.negative && (i = '-' + i), i
            }
            r(!1, 'Base should be between 2 and 36')
          }),
            (n.prototype.toNumber = function () {
              var t = this.words[0]
              return (
                2 === this.length
                  ? (t += 67108864 * this.words[1])
                  : 3 === this.length && 1 === this.words[2]
                  ? (t += 4503599627370496 + 67108864 * this.words[1])
                  : this.length > 2 &&
                    r(!1, 'Number can only safely store up to 53 bits'),
                0 !== this.negative ? -t : t
              )
            }),
            (n.prototype.toJSON = function () {
              return this.toString(16, 2)
            }),
            o &&
              (n.prototype.toBuffer = function (t, e) {
                return this.toArrayLike(o, t, e)
              }),
            (n.prototype.toArray = function (t, e) {
              return this.toArrayLike(Array, t, e)
            }),
            (n.prototype.toArrayLike = function (t, e, i) {
              this._strip()
              var n = this.byteLength(),
                o = i || Math.max(1, n)
              r(n <= o, 'byte array longer than desired length'),
                r(o > 0, 'Requested array length <= 0')
              var s = (function (t, e) {
                return t.allocUnsafe ? t.allocUnsafe(e) : new t(e)
              })(t, o)
              return this['_toArrayLike' + ('le' === e ? 'LE' : 'BE')](s, n), s
            }),
            (n.prototype._toArrayLikeLE = function (t, e) {
              for (var r = 0, i = 0, n = 0, o = 0; n < this.length; n++) {
                var s = (this.words[n] << o) | i
                ;(t[r++] = 255 & s),
                  r < t.length && (t[r++] = (s >> 8) & 255),
                  r < t.length && (t[r++] = (s >> 16) & 255),
                  6 === o
                    ? (r < t.length && (t[r++] = (s >> 24) & 255),
                      (i = 0),
                      (o = 0))
                    : ((i = s >>> 24), (o += 2))
              }
              if (r < t.length) for (t[r++] = i; r < t.length; ) t[r++] = 0
            }),
            (n.prototype._toArrayLikeBE = function (t, e) {
              for (
                var r = t.length - 1, i = 0, n = 0, o = 0;
                n < this.length;
                n++
              ) {
                var s = (this.words[n] << o) | i
                ;(t[r--] = 255 & s),
                  r >= 0 && (t[r--] = (s >> 8) & 255),
                  r >= 0 && (t[r--] = (s >> 16) & 255),
                  6 === o
                    ? (r >= 0 && (t[r--] = (s >> 24) & 255), (i = 0), (o = 0))
                    : ((i = s >>> 24), (o += 2))
              }
              if (r >= 0) for (t[r--] = i; r >= 0; ) t[r--] = 0
            }),
            (n.prototype._countBits = Math.clz32
              ? function (t) {
                  return 32 - Math.clz32(t)
                }
              : function (t) {
                  var e = t,
                    r = 0
                  return (
                    e >= 4096 && ((r += 13), (e >>>= 13)),
                    e >= 64 && ((r += 7), (e >>>= 7)),
                    e >= 8 && ((r += 4), (e >>>= 4)),
                    e >= 2 && ((r += 2), (e >>>= 2)),
                    r + e
                  )
                }),
            (n.prototype._zeroBits = function (t) {
              if (0 === t) return 26
              var e = t,
                r = 0
              return (
                0 == (8191 & e) && ((r += 13), (e >>>= 13)),
                0 == (127 & e) && ((r += 7), (e >>>= 7)),
                0 == (15 & e) && ((r += 4), (e >>>= 4)),
                0 == (3 & e) && ((r += 2), (e >>>= 2)),
                0 == (1 & e) && r++,
                r
              )
            }),
            (n.prototype.bitLength = function () {
              var t = this._countBits(this.words[this.length - 1])
              return 26 * (this.length - 1) + t
            }),
            (n.prototype.zeroBits = function () {
              if (this.isZero()) return 0
              for (var t = 0, e = 0; e < this.length; e++) {
                var r = this._zeroBits(this.words[e])
                if (((t += r), 26 !== r)) break
              }
              return t
            }),
            (n.prototype.byteLength = function () {
              return Math.ceil(this.bitLength() / 8)
            }),
            (n.prototype.toTwos = function (t) {
              return 0 !== this.negative
                ? this.abs().inotn(t).iaddn(1)
                : this.clone()
            }),
            (n.prototype.fromTwos = function (t) {
              return this.testn(t - 1)
                ? this.notn(t).iaddn(1).ineg()
                : this.clone()
            }),
            (n.prototype.isNeg = function () {
              return 0 !== this.negative
            }),
            (n.prototype.neg = function () {
              return this.clone().ineg()
            }),
            (n.prototype.ineg = function () {
              return this.isZero() || (this.negative ^= 1), this
            }),
            (n.prototype.iuor = function (t) {
              for (; this.length < t.length; ) this.words[this.length++] = 0
              for (var e = 0; e < t.length; e++)
                this.words[e] = this.words[e] | t.words[e]
              return this._strip()
            }),
            (n.prototype.ior = function (t) {
              return r(0 == (this.negative | t.negative)), this.iuor(t)
            }),
            (n.prototype.or = function (t) {
              return this.length > t.length
                ? this.clone().ior(t)
                : t.clone().ior(this)
            }),
            (n.prototype.uor = function (t) {
              return this.length > t.length
                ? this.clone().iuor(t)
                : t.clone().iuor(this)
            }),
            (n.prototype.iuand = function (t) {
              var e
              e = this.length > t.length ? t : this
              for (var r = 0; r < e.length; r++)
                this.words[r] = this.words[r] & t.words[r]
              return (this.length = e.length), this._strip()
            }),
            (n.prototype.iand = function (t) {
              return r(0 == (this.negative | t.negative)), this.iuand(t)
            }),
            (n.prototype.and = function (t) {
              return this.length > t.length
                ? this.clone().iand(t)
                : t.clone().iand(this)
            }),
            (n.prototype.uand = function (t) {
              return this.length > t.length
                ? this.clone().iuand(t)
                : t.clone().iuand(this)
            }),
            (n.prototype.iuxor = function (t) {
              var e, r
              this.length > t.length
                ? ((e = this), (r = t))
                : ((e = t), (r = this))
              for (var i = 0; i < r.length; i++)
                this.words[i] = e.words[i] ^ r.words[i]
              if (this !== e)
                for (; i < e.length; i++) this.words[i] = e.words[i]
              return (this.length = e.length), this._strip()
            }),
            (n.prototype.ixor = function (t) {
              return r(0 == (this.negative | t.negative)), this.iuxor(t)
            }),
            (n.prototype.xor = function (t) {
              return this.length > t.length
                ? this.clone().ixor(t)
                : t.clone().ixor(this)
            }),
            (n.prototype.uxor = function (t) {
              return this.length > t.length
                ? this.clone().iuxor(t)
                : t.clone().iuxor(this)
            }),
            (n.prototype.inotn = function (t) {
              r('number' == typeof t && t >= 0)
              var e = 0 | Math.ceil(t / 26),
                i = t % 26
              this._expand(e), i > 0 && e--
              for (var n = 0; n < e; n++)
                this.words[n] = 67108863 & ~this.words[n]
              return (
                i > 0 &&
                  (this.words[n] = ~this.words[n] & (67108863 >> (26 - i))),
                this._strip()
              )
            }),
            (n.prototype.notn = function (t) {
              return this.clone().inotn(t)
            }),
            (n.prototype.setn = function (t, e) {
              r('number' == typeof t && t >= 0)
              var i = (t / 26) | 0,
                n = t % 26
              return (
                this._expand(i + 1),
                (this.words[i] = e
                  ? this.words[i] | (1 << n)
                  : this.words[i] & ~(1 << n)),
                this._strip()
              )
            }),
            (n.prototype.iadd = function (t) {
              var e, r, i
              if (0 !== this.negative && 0 === t.negative)
                return (
                  (this.negative = 0),
                  (e = this.isub(t)),
                  (this.negative ^= 1),
                  this._normSign()
                )
              if (0 === this.negative && 0 !== t.negative)
                return (
                  (t.negative = 0),
                  (e = this.isub(t)),
                  (t.negative = 1),
                  e._normSign()
                )
              this.length > t.length
                ? ((r = this), (i = t))
                : ((r = t), (i = this))
              for (var n = 0, o = 0; o < i.length; o++)
                (this.words[o] =
                  67108863 & (e = (0 | r.words[o]) + (0 | i.words[o]) + n)),
                  (n = e >>> 26)
              for (; 0 !== n && o < r.length; o++)
                (this.words[o] = 67108863 & (e = (0 | r.words[o]) + n)),
                  (n = e >>> 26)
              if (((this.length = r.length), 0 !== n))
                (this.words[this.length] = n), this.length++
              else if (r !== this)
                for (; o < r.length; o++) this.words[o] = r.words[o]
              return this
            }),
            (n.prototype.add = function (t) {
              var e
              return 0 !== t.negative && 0 === this.negative
                ? ((t.negative = 0), (e = this.sub(t)), (t.negative ^= 1), e)
                : 0 === t.negative && 0 !== this.negative
                ? ((this.negative = 0),
                  (e = t.sub(this)),
                  (this.negative = 1),
                  e)
                : this.length > t.length
                ? this.clone().iadd(t)
                : t.clone().iadd(this)
            }),
            (n.prototype.isub = function (t) {
              if (0 !== t.negative) {
                t.negative = 0
                var e = this.iadd(t)
                return (t.negative = 1), e._normSign()
              }
              if (0 !== this.negative)
                return (
                  (this.negative = 0),
                  this.iadd(t),
                  (this.negative = 1),
                  this._normSign()
                )
              var r,
                i,
                n = this.cmp(t)
              if (0 === n)
                return (
                  (this.negative = 0),
                  (this.length = 1),
                  (this.words[0] = 0),
                  this
                )
              n > 0 ? ((r = this), (i = t)) : ((r = t), (i = this))
              for (var o = 0, s = 0; s < i.length; s++)
                (o = (e = (0 | r.words[s]) - (0 | i.words[s]) + o) >> 26),
                  (this.words[s] = 67108863 & e)
              for (; 0 !== o && s < r.length; s++)
                (o = (e = (0 | r.words[s]) + o) >> 26),
                  (this.words[s] = 67108863 & e)
              if (0 === o && s < r.length && r !== this)
                for (; s < r.length; s++) this.words[s] = r.words[s]
              return (
                (this.length = Math.max(this.length, s)),
                r !== this && (this.negative = 1),
                this._strip()
              )
            }),
            (n.prototype.sub = function (t) {
              return this.clone().isub(t)
            })
          var m = function (t, e, r) {
            var i,
              n,
              o,
              s = t.words,
              a = e.words,
              h = r.words,
              u = 0,
              f = 0 | s[0],
              d = 8191 & f,
              l = f >>> 13,
              c = 0 | s[1],
              p = 8191 & c,
              m = c >>> 13,
              b = 0 | s[2],
              g = 8191 & b,
              v = b >>> 13,
              y = 0 | s[3],
              w = 8191 & y,
              M = y >>> 13,
              _ = 0 | s[4],
              S = 8191 & _,
              A = _ >>> 13,
              k = 0 | s[5],
              x = 8191 & k,
              E = k >>> 13,
              R = 0 | s[6],
              B = 8191 & R,
              I = R >>> 13,
              N = 0 | s[7],
              T = 8191 & N,
              P = N >>> 13,
              O = 0 | s[8],
              q = 8191 & O,
              L = O >>> 13,
              z = 0 | s[9],
              j = 8191 & z,
              C = z >>> 13,
              U = 0 | a[0],
              D = 8191 & U,
              Z = U >>> 13,
              F = 0 | a[1],
              K = 8191 & F,
              H = F >>> 13,
              V = 0 | a[2],
              $ = 8191 & V,
              W = V >>> 13,
              J = 0 | a[3],
              G = 8191 & J,
              X = J >>> 13,
              Y = 0 | a[4],
              Q = 8191 & Y,
              tt = Y >>> 13,
              et = 0 | a[5],
              rt = 8191 & et,
              it = et >>> 13,
              nt = 0 | a[6],
              ot = 8191 & nt,
              st = nt >>> 13,
              at = 0 | a[7],
              ht = 8191 & at,
              ut = at >>> 13,
              ft = 0 | a[8],
              dt = 8191 & ft,
              lt = ft >>> 13,
              ct = 0 | a[9],
              pt = 8191 & ct,
              mt = ct >>> 13
            ;(r.negative = t.negative ^ e.negative), (r.length = 19)
            var bt =
              (((u + (i = Math.imul(d, D))) | 0) +
                ((8191 & (n = ((n = Math.imul(d, Z)) + Math.imul(l, D)) | 0)) <<
                  13)) |
              0
            ;(u =
              ((((o = Math.imul(l, Z)) + (n >>> 13)) | 0) + (bt >>> 26)) | 0),
              (bt &= 67108863),
              (i = Math.imul(p, D)),
              (n = ((n = Math.imul(p, Z)) + Math.imul(m, D)) | 0),
              (o = Math.imul(m, Z))
            var gt =
              (((u + (i = (i + Math.imul(d, K)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(d, H)) | 0) + Math.imul(l, K)) | 0)) <<
                  13)) |
              0
            ;(u =
              ((((o = (o + Math.imul(l, H)) | 0) + (n >>> 13)) | 0) +
                (gt >>> 26)) |
              0),
              (gt &= 67108863),
              (i = Math.imul(g, D)),
              (n = ((n = Math.imul(g, Z)) + Math.imul(v, D)) | 0),
              (o = Math.imul(v, Z)),
              (i = (i + Math.imul(p, K)) | 0),
              (n = ((n = (n + Math.imul(p, H)) | 0) + Math.imul(m, K)) | 0),
              (o = (o + Math.imul(m, H)) | 0)
            var vt =
              (((u + (i = (i + Math.imul(d, $)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(d, W)) | 0) + Math.imul(l, $)) | 0)) <<
                  13)) |
              0
            ;(u =
              ((((o = (o + Math.imul(l, W)) | 0) + (n >>> 13)) | 0) +
                (vt >>> 26)) |
              0),
              (vt &= 67108863),
              (i = Math.imul(w, D)),
              (n = ((n = Math.imul(w, Z)) + Math.imul(M, D)) | 0),
              (o = Math.imul(M, Z)),
              (i = (i + Math.imul(g, K)) | 0),
              (n = ((n = (n + Math.imul(g, H)) | 0) + Math.imul(v, K)) | 0),
              (o = (o + Math.imul(v, H)) | 0),
              (i = (i + Math.imul(p, $)) | 0),
              (n = ((n = (n + Math.imul(p, W)) | 0) + Math.imul(m, $)) | 0),
              (o = (o + Math.imul(m, W)) | 0)
            var yt =
              (((u + (i = (i + Math.imul(d, G)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(d, X)) | 0) + Math.imul(l, G)) | 0)) <<
                  13)) |
              0
            ;(u =
              ((((o = (o + Math.imul(l, X)) | 0) + (n >>> 13)) | 0) +
                (yt >>> 26)) |
              0),
              (yt &= 67108863),
              (i = Math.imul(S, D)),
              (n = ((n = Math.imul(S, Z)) + Math.imul(A, D)) | 0),
              (o = Math.imul(A, Z)),
              (i = (i + Math.imul(w, K)) | 0),
              (n = ((n = (n + Math.imul(w, H)) | 0) + Math.imul(M, K)) | 0),
              (o = (o + Math.imul(M, H)) | 0),
              (i = (i + Math.imul(g, $)) | 0),
              (n = ((n = (n + Math.imul(g, W)) | 0) + Math.imul(v, $)) | 0),
              (o = (o + Math.imul(v, W)) | 0),
              (i = (i + Math.imul(p, G)) | 0),
              (n = ((n = (n + Math.imul(p, X)) | 0) + Math.imul(m, G)) | 0),
              (o = (o + Math.imul(m, X)) | 0)
            var wt =
              (((u + (i = (i + Math.imul(d, Q)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(d, tt)) | 0) + Math.imul(l, Q)) |
                    0)) <<
                  13)) |
              0
            ;(u =
              ((((o = (o + Math.imul(l, tt)) | 0) + (n >>> 13)) | 0) +
                (wt >>> 26)) |
              0),
              (wt &= 67108863),
              (i = Math.imul(x, D)),
              (n = ((n = Math.imul(x, Z)) + Math.imul(E, D)) | 0),
              (o = Math.imul(E, Z)),
              (i = (i + Math.imul(S, K)) | 0),
              (n = ((n = (n + Math.imul(S, H)) | 0) + Math.imul(A, K)) | 0),
              (o = (o + Math.imul(A, H)) | 0),
              (i = (i + Math.imul(w, $)) | 0),
              (n = ((n = (n + Math.imul(w, W)) | 0) + Math.imul(M, $)) | 0),
              (o = (o + Math.imul(M, W)) | 0),
              (i = (i + Math.imul(g, G)) | 0),
              (n = ((n = (n + Math.imul(g, X)) | 0) + Math.imul(v, G)) | 0),
              (o = (o + Math.imul(v, X)) | 0),
              (i = (i + Math.imul(p, Q)) | 0),
              (n = ((n = (n + Math.imul(p, tt)) | 0) + Math.imul(m, Q)) | 0),
              (o = (o + Math.imul(m, tt)) | 0)
            var Mt =
              (((u + (i = (i + Math.imul(d, rt)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(d, it)) | 0) + Math.imul(l, rt)) |
                    0)) <<
                  13)) |
              0
            ;(u =
              ((((o = (o + Math.imul(l, it)) | 0) + (n >>> 13)) | 0) +
                (Mt >>> 26)) |
              0),
              (Mt &= 67108863),
              (i = Math.imul(B, D)),
              (n = ((n = Math.imul(B, Z)) + Math.imul(I, D)) | 0),
              (o = Math.imul(I, Z)),
              (i = (i + Math.imul(x, K)) | 0),
              (n = ((n = (n + Math.imul(x, H)) | 0) + Math.imul(E, K)) | 0),
              (o = (o + Math.imul(E, H)) | 0),
              (i = (i + Math.imul(S, $)) | 0),
              (n = ((n = (n + Math.imul(S, W)) | 0) + Math.imul(A, $)) | 0),
              (o = (o + Math.imul(A, W)) | 0),
              (i = (i + Math.imul(w, G)) | 0),
              (n = ((n = (n + Math.imul(w, X)) | 0) + Math.imul(M, G)) | 0),
              (o = (o + Math.imul(M, X)) | 0),
              (i = (i + Math.imul(g, Q)) | 0),
              (n = ((n = (n + Math.imul(g, tt)) | 0) + Math.imul(v, Q)) | 0),
              (o = (o + Math.imul(v, tt)) | 0),
              (i = (i + Math.imul(p, rt)) | 0),
              (n = ((n = (n + Math.imul(p, it)) | 0) + Math.imul(m, rt)) | 0),
              (o = (o + Math.imul(m, it)) | 0)
            var _t =
              (((u + (i = (i + Math.imul(d, ot)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(d, st)) | 0) + Math.imul(l, ot)) |
                    0)) <<
                  13)) |
              0
            ;(u =
              ((((o = (o + Math.imul(l, st)) | 0) + (n >>> 13)) | 0) +
                (_t >>> 26)) |
              0),
              (_t &= 67108863),
              (i = Math.imul(T, D)),
              (n = ((n = Math.imul(T, Z)) + Math.imul(P, D)) | 0),
              (o = Math.imul(P, Z)),
              (i = (i + Math.imul(B, K)) | 0),
              (n = ((n = (n + Math.imul(B, H)) | 0) + Math.imul(I, K)) | 0),
              (o = (o + Math.imul(I, H)) | 0),
              (i = (i + Math.imul(x, $)) | 0),
              (n = ((n = (n + Math.imul(x, W)) | 0) + Math.imul(E, $)) | 0),
              (o = (o + Math.imul(E, W)) | 0),
              (i = (i + Math.imul(S, G)) | 0),
              (n = ((n = (n + Math.imul(S, X)) | 0) + Math.imul(A, G)) | 0),
              (o = (o + Math.imul(A, X)) | 0),
              (i = (i + Math.imul(w, Q)) | 0),
              (n = ((n = (n + Math.imul(w, tt)) | 0) + Math.imul(M, Q)) | 0),
              (o = (o + Math.imul(M, tt)) | 0),
              (i = (i + Math.imul(g, rt)) | 0),
              (n = ((n = (n + Math.imul(g, it)) | 0) + Math.imul(v, rt)) | 0),
              (o = (o + Math.imul(v, it)) | 0),
              (i = (i + Math.imul(p, ot)) | 0),
              (n = ((n = (n + Math.imul(p, st)) | 0) + Math.imul(m, ot)) | 0),
              (o = (o + Math.imul(m, st)) | 0)
            var St =
              (((u + (i = (i + Math.imul(d, ht)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(d, ut)) | 0) + Math.imul(l, ht)) |
                    0)) <<
                  13)) |
              0
            ;(u =
              ((((o = (o + Math.imul(l, ut)) | 0) + (n >>> 13)) | 0) +
                (St >>> 26)) |
              0),
              (St &= 67108863),
              (i = Math.imul(q, D)),
              (n = ((n = Math.imul(q, Z)) + Math.imul(L, D)) | 0),
              (o = Math.imul(L, Z)),
              (i = (i + Math.imul(T, K)) | 0),
              (n = ((n = (n + Math.imul(T, H)) | 0) + Math.imul(P, K)) | 0),
              (o = (o + Math.imul(P, H)) | 0),
              (i = (i + Math.imul(B, $)) | 0),
              (n = ((n = (n + Math.imul(B, W)) | 0) + Math.imul(I, $)) | 0),
              (o = (o + Math.imul(I, W)) | 0),
              (i = (i + Math.imul(x, G)) | 0),
              (n = ((n = (n + Math.imul(x, X)) | 0) + Math.imul(E, G)) | 0),
              (o = (o + Math.imul(E, X)) | 0),
              (i = (i + Math.imul(S, Q)) | 0),
              (n = ((n = (n + Math.imul(S, tt)) | 0) + Math.imul(A, Q)) | 0),
              (o = (o + Math.imul(A, tt)) | 0),
              (i = (i + Math.imul(w, rt)) | 0),
              (n = ((n = (n + Math.imul(w, it)) | 0) + Math.imul(M, rt)) | 0),
              (o = (o + Math.imul(M, it)) | 0),
              (i = (i + Math.imul(g, ot)) | 0),
              (n = ((n = (n + Math.imul(g, st)) | 0) + Math.imul(v, ot)) | 0),
              (o = (o + Math.imul(v, st)) | 0),
              (i = (i + Math.imul(p, ht)) | 0),
              (n = ((n = (n + Math.imul(p, ut)) | 0) + Math.imul(m, ht)) | 0),
              (o = (o + Math.imul(m, ut)) | 0)
            var At =
              (((u + (i = (i + Math.imul(d, dt)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(d, lt)) | 0) + Math.imul(l, dt)) |
                    0)) <<
                  13)) |
              0
            ;(u =
              ((((o = (o + Math.imul(l, lt)) | 0) + (n >>> 13)) | 0) +
                (At >>> 26)) |
              0),
              (At &= 67108863),
              (i = Math.imul(j, D)),
              (n = ((n = Math.imul(j, Z)) + Math.imul(C, D)) | 0),
              (o = Math.imul(C, Z)),
              (i = (i + Math.imul(q, K)) | 0),
              (n = ((n = (n + Math.imul(q, H)) | 0) + Math.imul(L, K)) | 0),
              (o = (o + Math.imul(L, H)) | 0),
              (i = (i + Math.imul(T, $)) | 0),
              (n = ((n = (n + Math.imul(T, W)) | 0) + Math.imul(P, $)) | 0),
              (o = (o + Math.imul(P, W)) | 0),
              (i = (i + Math.imul(B, G)) | 0),
              (n = ((n = (n + Math.imul(B, X)) | 0) + Math.imul(I, G)) | 0),
              (o = (o + Math.imul(I, X)) | 0),
              (i = (i + Math.imul(x, Q)) | 0),
              (n = ((n = (n + Math.imul(x, tt)) | 0) + Math.imul(E, Q)) | 0),
              (o = (o + Math.imul(E, tt)) | 0),
              (i = (i + Math.imul(S, rt)) | 0),
              (n = ((n = (n + Math.imul(S, it)) | 0) + Math.imul(A, rt)) | 0),
              (o = (o + Math.imul(A, it)) | 0),
              (i = (i + Math.imul(w, ot)) | 0),
              (n = ((n = (n + Math.imul(w, st)) | 0) + Math.imul(M, ot)) | 0),
              (o = (o + Math.imul(M, st)) | 0),
              (i = (i + Math.imul(g, ht)) | 0),
              (n = ((n = (n + Math.imul(g, ut)) | 0) + Math.imul(v, ht)) | 0),
              (o = (o + Math.imul(v, ut)) | 0),
              (i = (i + Math.imul(p, dt)) | 0),
              (n = ((n = (n + Math.imul(p, lt)) | 0) + Math.imul(m, dt)) | 0),
              (o = (o + Math.imul(m, lt)) | 0)
            var kt =
              (((u + (i = (i + Math.imul(d, pt)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(d, mt)) | 0) + Math.imul(l, pt)) |
                    0)) <<
                  13)) |
              0
            ;(u =
              ((((o = (o + Math.imul(l, mt)) | 0) + (n >>> 13)) | 0) +
                (kt >>> 26)) |
              0),
              (kt &= 67108863),
              (i = Math.imul(j, K)),
              (n = ((n = Math.imul(j, H)) + Math.imul(C, K)) | 0),
              (o = Math.imul(C, H)),
              (i = (i + Math.imul(q, $)) | 0),
              (n = ((n = (n + Math.imul(q, W)) | 0) + Math.imul(L, $)) | 0),
              (o = (o + Math.imul(L, W)) | 0),
              (i = (i + Math.imul(T, G)) | 0),
              (n = ((n = (n + Math.imul(T, X)) | 0) + Math.imul(P, G)) | 0),
              (o = (o + Math.imul(P, X)) | 0),
              (i = (i + Math.imul(B, Q)) | 0),
              (n = ((n = (n + Math.imul(B, tt)) | 0) + Math.imul(I, Q)) | 0),
              (o = (o + Math.imul(I, tt)) | 0),
              (i = (i + Math.imul(x, rt)) | 0),
              (n = ((n = (n + Math.imul(x, it)) | 0) + Math.imul(E, rt)) | 0),
              (o = (o + Math.imul(E, it)) | 0),
              (i = (i + Math.imul(S, ot)) | 0),
              (n = ((n = (n + Math.imul(S, st)) | 0) + Math.imul(A, ot)) | 0),
              (o = (o + Math.imul(A, st)) | 0),
              (i = (i + Math.imul(w, ht)) | 0),
              (n = ((n = (n + Math.imul(w, ut)) | 0) + Math.imul(M, ht)) | 0),
              (o = (o + Math.imul(M, ut)) | 0),
              (i = (i + Math.imul(g, dt)) | 0),
              (n = ((n = (n + Math.imul(g, lt)) | 0) + Math.imul(v, dt)) | 0),
              (o = (o + Math.imul(v, lt)) | 0)
            var xt =
              (((u + (i = (i + Math.imul(p, pt)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(p, mt)) | 0) + Math.imul(m, pt)) |
                    0)) <<
                  13)) |
              0
            ;(u =
              ((((o = (o + Math.imul(m, mt)) | 0) + (n >>> 13)) | 0) +
                (xt >>> 26)) |
              0),
              (xt &= 67108863),
              (i = Math.imul(j, $)),
              (n = ((n = Math.imul(j, W)) + Math.imul(C, $)) | 0),
              (o = Math.imul(C, W)),
              (i = (i + Math.imul(q, G)) | 0),
              (n = ((n = (n + Math.imul(q, X)) | 0) + Math.imul(L, G)) | 0),
              (o = (o + Math.imul(L, X)) | 0),
              (i = (i + Math.imul(T, Q)) | 0),
              (n = ((n = (n + Math.imul(T, tt)) | 0) + Math.imul(P, Q)) | 0),
              (o = (o + Math.imul(P, tt)) | 0),
              (i = (i + Math.imul(B, rt)) | 0),
              (n = ((n = (n + Math.imul(B, it)) | 0) + Math.imul(I, rt)) | 0),
              (o = (o + Math.imul(I, it)) | 0),
              (i = (i + Math.imul(x, ot)) | 0),
              (n = ((n = (n + Math.imul(x, st)) | 0) + Math.imul(E, ot)) | 0),
              (o = (o + Math.imul(E, st)) | 0),
              (i = (i + Math.imul(S, ht)) | 0),
              (n = ((n = (n + Math.imul(S, ut)) | 0) + Math.imul(A, ht)) | 0),
              (o = (o + Math.imul(A, ut)) | 0),
              (i = (i + Math.imul(w, dt)) | 0),
              (n = ((n = (n + Math.imul(w, lt)) | 0) + Math.imul(M, dt)) | 0),
              (o = (o + Math.imul(M, lt)) | 0)
            var Et =
              (((u + (i = (i + Math.imul(g, pt)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(g, mt)) | 0) + Math.imul(v, pt)) |
                    0)) <<
                  13)) |
              0
            ;(u =
              ((((o = (o + Math.imul(v, mt)) | 0) + (n >>> 13)) | 0) +
                (Et >>> 26)) |
              0),
              (Et &= 67108863),
              (i = Math.imul(j, G)),
              (n = ((n = Math.imul(j, X)) + Math.imul(C, G)) | 0),
              (o = Math.imul(C, X)),
              (i = (i + Math.imul(q, Q)) | 0),
              (n = ((n = (n + Math.imul(q, tt)) | 0) + Math.imul(L, Q)) | 0),
              (o = (o + Math.imul(L, tt)) | 0),
              (i = (i + Math.imul(T, rt)) | 0),
              (n = ((n = (n + Math.imul(T, it)) | 0) + Math.imul(P, rt)) | 0),
              (o = (o + Math.imul(P, it)) | 0),
              (i = (i + Math.imul(B, ot)) | 0),
              (n = ((n = (n + Math.imul(B, st)) | 0) + Math.imul(I, ot)) | 0),
              (o = (o + Math.imul(I, st)) | 0),
              (i = (i + Math.imul(x, ht)) | 0),
              (n = ((n = (n + Math.imul(x, ut)) | 0) + Math.imul(E, ht)) | 0),
              (o = (o + Math.imul(E, ut)) | 0),
              (i = (i + Math.imul(S, dt)) | 0),
              (n = ((n = (n + Math.imul(S, lt)) | 0) + Math.imul(A, dt)) | 0),
              (o = (o + Math.imul(A, lt)) | 0)
            var Rt =
              (((u + (i = (i + Math.imul(w, pt)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(w, mt)) | 0) + Math.imul(M, pt)) |
                    0)) <<
                  13)) |
              0
            ;(u =
              ((((o = (o + Math.imul(M, mt)) | 0) + (n >>> 13)) | 0) +
                (Rt >>> 26)) |
              0),
              (Rt &= 67108863),
              (i = Math.imul(j, Q)),
              (n = ((n = Math.imul(j, tt)) + Math.imul(C, Q)) | 0),
              (o = Math.imul(C, tt)),
              (i = (i + Math.imul(q, rt)) | 0),
              (n = ((n = (n + Math.imul(q, it)) | 0) + Math.imul(L, rt)) | 0),
              (o = (o + Math.imul(L, it)) | 0),
              (i = (i + Math.imul(T, ot)) | 0),
              (n = ((n = (n + Math.imul(T, st)) | 0) + Math.imul(P, ot)) | 0),
              (o = (o + Math.imul(P, st)) | 0),
              (i = (i + Math.imul(B, ht)) | 0),
              (n = ((n = (n + Math.imul(B, ut)) | 0) + Math.imul(I, ht)) | 0),
              (o = (o + Math.imul(I, ut)) | 0),
              (i = (i + Math.imul(x, dt)) | 0),
              (n = ((n = (n + Math.imul(x, lt)) | 0) + Math.imul(E, dt)) | 0),
              (o = (o + Math.imul(E, lt)) | 0)
            var Bt =
              (((u + (i = (i + Math.imul(S, pt)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(S, mt)) | 0) + Math.imul(A, pt)) |
                    0)) <<
                  13)) |
              0
            ;(u =
              ((((o = (o + Math.imul(A, mt)) | 0) + (n >>> 13)) | 0) +
                (Bt >>> 26)) |
              0),
              (Bt &= 67108863),
              (i = Math.imul(j, rt)),
              (n = ((n = Math.imul(j, it)) + Math.imul(C, rt)) | 0),
              (o = Math.imul(C, it)),
              (i = (i + Math.imul(q, ot)) | 0),
              (n = ((n = (n + Math.imul(q, st)) | 0) + Math.imul(L, ot)) | 0),
              (o = (o + Math.imul(L, st)) | 0),
              (i = (i + Math.imul(T, ht)) | 0),
              (n = ((n = (n + Math.imul(T, ut)) | 0) + Math.imul(P, ht)) | 0),
              (o = (o + Math.imul(P, ut)) | 0),
              (i = (i + Math.imul(B, dt)) | 0),
              (n = ((n = (n + Math.imul(B, lt)) | 0) + Math.imul(I, dt)) | 0),
              (o = (o + Math.imul(I, lt)) | 0)
            var It =
              (((u + (i = (i + Math.imul(x, pt)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(x, mt)) | 0) + Math.imul(E, pt)) |
                    0)) <<
                  13)) |
              0
            ;(u =
              ((((o = (o + Math.imul(E, mt)) | 0) + (n >>> 13)) | 0) +
                (It >>> 26)) |
              0),
              (It &= 67108863),
              (i = Math.imul(j, ot)),
              (n = ((n = Math.imul(j, st)) + Math.imul(C, ot)) | 0),
              (o = Math.imul(C, st)),
              (i = (i + Math.imul(q, ht)) | 0),
              (n = ((n = (n + Math.imul(q, ut)) | 0) + Math.imul(L, ht)) | 0),
              (o = (o + Math.imul(L, ut)) | 0),
              (i = (i + Math.imul(T, dt)) | 0),
              (n = ((n = (n + Math.imul(T, lt)) | 0) + Math.imul(P, dt)) | 0),
              (o = (o + Math.imul(P, lt)) | 0)
            var Nt =
              (((u + (i = (i + Math.imul(B, pt)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(B, mt)) | 0) + Math.imul(I, pt)) |
                    0)) <<
                  13)) |
              0
            ;(u =
              ((((o = (o + Math.imul(I, mt)) | 0) + (n >>> 13)) | 0) +
                (Nt >>> 26)) |
              0),
              (Nt &= 67108863),
              (i = Math.imul(j, ht)),
              (n = ((n = Math.imul(j, ut)) + Math.imul(C, ht)) | 0),
              (o = Math.imul(C, ut)),
              (i = (i + Math.imul(q, dt)) | 0),
              (n = ((n = (n + Math.imul(q, lt)) | 0) + Math.imul(L, dt)) | 0),
              (o = (o + Math.imul(L, lt)) | 0)
            var Tt =
              (((u + (i = (i + Math.imul(T, pt)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(T, mt)) | 0) + Math.imul(P, pt)) |
                    0)) <<
                  13)) |
              0
            ;(u =
              ((((o = (o + Math.imul(P, mt)) | 0) + (n >>> 13)) | 0) +
                (Tt >>> 26)) |
              0),
              (Tt &= 67108863),
              (i = Math.imul(j, dt)),
              (n = ((n = Math.imul(j, lt)) + Math.imul(C, dt)) | 0),
              (o = Math.imul(C, lt))
            var Pt =
              (((u + (i = (i + Math.imul(q, pt)) | 0)) | 0) +
                ((8191 &
                  (n =
                    ((n = (n + Math.imul(q, mt)) | 0) + Math.imul(L, pt)) |
                    0)) <<
                  13)) |
              0
            ;(u =
              ((((o = (o + Math.imul(L, mt)) | 0) + (n >>> 13)) | 0) +
                (Pt >>> 26)) |
              0),
              (Pt &= 67108863)
            var Ot =
              (((u + (i = Math.imul(j, pt))) | 0) +
                ((8191 &
                  (n = ((n = Math.imul(j, mt)) + Math.imul(C, pt)) | 0)) <<
                  13)) |
              0
            return (
              (u =
                ((((o = Math.imul(C, mt)) + (n >>> 13)) | 0) + (Ot >>> 26)) |
                0),
              (Ot &= 67108863),
              (h[0] = bt),
              (h[1] = gt),
              (h[2] = vt),
              (h[3] = yt),
              (h[4] = wt),
              (h[5] = Mt),
              (h[6] = _t),
              (h[7] = St),
              (h[8] = At),
              (h[9] = kt),
              (h[10] = xt),
              (h[11] = Et),
              (h[12] = Rt),
              (h[13] = Bt),
              (h[14] = It),
              (h[15] = Nt),
              (h[16] = Tt),
              (h[17] = Pt),
              (h[18] = Ot),
              0 !== u && ((h[19] = u), r.length++),
              r
            )
          }
          function b(t, e, r) {
            ;(r.negative = e.negative ^ t.negative),
              (r.length = t.length + e.length)
            for (var i = 0, n = 0, o = 0; o < r.length - 1; o++) {
              var s = n
              n = 0
              for (
                var a = 67108863 & i,
                  h = Math.min(o, e.length - 1),
                  u = Math.max(0, o - t.length + 1);
                u <= h;
                u++
              ) {
                var f = (0 | t.words[o - u]) * (0 | e.words[u]),
                  d = 67108863 & f
                ;(a = 67108863 & (d = (d + a) | 0)),
                  (n +=
                    (s =
                      ((s = (s + ((f / 67108864) | 0)) | 0) + (d >>> 26)) |
                      0) >>> 26),
                  (s &= 67108863)
              }
              ;(r.words[o] = a), (i = s), (s = n)
            }
            return 0 !== i ? (r.words[o] = i) : r.length--, r._strip()
          }
          function g(t, e, r) {
            return b(t, e, r)
          }
          Math.imul || (m = p),
            (n.prototype.mulTo = function (t, e) {
              var r = this.length + t.length
              return 10 === this.length && 10 === t.length
                ? m(this, t, e)
                : r < 63
                ? p(this, t, e)
                : r < 1024
                ? b(this, t, e)
                : g(this, t, e)
            }),
            (n.prototype.mul = function (t) {
              var e = new n(null)
              return (
                (e.words = new Array(this.length + t.length)), this.mulTo(t, e)
              )
            }),
            (n.prototype.mulf = function (t) {
              var e = new n(null)
              return (
                (e.words = new Array(this.length + t.length)), g(this, t, e)
              )
            }),
            (n.prototype.imul = function (t) {
              return this.clone().mulTo(t, this)
            }),
            (n.prototype.imuln = function (t) {
              var e = t < 0
              e && (t = -t), r('number' == typeof t), r(t < 67108864)
              for (var i = 0, n = 0; n < this.length; n++) {
                var o = (0 | this.words[n]) * t,
                  s = (67108863 & o) + (67108863 & i)
                ;(i >>= 26),
                  (i += (o / 67108864) | 0),
                  (i += s >>> 26),
                  (this.words[n] = 67108863 & s)
              }
              return (
                0 !== i && ((this.words[n] = i), this.length++),
                e ? this.ineg() : this
              )
            }),
            (n.prototype.muln = function (t) {
              return this.clone().imuln(t)
            }),
            (n.prototype.sqr = function () {
              return this.mul(this)
            }),
            (n.prototype.isqr = function () {
              return this.imul(this.clone())
            }),
            (n.prototype.pow = function (t) {
              var e = (function (t) {
                for (var e = new Array(t.bitLength()), r = 0; r < e.length; r++)
                  e[r] = (t.words[(r / 26) | 0] >>> r % 26) & 1
                return e
              })(t)
              if (0 === e.length) return new n(1)
              for (
                var r = this, i = 0;
                i < e.length && 0 === e[i];
                i++, r = r.sqr()
              );
              if (++i < e.length)
                for (var o = r.sqr(); i < e.length; i++, o = o.sqr())
                  0 !== e[i] && (r = r.mul(o))
              return r
            }),
            (n.prototype.iushln = function (t) {
              r('number' == typeof t && t >= 0)
              var e,
                i = t % 26,
                n = (t - i) / 26,
                o = (67108863 >>> (26 - i)) << (26 - i)
              if (0 !== i) {
                var s = 0
                for (e = 0; e < this.length; e++) {
                  var a = this.words[e] & o
                  ;(this.words[e] = (((0 | this.words[e]) - a) << i) | s),
                    (s = a >>> (26 - i))
                }
                s && ((this.words[e] = s), this.length++)
              }
              if (0 !== n) {
                for (e = this.length - 1; e >= 0; e--)
                  this.words[e + n] = this.words[e]
                for (e = 0; e < n; e++) this.words[e] = 0
                this.length += n
              }
              return this._strip()
            }),
            (n.prototype.ishln = function (t) {
              return r(0 === this.negative), this.iushln(t)
            }),
            (n.prototype.iushrn = function (t, e, i) {
              var n
              r('number' == typeof t && t >= 0),
                (n = e ? (e - (e % 26)) / 26 : 0)
              var o = t % 26,
                s = Math.min((t - o) / 26, this.length),
                a = 67108863 ^ ((67108863 >>> o) << o),
                h = i
              if (((n -= s), (n = Math.max(0, n)), h)) {
                for (var u = 0; u < s; u++) h.words[u] = this.words[u]
                h.length = s
              }
              if (0 === s);
              else if (this.length > s)
                for (this.length -= s, u = 0; u < this.length; u++)
                  this.words[u] = this.words[u + s]
              else (this.words[0] = 0), (this.length = 1)
              var f = 0
              for (u = this.length - 1; u >= 0 && (0 !== f || u >= n); u--) {
                var d = 0 | this.words[u]
                ;(this.words[u] = (f << (26 - o)) | (d >>> o)), (f = d & a)
              }
              return (
                h && 0 !== f && (h.words[h.length++] = f),
                0 === this.length && ((this.words[0] = 0), (this.length = 1)),
                this._strip()
              )
            }),
            (n.prototype.ishrn = function (t, e, i) {
              return r(0 === this.negative), this.iushrn(t, e, i)
            }),
            (n.prototype.shln = function (t) {
              return this.clone().ishln(t)
            }),
            (n.prototype.ushln = function (t) {
              return this.clone().iushln(t)
            }),
            (n.prototype.shrn = function (t) {
              return this.clone().ishrn(t)
            }),
            (n.prototype.ushrn = function (t) {
              return this.clone().iushrn(t)
            }),
            (n.prototype.testn = function (t) {
              r('number' == typeof t && t >= 0)
              var e = t % 26,
                i = (t - e) / 26
              return !(this.length <= i || !(this.words[i] & (1 << e)))
            }),
            (n.prototype.imaskn = function (t) {
              r('number' == typeof t && t >= 0)
              var e = t % 26,
                i = (t - e) / 26
              return (
                r(
                  0 === this.negative,
                  'imaskn works only with positive numbers'
                ),
                this.length <= i
                  ? this
                  : (0 !== e && i++,
                    (this.length = Math.min(i, this.length)),
                    0 !== e &&
                      (this.words[this.length - 1] &=
                        67108863 ^ ((67108863 >>> e) << e)),
                    this._strip())
              )
            }),
            (n.prototype.maskn = function (t) {
              return this.clone().imaskn(t)
            }),
            (n.prototype.iaddn = function (t) {
              return (
                r('number' == typeof t),
                r(t < 67108864),
                t < 0
                  ? this.isubn(-t)
                  : 0 !== this.negative
                  ? 1 === this.length && (0 | this.words[0]) <= t
                    ? ((this.words[0] = t - (0 | this.words[0])),
                      (this.negative = 0),
                      this)
                    : ((this.negative = 0),
                      this.isubn(t),
                      (this.negative = 1),
                      this)
                  : this._iaddn(t)
              )
            }),
            (n.prototype._iaddn = function (t) {
              this.words[0] += t
              for (var e = 0; e < this.length && this.words[e] >= 67108864; e++)
                (this.words[e] -= 67108864),
                  e === this.length - 1
                    ? (this.words[e + 1] = 1)
                    : this.words[e + 1]++
              return (this.length = Math.max(this.length, e + 1)), this
            }),
            (n.prototype.isubn = function (t) {
              if ((r('number' == typeof t), r(t < 67108864), t < 0))
                return this.iaddn(-t)
              if (0 !== this.negative)
                return (
                  (this.negative = 0), this.iaddn(t), (this.negative = 1), this
                )
              if (
                ((this.words[0] -= t), 1 === this.length && this.words[0] < 0)
              )
                (this.words[0] = -this.words[0]), (this.negative = 1)
              else
                for (var e = 0; e < this.length && this.words[e] < 0; e++)
                  (this.words[e] += 67108864), (this.words[e + 1] -= 1)
              return this._strip()
            }),
            (n.prototype.addn = function (t) {
              return this.clone().iaddn(t)
            }),
            (n.prototype.subn = function (t) {
              return this.clone().isubn(t)
            }),
            (n.prototype.iabs = function () {
              return (this.negative = 0), this
            }),
            (n.prototype.abs = function () {
              return this.clone().iabs()
            }),
            (n.prototype._ishlnsubmul = function (t, e, i) {
              var n, o
              this._expand(t.length + i)
              var s = 0
              for (n = 0; n < t.length; n++) {
                o = (0 | this.words[n + i]) + s
                var a = (0 | t.words[n]) * e
                ;(s = ((o -= 67108863 & a) >> 26) - ((a / 67108864) | 0)),
                  (this.words[n + i] = 67108863 & o)
              }
              for (; n < this.length - i; n++)
                (s = (o = (0 | this.words[n + i]) + s) >> 26),
                  (this.words[n + i] = 67108863 & o)
              if (0 === s) return this._strip()
              for (r(-1 === s), s = 0, n = 0; n < this.length; n++)
                (s = (o = -(0 | this.words[n]) + s) >> 26),
                  (this.words[n] = 67108863 & o)
              return (this.negative = 1), this._strip()
            }),
            (n.prototype._wordDiv = function (t, e) {
              var r,
                i = this.clone(),
                o = t,
                s = 0 | o.words[o.length - 1]
              0 != (r = 26 - this._countBits(s)) &&
                ((o = o.ushln(r)), i.iushln(r), (s = 0 | o.words[o.length - 1]))
              var a,
                h = i.length - o.length
              if ('mod' !== e) {
                ;((a = new n(null)).length = h + 1),
                  (a.words = new Array(a.length))
                for (var u = 0; u < a.length; u++) a.words[u] = 0
              }
              var f = i.clone()._ishlnsubmul(o, 1, h)
              0 === f.negative && ((i = f), a && (a.words[h] = 1))
              for (var d = h - 1; d >= 0; d--) {
                var l =
                  67108864 * (0 | i.words[o.length + d]) +
                  (0 | i.words[o.length + d - 1])
                for (
                  l = Math.min((l / s) | 0, 67108863), i._ishlnsubmul(o, l, d);
                  0 !== i.negative;

                )
                  l--,
                    (i.negative = 0),
                    i._ishlnsubmul(o, 1, d),
                    i.isZero() || (i.negative ^= 1)
                a && (a.words[d] = l)
              }
              return (
                a && a._strip(),
                i._strip(),
                'div' !== e && 0 !== r && i.iushrn(r),
                { div: a || null, mod: i }
              )
            }),
            (n.prototype.divmod = function (t, e, i) {
              return (
                r(!t.isZero()),
                this.isZero()
                  ? { div: new n(0), mod: new n(0) }
                  : 0 !== this.negative && 0 === t.negative
                  ? ((a = this.neg().divmod(t, e)),
                    'mod' !== e && (o = a.div.neg()),
                    'div' !== e &&
                      ((s = a.mod.neg()), i && 0 !== s.negative && s.iadd(t)),
                    { div: o, mod: s })
                  : 0 === this.negative && 0 !== t.negative
                  ? ((a = this.divmod(t.neg(), e)),
                    'mod' !== e && (o = a.div.neg()),
                    { div: o, mod: a.mod })
                  : 0 != (this.negative & t.negative)
                  ? ((a = this.neg().divmod(t.neg(), e)),
                    'div' !== e &&
                      ((s = a.mod.neg()), i && 0 !== s.negative && s.isub(t)),
                    { div: a.div, mod: s })
                  : t.length > this.length || this.cmp(t) < 0
                  ? { div: new n(0), mod: this }
                  : 1 === t.length
                  ? 'div' === e
                    ? { div: this.divn(t.words[0]), mod: null }
                    : 'mod' === e
                    ? { div: null, mod: new n(this.modrn(t.words[0])) }
                    : {
                        div: this.divn(t.words[0]),
                        mod: new n(this.modrn(t.words[0]))
                      }
                  : this._wordDiv(t, e)
              )
              var o, s, a
            }),
            (n.prototype.div = function (t) {
              return this.divmod(t, 'div', !1).div
            }),
            (n.prototype.mod = function (t) {
              return this.divmod(t, 'mod', !1).mod
            }),
            (n.prototype.umod = function (t) {
              return this.divmod(t, 'mod', !0).mod
            }),
            (n.prototype.divRound = function (t) {
              var e = this.divmod(t)
              if (e.mod.isZero()) return e.div
              var r = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
                i = t.ushrn(1),
                n = t.andln(1),
                o = r.cmp(i)
              return o < 0 || (1 === n && 0 === o)
                ? e.div
                : 0 !== e.div.negative
                ? e.div.isubn(1)
                : e.div.iaddn(1)
            }),
            (n.prototype.modrn = function (t) {
              var e = t < 0
              e && (t = -t), r(t <= 67108863)
              for (
                var i = (1 << 26) % t, n = 0, o = this.length - 1;
                o >= 0;
                o--
              )
                n = (i * n + (0 | this.words[o])) % t
              return e ? -n : n
            }),
            (n.prototype.modn = function (t) {
              return this.modrn(t)
            }),
            (n.prototype.idivn = function (t) {
              var e = t < 0
              e && (t = -t), r(t <= 67108863)
              for (var i = 0, n = this.length - 1; n >= 0; n--) {
                var o = (0 | this.words[n]) + 67108864 * i
                ;(this.words[n] = (o / t) | 0), (i = o % t)
              }
              return this._strip(), e ? this.ineg() : this
            }),
            (n.prototype.divn = function (t) {
              return this.clone().idivn(t)
            }),
            (n.prototype.egcd = function (t) {
              r(0 === t.negative), r(!t.isZero())
              var e = this,
                i = t.clone()
              e = 0 !== e.negative ? e.umod(t) : e.clone()
              for (
                var o = new n(1),
                  s = new n(0),
                  a = new n(0),
                  h = new n(1),
                  u = 0;
                e.isEven() && i.isEven();

              )
                e.iushrn(1), i.iushrn(1), ++u
              for (var f = i.clone(), d = e.clone(); !e.isZero(); ) {
                for (
                  var l = 0, c = 1;
                  0 == (e.words[0] & c) && l < 26;
                  ++l, c <<= 1
                );
                if (l > 0)
                  for (e.iushrn(l); l-- > 0; )
                    (o.isOdd() || s.isOdd()) && (o.iadd(f), s.isub(d)),
                      o.iushrn(1),
                      s.iushrn(1)
                for (
                  var p = 0, m = 1;
                  0 == (i.words[0] & m) && p < 26;
                  ++p, m <<= 1
                );
                if (p > 0)
                  for (i.iushrn(p); p-- > 0; )
                    (a.isOdd() || h.isOdd()) && (a.iadd(f), h.isub(d)),
                      a.iushrn(1),
                      h.iushrn(1)
                e.cmp(i) >= 0
                  ? (e.isub(i), o.isub(a), s.isub(h))
                  : (i.isub(e), a.isub(o), h.isub(s))
              }
              return { a: a, b: h, gcd: i.iushln(u) }
            }),
            (n.prototype._invmp = function (t) {
              r(0 === t.negative), r(!t.isZero())
              var e = this,
                i = t.clone()
              e = 0 !== e.negative ? e.umod(t) : e.clone()
              for (
                var o, s = new n(1), a = new n(0), h = i.clone();
                e.cmpn(1) > 0 && i.cmpn(1) > 0;

              ) {
                for (
                  var u = 0, f = 1;
                  0 == (e.words[0] & f) && u < 26;
                  ++u, f <<= 1
                );
                if (u > 0)
                  for (e.iushrn(u); u-- > 0; )
                    s.isOdd() && s.iadd(h), s.iushrn(1)
                for (
                  var d = 0, l = 1;
                  0 == (i.words[0] & l) && d < 26;
                  ++d, l <<= 1
                );
                if (d > 0)
                  for (i.iushrn(d); d-- > 0; )
                    a.isOdd() && a.iadd(h), a.iushrn(1)
                e.cmp(i) >= 0 ? (e.isub(i), s.isub(a)) : (i.isub(e), a.isub(s))
              }
              return (o = 0 === e.cmpn(1) ? s : a).cmpn(0) < 0 && o.iadd(t), o
            }),
            (n.prototype.gcd = function (t) {
              if (this.isZero()) return t.abs()
              if (t.isZero()) return this.abs()
              var e = this.clone(),
                r = t.clone()
              ;(e.negative = 0), (r.negative = 0)
              for (var i = 0; e.isEven() && r.isEven(); i++)
                e.iushrn(1), r.iushrn(1)
              for (;;) {
                for (; e.isEven(); ) e.iushrn(1)
                for (; r.isEven(); ) r.iushrn(1)
                var n = e.cmp(r)
                if (n < 0) {
                  var o = e
                  ;(e = r), (r = o)
                } else if (0 === n || 0 === r.cmpn(1)) break
                e.isub(r)
              }
              return r.iushln(i)
            }),
            (n.prototype.invm = function (t) {
              return this.egcd(t).a.umod(t)
            }),
            (n.prototype.isEven = function () {
              return 0 == (1 & this.words[0])
            }),
            (n.prototype.isOdd = function () {
              return 1 == (1 & this.words[0])
            }),
            (n.prototype.andln = function (t) {
              return this.words[0] & t
            }),
            (n.prototype.bincn = function (t) {
              r('number' == typeof t)
              var e = t % 26,
                i = (t - e) / 26,
                n = 1 << e
              if (this.length <= i)
                return this._expand(i + 1), (this.words[i] |= n), this
              for (var o = n, s = i; 0 !== o && s < this.length; s++) {
                var a = 0 | this.words[s]
                ;(o = (a += o) >>> 26), (this.words[s] = a &= 67108863)
              }
              return 0 !== o && ((this.words[s] = o), this.length++), this
            }),
            (n.prototype.isZero = function () {
              return 1 === this.length && 0 === this.words[0]
            }),
            (n.prototype.cmpn = function (t) {
              var e,
                i = t < 0
              if (0 !== this.negative && !i) return -1
              if (0 === this.negative && i) return 1
              if ((this._strip(), this.length > 1)) e = 1
              else {
                i && (t = -t), r(t <= 67108863, 'Number is too big')
                var n = 0 | this.words[0]
                e = n === t ? 0 : n < t ? -1 : 1
              }
              return 0 !== this.negative ? 0 | -e : e
            }),
            (n.prototype.cmp = function (t) {
              if (0 !== this.negative && 0 === t.negative) return -1
              if (0 === this.negative && 0 !== t.negative) return 1
              var e = this.ucmp(t)
              return 0 !== this.negative ? 0 | -e : e
            }),
            (n.prototype.ucmp = function (t) {
              if (this.length > t.length) return 1
              if (this.length < t.length) return -1
              for (var e = 0, r = this.length - 1; r >= 0; r--) {
                var i = 0 | this.words[r],
                  n = 0 | t.words[r]
                if (i !== n) {
                  i < n ? (e = -1) : i > n && (e = 1)
                  break
                }
              }
              return e
            }),
            (n.prototype.gtn = function (t) {
              return 1 === this.cmpn(t)
            }),
            (n.prototype.gt = function (t) {
              return 1 === this.cmp(t)
            }),
            (n.prototype.gten = function (t) {
              return this.cmpn(t) >= 0
            }),
            (n.prototype.gte = function (t) {
              return this.cmp(t) >= 0
            }),
            (n.prototype.ltn = function (t) {
              return -1 === this.cmpn(t)
            }),
            (n.prototype.lt = function (t) {
              return -1 === this.cmp(t)
            }),
            (n.prototype.lten = function (t) {
              return this.cmpn(t) <= 0
            }),
            (n.prototype.lte = function (t) {
              return this.cmp(t) <= 0
            }),
            (n.prototype.eqn = function (t) {
              return 0 === this.cmpn(t)
            }),
            (n.prototype.eq = function (t) {
              return 0 === this.cmp(t)
            }),
            (n.red = function (t) {
              return new A(t)
            }),
            (n.prototype.toRed = function (t) {
              return (
                r(!this.red, 'Already a number in reduction context'),
                r(0 === this.negative, 'red works only with positives'),
                t.convertTo(this)._forceRed(t)
              )
            }),
            (n.prototype.fromRed = function () {
              return (
                r(
                  this.red,
                  'fromRed works only with numbers in reduction context'
                ),
                this.red.convertFrom(this)
              )
            }),
            (n.prototype._forceRed = function (t) {
              return (this.red = t), this
            }),
            (n.prototype.forceRed = function (t) {
              return (
                r(!this.red, 'Already a number in reduction context'),
                this._forceRed(t)
              )
            }),
            (n.prototype.redAdd = function (t) {
              return (
                r(this.red, 'redAdd works only with red numbers'),
                this.red.add(this, t)
              )
            }),
            (n.prototype.redIAdd = function (t) {
              return (
                r(this.red, 'redIAdd works only with red numbers'),
                this.red.iadd(this, t)
              )
            }),
            (n.prototype.redSub = function (t) {
              return (
                r(this.red, 'redSub works only with red numbers'),
                this.red.sub(this, t)
              )
            }),
            (n.prototype.redISub = function (t) {
              return (
                r(this.red, 'redISub works only with red numbers'),
                this.red.isub(this, t)
              )
            }),
            (n.prototype.redShl = function (t) {
              return (
                r(this.red, 'redShl works only with red numbers'),
                this.red.shl(this, t)
              )
            }),
            (n.prototype.redMul = function (t) {
              return (
                r(this.red, 'redMul works only with red numbers'),
                this.red._verify2(this, t),
                this.red.mul(this, t)
              )
            }),
            (n.prototype.redIMul = function (t) {
              return (
                r(this.red, 'redMul works only with red numbers'),
                this.red._verify2(this, t),
                this.red.imul(this, t)
              )
            }),
            (n.prototype.redSqr = function () {
              return (
                r(this.red, 'redSqr works only with red numbers'),
                this.red._verify1(this),
                this.red.sqr(this)
              )
            }),
            (n.prototype.redISqr = function () {
              return (
                r(this.red, 'redISqr works only with red numbers'),
                this.red._verify1(this),
                this.red.isqr(this)
              )
            }),
            (n.prototype.redSqrt = function () {
              return (
                r(this.red, 'redSqrt works only with red numbers'),
                this.red._verify1(this),
                this.red.sqrt(this)
              )
            }),
            (n.prototype.redInvm = function () {
              return (
                r(this.red, 'redInvm works only with red numbers'),
                this.red._verify1(this),
                this.red.invm(this)
              )
            }),
            (n.prototype.redNeg = function () {
              return (
                r(this.red, 'redNeg works only with red numbers'),
                this.red._verify1(this),
                this.red.neg(this)
              )
            }),
            (n.prototype.redPow = function (t) {
              return (
                r(this.red && !t.red, 'redPow(normalNum)'),
                this.red._verify1(this),
                this.red.pow(this, t)
              )
            })
          var v = { k256: null, p224: null, p192: null, p25519: null }
          function y(t, e) {
            ;(this.name = t),
              (this.p = new n(e, 16)),
              (this.n = this.p.bitLength()),
              (this.k = new n(1).iushln(this.n).isub(this.p)),
              (this.tmp = this._tmp())
          }
          function w() {
            y.call(
              this,
              'k256',
              'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f'
            )
          }
          function M() {
            y.call(
              this,
              'p224',
              'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001'
            )
          }
          function _() {
            y.call(
              this,
              'p192',
              'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff'
            )
          }
          function S() {
            y.call(
              this,
              '25519',
              '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed'
            )
          }
          function A(t) {
            if ('string' == typeof t) {
              var e = n._prime(t)
              ;(this.m = e.p), (this.prime = e)
            } else r(t.gtn(1), 'modulus must be greater than 1'), (this.m = t), (this.prime = null)
          }
          function k(t) {
            A.call(this, t),
              (this.shift = this.m.bitLength()),
              this.shift % 26 != 0 && (this.shift += 26 - (this.shift % 26)),
              (this.r = new n(1).iushln(this.shift)),
              (this.r2 = this.imod(this.r.sqr())),
              (this.rinv = this.r._invmp(this.m)),
              (this.minv = this.rinv.mul(this.r).isubn(1).div(this.m)),
              (this.minv = this.minv.umod(this.r)),
              (this.minv = this.r.sub(this.minv))
          }
          ;(y.prototype._tmp = function () {
            var t = new n(null)
            return (t.words = new Array(Math.ceil(this.n / 13))), t
          }),
            (y.prototype.ireduce = function (t) {
              var e,
                r = t
              do {
                this.split(r, this.tmp),
                  (e = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength())
              } while (e > this.n)
              var i = e < this.n ? -1 : r.ucmp(this.p)
              return (
                0 === i
                  ? ((r.words[0] = 0), (r.length = 1))
                  : i > 0
                  ? r.isub(this.p)
                  : void 0 !== r.strip
                  ? r.strip()
                  : r._strip(),
                r
              )
            }),
            (y.prototype.split = function (t, e) {
              t.iushrn(this.n, 0, e)
            }),
            (y.prototype.imulK = function (t) {
              return t.imul(this.k)
            }),
            i(w, y),
            (w.prototype.split = function (t, e) {
              for (
                var r = 4194303, i = Math.min(t.length, 9), n = 0;
                n < i;
                n++
              )
                e.words[n] = t.words[n]
              if (((e.length = i), t.length <= 9))
                return (t.words[0] = 0), void (t.length = 1)
              var o = t.words[9]
              for (e.words[e.length++] = o & r, n = 10; n < t.length; n++) {
                var s = 0 | t.words[n]
                ;(t.words[n - 10] = ((s & r) << 4) | (o >>> 22)), (o = s)
              }
              ;(t.words[n - 10] = o >>>= 22),
                (t.length -= 0 === o && t.length > 10 ? 10 : 9)
            }),
            (w.prototype.imulK = function (t) {
              ;(t.words[t.length] = 0),
                (t.words[t.length + 1] = 0),
                (t.length += 2)
              for (var e = 0, r = 0; r < t.length; r++) {
                var i = 0 | t.words[r]
                ;(t.words[r] = 67108863 & (e += 977 * i)),
                  (e = 64 * i + ((e / 67108864) | 0))
              }
              return (
                0 === t.words[t.length - 1] &&
                  (t.length--, 0 === t.words[t.length - 1] && t.length--),
                t
              )
            }),
            i(M, y),
            i(_, y),
            i(S, y),
            (S.prototype.imulK = function (t) {
              for (var e = 0, r = 0; r < t.length; r++) {
                var i = 19 * (0 | t.words[r]) + e,
                  n = 67108863 & i
                ;(i >>>= 26), (t.words[r] = n), (e = i)
              }
              return 0 !== e && (t.words[t.length++] = e), t
            }),
            (n._prime = function (t) {
              if (v[t]) return v[t]
              var e
              if ('k256' === t) e = new w()
              else if ('p224' === t) e = new M()
              else if ('p192' === t) e = new _()
              else {
                if ('p25519' !== t) throw new Error('Unknown prime ' + t)
                e = new S()
              }
              return (v[t] = e), e
            }),
            (A.prototype._verify1 = function (t) {
              r(0 === t.negative, 'red works only with positives'),
                r(t.red, 'red works only with red numbers')
            }),
            (A.prototype._verify2 = function (t, e) {
              r(
                0 == (t.negative | e.negative),
                'red works only with positives'
              ),
                r(t.red && t.red === e.red, 'red works only with red numbers')
            }),
            (A.prototype.imod = function (t) {
              return this.prime
                ? this.prime.ireduce(t)._forceRed(this)
                : (u(t, t.umod(this.m)._forceRed(this)), t)
            }),
            (A.prototype.neg = function (t) {
              return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this)
            }),
            (A.prototype.add = function (t, e) {
              this._verify2(t, e)
              var r = t.add(e)
              return r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this)
            }),
            (A.prototype.iadd = function (t, e) {
              this._verify2(t, e)
              var r = t.iadd(e)
              return r.cmp(this.m) >= 0 && r.isub(this.m), r
            }),
            (A.prototype.sub = function (t, e) {
              this._verify2(t, e)
              var r = t.sub(e)
              return r.cmpn(0) < 0 && r.iadd(this.m), r._forceRed(this)
            }),
            (A.prototype.isub = function (t, e) {
              this._verify2(t, e)
              var r = t.isub(e)
              return r.cmpn(0) < 0 && r.iadd(this.m), r
            }),
            (A.prototype.shl = function (t, e) {
              return this._verify1(t), this.imod(t.ushln(e))
            }),
            (A.prototype.imul = function (t, e) {
              return this._verify2(t, e), this.imod(t.imul(e))
            }),
            (A.prototype.mul = function (t, e) {
              return this._verify2(t, e), this.imod(t.mul(e))
            }),
            (A.prototype.isqr = function (t) {
              return this.imul(t, t.clone())
            }),
            (A.prototype.sqr = function (t) {
              return this.mul(t, t)
            }),
            (A.prototype.sqrt = function (t) {
              if (t.isZero()) return t.clone()
              var e = this.m.andln(3)
              if ((r(e % 2 == 1), 3 === e)) {
                var i = this.m.add(new n(1)).iushrn(2)
                return this.pow(t, i)
              }
              for (
                var o = this.m.subn(1), s = 0;
                !o.isZero() && 0 === o.andln(1);

              )
                s++, o.iushrn(1)
              r(!o.isZero())
              var a = new n(1).toRed(this),
                h = a.redNeg(),
                u = this.m.subn(1).iushrn(1),
                f = this.m.bitLength()
              for (
                f = new n(2 * f * f).toRed(this);
                0 !== this.pow(f, u).cmp(h);

              )
                f.redIAdd(h)
              for (
                var d = this.pow(f, o),
                  l = this.pow(t, o.addn(1).iushrn(1)),
                  c = this.pow(t, o),
                  p = s;
                0 !== c.cmp(a);

              ) {
                for (var m = c, b = 0; 0 !== m.cmp(a); b++) m = m.redSqr()
                r(b < p)
                var g = this.pow(d, new n(1).iushln(p - b - 1))
                ;(l = l.redMul(g)), (d = g.redSqr()), (c = c.redMul(d)), (p = b)
              }
              return l
            }),
            (A.prototype.invm = function (t) {
              var e = t._invmp(this.m)
              return 0 !== e.negative
                ? ((e.negative = 0), this.imod(e).redNeg())
                : this.imod(e)
            }),
            (A.prototype.pow = function (t, e) {
              if (e.isZero()) return new n(1).toRed(this)
              if (0 === e.cmpn(1)) return t.clone()
              var r = new Array(16)
              ;(r[0] = new n(1).toRed(this)), (r[1] = t)
              for (var i = 2; i < r.length; i++) r[i] = this.mul(r[i - 1], t)
              var o = r[0],
                s = 0,
                a = 0,
                h = e.bitLength() % 26
              for (0 === h && (h = 26), i = e.length - 1; i >= 0; i--) {
                for (var u = e.words[i], f = h - 1; f >= 0; f--) {
                  var d = (u >> f) & 1
                  o !== r[0] && (o = this.sqr(o)),
                    0 !== d || 0 !== s
                      ? ((s <<= 1),
                        (s |= d),
                        (4 == ++a || (0 === i && 0 === f)) &&
                          ((o = this.mul(o, r[s])), (a = 0), (s = 0)))
                      : (a = 0)
                }
                h = 26
              }
              return o
            }),
            (A.prototype.convertTo = function (t) {
              var e = t.umod(this.m)
              return e === t ? e.clone() : e
            }),
            (A.prototype.convertFrom = function (t) {
              var e = t.clone()
              return (e.red = null), e
            }),
            (n.mont = function (t) {
              return new k(t)
            }),
            i(k, A),
            (k.prototype.convertTo = function (t) {
              return this.imod(t.ushln(this.shift))
            }),
            (k.prototype.convertFrom = function (t) {
              var e = this.imod(t.mul(this.rinv))
              return (e.red = null), e
            }),
            (k.prototype.imul = function (t, e) {
              if (t.isZero() || e.isZero())
                return (t.words[0] = 0), (t.length = 1), t
              var r = t.imul(e),
                i = r
                  .maskn(this.shift)
                  .mul(this.minv)
                  .imaskn(this.shift)
                  .mul(this.m),
                n = r.isub(i).iushrn(this.shift),
                o = n
              return (
                n.cmp(this.m) >= 0
                  ? (o = n.isub(this.m))
                  : n.cmpn(0) < 0 && (o = n.iadd(this.m)),
                o._forceRed(this)
              )
            }),
            (k.prototype.mul = function (t, e) {
              if (t.isZero() || e.isZero()) return new n(0)._forceRed(this)
              var r = t.mul(e),
                i = r
                  .maskn(this.shift)
                  .mul(this.minv)
                  .imaskn(this.shift)
                  .mul(this.m),
                o = r.isub(i).iushrn(this.shift),
                s = o
              return (
                o.cmp(this.m) >= 0
                  ? (s = o.isub(this.m))
                  : o.cmpn(0) < 0 && (s = o.iadd(this.m)),
                s._forceRed(this)
              )
            }),
            (k.prototype.invm = function (t) {
              return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this)
            })
        })(t, ft)
      }),
      gt = dt(function (t, e) {
        var r =
          (ft && ft.__importDefault) ||
          function (t) {
            return t && t.__esModule ? t : { default: t }
          }
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.getLength = e.decode = e.encode = void 0)
        const i = r(bt)
        function n(t, e) {
          if ('0' === t[0] && '0' === t[1])
            throw new Error('invalid RLP: extra zeros')
          return parseInt(t, e)
        }
        function o(t, e) {
          if (t < 56) return Buffer.from([t + e])
          {
            const r = h(t),
              i = h(e + 55 + r.length / 2)
            return Buffer.from(i + r, 'hex')
          }
        }
        function s(t) {
          let e, r, i, o, a
          const h = [],
            u = t[0]
          if (u <= 127) return { data: t.slice(0, 1), remainder: t.slice(1) }
          if (u <= 183) {
            if (
              ((e = u - 127),
              (i = 128 === u ? Buffer.from([]) : t.slice(1, e)),
              2 === e && i[0] < 128)
            )
              throw new Error('invalid rlp encoding: byte must be less 0x80')
            return { data: i, remainder: t.slice(e) }
          }
          if (u <= 191) {
            if (((r = u - 182), t.length - 1 < r))
              throw new Error('invalid RLP: not enough bytes for string length')
            if (((e = n(t.slice(1, r).toString('hex'), 16)), e <= 55))
              throw new Error(
                'invalid RLP: expected string length to be greater than 55'
              )
            if (((i = t.slice(r, e + r)), i.length < e))
              throw new Error('invalid RLP: not enough bytes for string')
            return { data: i, remainder: t.slice(e + r) }
          }
          if (u <= 247) {
            for (e = u - 191, o = t.slice(1, e); o.length; )
              (a = s(o)), h.push(a.data), (o = a.remainder)
            return { data: h, remainder: t.slice(e) }
          }
          {
            ;(r = u - 246), (e = n(t.slice(1, r).toString('hex'), 16))
            const i = r + e
            if (i > t.length)
              throw new Error(
                'invalid rlp: total length is larger than the data'
              )
            if (((o = t.slice(r, i)), 0 === o.length))
              throw new Error('invalid rlp, List has a invalid length')
            for (; o.length; ) (a = s(o)), h.push(a.data), (o = a.remainder)
            return { data: h, remainder: t.slice(i) }
          }
        }
        function a(t) {
          return '0x' === t.slice(0, 2)
        }
        function h(t) {
          if (t < 0)
            throw new Error('Invalid integer as argument, must be unsigned!')
          const e = t.toString(16)
          return e.length % 2 ? `0${e}` : e
        }
        function u(t) {
          if (!Buffer.isBuffer(t)) {
            if ('string' == typeof t)
              return a(t)
                ? Buffer.from(
                    (e = 'string' != typeof (r = t) ? r : a(r) ? r.slice(2) : r)
                      .length % 2
                      ? `0${e}`
                      : e,
                    'hex'
                  )
                : Buffer.from(t)
            if ('number' == typeof t || 'bigint' == typeof t)
              return t
                ? (function (t) {
                    const e = h(t)
                    return Buffer.from(e, 'hex')
                  })(t)
                : Buffer.from([])
            if (null == t) return Buffer.from([])
            if (t instanceof Uint8Array) return Buffer.from(t)
            if (i.default.isBN(t)) return Buffer.from(t.toArray())
            throw new Error('invalid type')
          }
          var e, r
          return t
        }
        ;(e.encode = function t(e) {
          if (Array.isArray(e)) {
            const r = []
            for (let i = 0; i < e.length; i++) r.push(t(e[i]))
            const i = Buffer.concat(r)
            return Buffer.concat([o(i.length, 192), i])
          }
          {
            const t = u(e)
            return 1 === t.length && t[0] < 128
              ? t
              : Buffer.concat([o(t.length, 128), t])
          }
        }),
          (e.decode = function (t, e = !1) {
            if (!t || 0 === t.length) return Buffer.from([])
            const r = s(u(t))
            if (e) return r
            if (0 !== r.remainder.length) throw new Error('invalid remainder')
            return r.data
          }),
          (e.getLength = function (t) {
            if (!t || 0 === t.length) return Buffer.from([])
            const e = u(t),
              r = e[0]
            if (r <= 127) return e.length
            if (r <= 183) return r - 127
            if (r <= 191) return r - 182
            if (r <= 247) return r - 191
            {
              const t = r - 246
              return t + n(e.slice(1, t).toString('hex'), 16)
            }
          })
      }),
      vt = dt(function (t, e) {
        var r =
            (ft && ft.__createBinding) ||
            (Object.create
              ? function (t, e, r, i) {
                  void 0 === i && (i = r),
                    Object.defineProperty(t, i, {
                      enumerable: !0,
                      get: function () {
                        return e[r]
                      }
                    })
                }
              : function (t, e, r, i) {
                  void 0 === i && (i = r), (t[i] = e[r])
                }),
          i =
            (ft && ft.__setModuleDefault) ||
            (Object.create
              ? function (t, e) {
                  Object.defineProperty(t, 'default', {
                    enumerable: !0,
                    value: e
                  })
                }
              : function (t, e) {
                  t.default = e
                }),
          n =
            (ft && ft.__importStar) ||
            function (t) {
              if (t && t.__esModule) return t
              var e = {}
              if (null != t)
                for (var n in t)
                  'default' !== n &&
                    Object.prototype.hasOwnProperty.call(t, n) &&
                    r(e, t, n)
              return i(e, t), e
            },
          o =
            (ft && ft.__importDefault) ||
            function (t) {
              return t && t.__esModule ? t : { default: t }
            }
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.rlp = e.BN = void 0)
        const s = o(mt)
        e.BN = s.default
        const a = n(gt)
        e.rlp = a
      }),
      yt = dt(function (t, e) {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.KECCAK256_RLP =
            e.KECCAK256_RLP_S =
            e.KECCAK256_RLP_ARRAY =
            e.KECCAK256_RLP_ARRAY_S =
            e.KECCAK256_NULL =
            e.KECCAK256_NULL_S =
            e.TWO_POW256 =
            e.MAX_INTEGER =
            e.MAX_UINT64 =
              void 0),
          (e.MAX_UINT64 = new vt.BN('ffffffffffffffff', 16)),
          (e.MAX_INTEGER = new vt.BN(
            'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
            16
          )),
          (e.TWO_POW256 = new vt.BN(
            '10000000000000000000000000000000000000000000000000000000000000000',
            16
          )),
          (e.KECCAK256_NULL_S =
            'c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'),
          (e.KECCAK256_NULL = P.default.Buffer.from(e.KECCAK256_NULL_S, 'hex')),
          (e.KECCAK256_RLP_ARRAY_S =
            '1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347'),
          (e.KECCAK256_RLP_ARRAY = P.default.Buffer.from(
            e.KECCAK256_RLP_ARRAY_S,
            'hex'
          )),
          (e.KECCAK256_RLP_S =
            '56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421'),
          (e.KECCAK256_RLP = P.default.Buffer.from(e.KECCAK256_RLP_S, 'hex'))
      }),
      wt =
        'function' == typeof __webpack_require__ ? __non_webpack_require__ : lt,
      Mt = (process.config && process.config.variables) || {},
      _t = !!process.env.PREBUILDS_ONLY,
      St = process.versions.modules,
      At =
        (process.versions && process.versions.electron) ||
        process.env.ELECTRON_RUN_AS_NODE ||
        ('undefined' != typeof window &&
          window.process &&
          'renderer' === window.process.type)
          ? 'electron'
          : process.versions && process.versions.nw
          ? 'node-webkit'
          : 'node',
      kt = U.default.arch(),
      xt = U.default.platform(),
      Et =
        process.env.LIBC ||
        ((function (t) {
          return 'linux' === t && T.default.existsSync('/etc/alpine-release')
        })(xt)
          ? 'musl'
          : 'glibc'),
      Rt =
        process.env.ARM_VERSION ||
        ('arm64' === kt ? '8' : Mt.arm_version) ||
        '',
      Bt = (process.versions.uv || '').split('.')[0],
      It = Nt
    function Nt(t) {
      return wt(Nt.path(t))
    }
    function Tt(t) {
      try {
        return T.default.readdirSync(t)
      } catch (t) {
        return []
      }
    }
    function Pt(t, e) {
      var r = Tt(t).filter(e)
      return r[0] && C.default.join(t, r[0])
    }
    function Ot(t) {
      return /\.node$/.test(t)
    }
    function qt(t) {
      var e = t.split('-')
      if (2 === e.length) {
        var r = e[0],
          i = e[1].split('+')
        if (r && i.length && i.every(Boolean))
          return { name: t, platform: r, architectures: i }
      }
    }
    function Lt(t, e) {
      return function (r) {
        return null != r && r.platform === t && r.architectures.includes(e)
      }
    }
    function zt(t, e) {
      return t.architectures.length - e.architectures.length
    }
    function jt(t) {
      var e = t.split('.'),
        r = { file: t, specificity: 0 }
      if ('node' === e.pop()) {
        for (var i = 0; i < e.length; i++) {
          var n = e[i]
          if ('node' === n || 'electron' === n || 'node-webkit' === n)
            r.runtime = n
          else if ('napi' === n) r.napi = !0
          else if ('abi' === n.slice(0, 3)) r.abi = n.slice(3)
          else if ('uv' === n.slice(0, 2)) r.uv = n.slice(2)
          else if ('armv' === n.slice(0, 4)) r.armv = n.slice(4)
          else {
            if ('glibc' !== n && 'musl' !== n) continue
            r.libc = n
          }
          r.specificity++
        }
        return r
      }
    }
    function Ct(t, e) {
      return function (r) {
        return !(
          null == r ||
          (r.runtime !== t &&
            !(function (t) {
              return 'node' === t.runtime && t.napi
            })(r)) ||
          (r.abi !== e && !r.napi) ||
          (r.uv && r.uv !== Bt) ||
          (r.armv && r.armv !== Rt) ||
          (r.libc && r.libc !== Et)
        )
      }
    }
    function Ut(t) {
      return function (e, r) {
        return e.runtime !== r.runtime
          ? e.runtime === t
            ? -1
            : 1
          : e.abi !== r.abi
          ? e.abi
            ? -1
            : 1
          : e.specificity !== r.specificity
          ? e.specificity > r.specificity
            ? -1
            : 1
          : 0
      }
    }
    ;(Nt.path = function (t) {
      t = C.default.resolve(t || '.')
      try {
        var e = wt(C.default.join(t, 'package.json'))
          .name.toUpperCase()
          .replace(/-/g, '_')
        process.env[e + '_PREBUILD'] && (t = process.env[e + '_PREBUILD'])
      } catch (t) {}
      if (!_t) {
        var r = Pt(C.default.join(t, 'build/Release'), Ot)
        if (r) return r
        var i = Pt(C.default.join(t, 'build/Debug'), Ot)
        if (i) return i
      }
      var n = a(t)
      if (n) return n
      var o = a(C.default.dirname(process.execPath))
      if (o) return o
      var s = [
        'platform=' + xt,
        'arch=' + kt,
        'runtime=' + At,
        'abi=' + St,
        'uv=' + Bt,
        Rt ? 'armv=' + Rt : '',
        'libc=' + Et,
        'node=' + process.versions.node,
        process.versions.electron
          ? 'electron=' + process.versions.electron
          : '',
        'function' == typeof __webpack_require__ ? 'webpack=true' : ''
      ]
        .filter(Boolean)
        .join(' ')
      throw new Error(
        'No native build was found for ' + s + '\n    loaded from: ' + t + '\n'
      )
      function a(t) {
        var e = Tt(C.default.join(t, 'prebuilds'))
          .map(qt)
          .filter(Lt(xt, kt))
          .sort(zt)[0]
        if (e) {
          var r = C.default.join(t, 'prebuilds', e.name),
            i = Tt(r).map(jt).filter(Ct(At, St)).sort(Ut(At))[0]
          return i ? C.default.join(r, i.file) : void 0
        }
      }
    }),
      (Nt.parseTags = jt),
      (Nt.matchTags = Ct),
      (Nt.compareTags = Ut),
      (Nt.parseTuple = qt),
      (Nt.matchTuple = Lt),
      (Nt.compareTuples = zt)
    const Dt = 'Impossible case. Please create issue.',
      Zt = 'The tweak was out of range or the resulted private key is invalid',
      Ft = 'The tweak was out of range or equal to zero',
      Kt = 'Public Key could not be parsed',
      Ht = 'Public Key serialization error',
      Vt = 'Signature could not be parsed'
    function $t(t, e) {
      if (!t) throw new Error(e)
    }
    function Wt(t, e, r) {
      if (
        ($t(e instanceof Uint8Array, `Expected ${t} to be an Uint8Array`),
        void 0 !== r)
      )
        if (Array.isArray(r)) {
          const i = `Expected ${t} to be an Uint8Array with length [${r.join(
            ', '
          )}]`
          $t(r.includes(e.length), i)
        } else
          $t(
            e.length === r,
            `Expected ${t} to be an Uint8Array with length ${r}`
          )
    }
    function Jt(t) {
      $t('Boolean' === Xt(t), 'Expected compressed to be a Boolean')
    }
    function Gt(t = (t) => new Uint8Array(t), e) {
      return 'function' == typeof t && (t = t(e)), Wt('output', t, e), t
    }
    function Xt(t) {
      return Object.prototype.toString.call(t).slice(8, -1)
    }
    var Yt = (t) => ({
        contextRandomize(e) {
          if (
            ($t(
              null === e || e instanceof Uint8Array,
              'Expected seed to be an Uint8Array or null'
            ),
            null !== e && Wt('seed', e, 32),
            1 === t.contextRandomize(e))
          )
            throw new Error('Unknow error on context randomization')
        },
        privateKeyVerify: (e) => (
          Wt('private key', e, 32), 0 === t.privateKeyVerify(e)
        ),
        privateKeyNegate(e) {
          switch ((Wt('private key', e, 32), t.privateKeyNegate(e))) {
            case 0:
              return e
            case 1:
              throw new Error(Dt)
          }
        },
        privateKeyTweakAdd(e, r) {
          switch (
            (Wt('private key', e, 32),
            Wt('tweak', r, 32),
            t.privateKeyTweakAdd(e, r))
          ) {
            case 0:
              return e
            case 1:
              throw new Error(Zt)
          }
        },
        privateKeyTweakMul(e, r) {
          switch (
            (Wt('private key', e, 32),
            Wt('tweak', r, 32),
            t.privateKeyTweakMul(e, r))
          ) {
            case 0:
              return e
            case 1:
              throw new Error(Ft)
          }
        },
        publicKeyVerify: (e) => (
          Wt('public key', e, [33, 65]), 0 === t.publicKeyVerify(e)
        ),
        publicKeyCreate(e, r = !0, i) {
          switch (
            (Wt('private key', e, 32),
            Jt(r),
            (i = Gt(i, r ? 33 : 65)),
            t.publicKeyCreate(i, e))
          ) {
            case 0:
              return i
            case 1:
              throw new Error('Private Key is invalid')
            case 2:
              throw new Error(Ht)
          }
        },
        publicKeyConvert(e, r = !0, i) {
          switch (
            (Wt('public key', e, [33, 65]),
            Jt(r),
            (i = Gt(i, r ? 33 : 65)),
            t.publicKeyConvert(i, e))
          ) {
            case 0:
              return i
            case 1:
              throw new Error(Kt)
            case 2:
              throw new Error(Ht)
          }
        },
        publicKeyNegate(e, r = !0, i) {
          switch (
            (Wt('public key', e, [33, 65]),
            Jt(r),
            (i = Gt(i, r ? 33 : 65)),
            t.publicKeyNegate(i, e))
          ) {
            case 0:
              return i
            case 1:
              throw new Error(Kt)
            case 2:
              throw new Error(Dt)
            case 3:
              throw new Error(Ht)
          }
        },
        publicKeyCombine(e, r = !0, i) {
          $t(Array.isArray(e), 'Expected public keys to be an Array'),
            $t(
              e.length > 0,
              'Expected public keys array will have more than zero items'
            )
          for (const t of e) Wt('public key', t, [33, 65])
          switch ((Jt(r), (i = Gt(i, r ? 33 : 65)), t.publicKeyCombine(i, e))) {
            case 0:
              return i
            case 1:
              throw new Error(Kt)
            case 2:
              throw new Error('The sum of the public keys is not valid')
            case 3:
              throw new Error(Ht)
          }
        },
        publicKeyTweakAdd(e, r, i = !0, n) {
          switch (
            (Wt('public key', e, [33, 65]),
            Wt('tweak', r, 32),
            Jt(i),
            (n = Gt(n, i ? 33 : 65)),
            t.publicKeyTweakAdd(n, e, r))
          ) {
            case 0:
              return n
            case 1:
              throw new Error(Kt)
            case 2:
              throw new Error(Zt)
          }
        },
        publicKeyTweakMul(e, r, i = !0, n) {
          switch (
            (Wt('public key', e, [33, 65]),
            Wt('tweak', r, 32),
            Jt(i),
            (n = Gt(n, i ? 33 : 65)),
            t.publicKeyTweakMul(n, e, r))
          ) {
            case 0:
              return n
            case 1:
              throw new Error(Kt)
            case 2:
              throw new Error(Ft)
          }
        },
        signatureNormalize(e) {
          switch ((Wt('signature', e, 64), t.signatureNormalize(e))) {
            case 0:
              return e
            case 1:
              throw new Error(Vt)
          }
        },
        signatureExport(e, r) {
          Wt('signature', e, 64)
          const i = { output: (r = Gt(r, 72)), outputlen: 72 }
          switch (t.signatureExport(i, e)) {
            case 0:
              return r.slice(0, i.outputlen)
            case 1:
              throw new Error(Vt)
            case 2:
              throw new Error(Dt)
          }
        },
        signatureImport(e, r) {
          switch (
            (Wt('signature', e), (r = Gt(r, 64)), t.signatureImport(r, e))
          ) {
            case 0:
              return r
            case 1:
              throw new Error(Vt)
            case 2:
              throw new Error(Dt)
          }
        },
        ecdsaSign(e, r, i = {}, n) {
          Wt('message', e, 32),
            Wt('private key', r, 32),
            $t('Object' === Xt(i), 'Expected options to be an Object'),
            void 0 !== i.data && Wt('options.data', i.data),
            void 0 !== i.noncefn &&
              $t(
                'Function' === Xt(i.noncefn),
                'Expected options.noncefn to be a Function'
              )
          const o = { signature: (n = Gt(n, 64)), recid: null }
          switch (t.ecdsaSign(o, e, r, i.data, i.noncefn)) {
            case 0:
              return o
            case 1:
              throw new Error(
                'The nonce generation function failed, or the private key was invalid'
              )
            case 2:
              throw new Error(Dt)
          }
        },
        ecdsaVerify(e, r, i) {
          switch (
            (Wt('signature', e, 64),
            Wt('message', r, 32),
            Wt('public key', i, [33, 65]),
            t.ecdsaVerify(e, r, i))
          ) {
            case 0:
              return !0
            case 3:
              return !1
            case 1:
              throw new Error(Vt)
            case 2:
              throw new Error(Kt)
          }
        },
        ecdsaRecover(e, r, i, n = !0, o) {
          switch (
            (Wt('signature', e, 64),
            $t(
              'Number' === Xt(r) && r >= 0 && r <= 3,
              'Expected recovery id to be a Number within interval [0, 3]'
            ),
            Wt('message', i, 32),
            Jt(n),
            (o = Gt(o, n ? 33 : 65)),
            t.ecdsaRecover(o, e, r, i))
          ) {
            case 0:
              return o
            case 1:
              throw new Error(Vt)
            case 2:
              throw new Error('Public key could not be recover')
            case 3:
              throw new Error(Dt)
          }
        },
        ecdh(e, r, i = {}, n) {
          switch (
            (Wt('public key', e, [33, 65]),
            Wt('private key', r, 32),
            $t('Object' === Xt(i), 'Expected options to be an Object'),
            void 0 !== i.data && Wt('options.data', i.data),
            void 0 !== i.hashfn
              ? ($t(
                  'Function' === Xt(i.hashfn),
                  'Expected options.hashfn to be a Function'
                ),
                void 0 !== i.xbuf && Wt('options.xbuf', i.xbuf, 32),
                void 0 !== i.ybuf && Wt('options.ybuf', i.ybuf, 32),
                Wt('output', n))
              : (n = Gt(n, 32)),
            t.ecdh(n, e, r, i.data, i.hashfn, i.xbuf, i.ybuf))
          ) {
            case 0:
              return n
            case 1:
              throw new Error(Kt)
            case 2:
              throw new Error('Scalar was invalid (zero or overflow)')
          }
        }
      }),
      Qt = Yt(new (It(__dirname).Secp256k1)()),
      te = ee
    function ee(t, e) {
      if (!t) throw new Error(e || 'Assertion failed')
    }
    ee.equal = function (t, e, r) {
      if (t != e) throw new Error(r || 'Assertion failed: ' + t + ' != ' + e)
    }
    var re,
      ie = dt(function (t, e) {
        var r = e
        function i(t) {
          return 1 === t.length ? '0' + t : t
        }
        function n(t) {
          for (var e = '', r = 0; r < t.length; r++) e += i(t[r].toString(16))
          return e
        }
        ;(r.toArray = function (t, e) {
          if (Array.isArray(t)) return t.slice()
          if (!t) return []
          var r = []
          if ('string' != typeof t) {
            for (var i = 0; i < t.length; i++) r[i] = 0 | t[i]
            return r
          }
          if ('hex' === e)
            for (
              (t = t.replace(/[^a-z0-9]+/gi, '')).length % 2 != 0 &&
                (t = '0' + t),
                i = 0;
              i < t.length;
              i += 2
            )
              r.push(parseInt(t[i] + t[i + 1], 16))
          else
            for (i = 0; i < t.length; i++) {
              var n = t.charCodeAt(i),
                o = n >> 8,
                s = 255 & n
              o ? r.push(o, s) : r.push(s)
            }
          return r
        }),
          (r.zero2 = i),
          (r.toHex = n),
          (r.encode = function (t, e) {
            return 'hex' === e ? n(t) : t
          })
      }),
      ne = dt(function (t, e) {
        var r = e
        ;(r.assert = te),
          (r.toArray = ie.toArray),
          (r.zero2 = ie.zero2),
          (r.toHex = ie.toHex),
          (r.encode = ie.encode),
          (r.getNAF = function (t, e, r) {
            var i = new Array(Math.max(t.bitLength(), r) + 1)
            i.fill(0)
            for (
              var n = 1 << (e + 1), o = t.clone(), s = 0;
              s < i.length;
              s++
            ) {
              var a,
                h = o.andln(n - 1)
              o.isOdd()
                ? o.isubn((a = h > (n >> 1) - 1 ? (n >> 1) - h : h))
                : (a = 0),
                (i[s] = a),
                o.iushrn(1)
            }
            return i
          }),
          (r.getJSF = function (t, e) {
            var r = [[], []]
            ;(t = t.clone()), (e = e.clone())
            for (var i, n = 0, o = 0; t.cmpn(-n) > 0 || e.cmpn(-o) > 0; ) {
              var s,
                a,
                h = (t.andln(3) + n) & 3,
                u = (e.andln(3) + o) & 3
              3 === h && (h = -1),
                3 === u && (u = -1),
                (s =
                  0 == (1 & h)
                    ? 0
                    : (3 != (i = (t.andln(7) + n) & 7) && 5 !== i) || 2 !== u
                    ? h
                    : -h),
                r[0].push(s),
                (a =
                  0 == (1 & u)
                    ? 0
                    : (3 != (i = (e.andln(7) + o) & 7) && 5 !== i) || 2 !== h
                    ? u
                    : -u),
                r[1].push(a),
                2 * n === s + 1 && (n = 1 - n),
                2 * o === a + 1 && (o = 1 - o),
                t.iushrn(1),
                e.iushrn(1)
            }
            return r
          }),
          (r.cachedProperty = function (t, e, r) {
            var i = '_' + e
            t.prototype[e] = function () {
              return void 0 !== this[i] ? this[i] : (this[i] = r.call(this))
            }
          }),
          (r.parseBytes = function (t) {
            return 'string' == typeof t ? r.toArray(t, 'hex') : t
          }),
          (r.intFromLE = function (t) {
            return new pt(t, 'hex', 'le')
          })
      }),
      oe = function (t) {
        return re || (re = new se(null)), re.generate(t)
      }
    function se(t) {
      this.rand = t
    }
    var ae = se
    if (
      ((se.prototype.generate = function (t) {
        return this._rand(t)
      }),
      (se.prototype._rand = function (t) {
        if (this.rand.getBytes) return this.rand.getBytes(t)
        for (var e = new Uint8Array(t), r = 0; r < e.length; r++)
          e[r] = this.rand.getByte()
        return e
      }),
      'object' == typeof self)
    )
      self.crypto && self.crypto.getRandomValues
        ? (se.prototype._rand = function (t) {
            var e = new Uint8Array(t)
            return self.crypto.getRandomValues(e), e
          })
        : self.msCrypto && self.msCrypto.getRandomValues
        ? (se.prototype._rand = function (t) {
            var e = new Uint8Array(t)
            return self.msCrypto.getRandomValues(e), e
          })
        : 'object' == typeof window &&
          (se.prototype._rand = function () {
            throw new Error('Not implemented yet')
          })
    else
      try {
        var he = q.default
        if ('function' != typeof he.randomBytes)
          throw new Error('Not supported')
        se.prototype._rand = function (t) {
          return he.randomBytes(t)
        }
      } catch (t) {}
    oe.Rand = ae
    var ue = ne.getNAF,
      fe = ne.getJSF,
      de = ne.assert
    function le(t, e) {
      ;(this.type = t),
        (this.p = new pt(e.p, 16)),
        (this.red = e.prime ? pt.red(e.prime) : pt.mont(this.p)),
        (this.zero = new pt(0).toRed(this.red)),
        (this.one = new pt(1).toRed(this.red)),
        (this.two = new pt(2).toRed(this.red)),
        (this.n = e.n && new pt(e.n, 16)),
        (this.g = e.g && this.pointFromJSON(e.g, e.gRed)),
        (this._wnafT1 = new Array(4)),
        (this._wnafT2 = new Array(4)),
        (this._wnafT3 = new Array(4)),
        (this._wnafT4 = new Array(4)),
        (this._bitLength = this.n ? this.n.bitLength() : 0)
      var r = this.n && this.p.div(this.n)
      !r || r.cmpn(100) > 0
        ? (this.redN = null)
        : ((this._maxwellTrick = !0), (this.redN = this.n.toRed(this.red)))
    }
    var ce = le
    function pe(t, e) {
      ;(this.curve = t), (this.type = e), (this.precomputed = null)
    }
    ;(le.prototype.point = function () {
      throw new Error('Not implemented')
    }),
      (le.prototype.validate = function () {
        throw new Error('Not implemented')
      }),
      (le.prototype._fixedNafMul = function (t, e) {
        de(t.precomputed)
        var r = t._getDoubles(),
          i = ue(e, 1, this._bitLength),
          n = (1 << (r.step + 1)) - (r.step % 2 == 0 ? 2 : 1)
        n /= 3
        var o,
          s,
          a = []
        for (o = 0; o < i.length; o += r.step) {
          s = 0
          for (var h = o + r.step - 1; h >= o; h--) s = (s << 1) + i[h]
          a.push(s)
        }
        for (
          var u = this.jpoint(null, null, null),
            f = this.jpoint(null, null, null),
            d = n;
          d > 0;
          d--
        ) {
          for (o = 0; o < a.length; o++)
            (s = a[o]) === d
              ? (f = f.mixedAdd(r.points[o]))
              : s === -d && (f = f.mixedAdd(r.points[o].neg()))
          u = u.add(f)
        }
        return u.toP()
      }),
      (le.prototype._wnafMul = function (t, e) {
        for (
          var r = 4,
            i = t._getNAFPoints(r),
            n = i.points,
            o = ue(e, (r = i.wnd), this._bitLength),
            s = this.jpoint(null, null, null),
            a = o.length - 1;
          a >= 0;
          a--
        ) {
          for (var h = 0; a >= 0 && 0 === o[a]; a--) h++
          if ((a >= 0 && h++, (s = s.dblp(h)), a < 0)) break
          var u = o[a]
          de(0 !== u),
            (s =
              'affine' === t.type
                ? s.mixedAdd(u > 0 ? n[(u - 1) >> 1] : n[(-u - 1) >> 1].neg())
                : s.add(u > 0 ? n[(u - 1) >> 1] : n[(-u - 1) >> 1].neg()))
        }
        return 'affine' === t.type ? s.toP() : s
      }),
      (le.prototype._wnafMulAdd = function (t, e, r, i, n) {
        var o,
          s,
          a,
          h = this._wnafT1,
          u = this._wnafT2,
          f = this._wnafT3,
          d = 0
        for (o = 0; o < i; o++) {
          var l = (a = e[o])._getNAFPoints(t)
          ;(h[o] = l.wnd), (u[o] = l.points)
        }
        for (o = i - 1; o >= 1; o -= 2) {
          var c = o - 1,
            p = o
          if (1 === h[c] && 1 === h[p]) {
            var m = [e[c], null, null, e[p]]
            0 === e[c].y.cmp(e[p].y)
              ? ((m[1] = e[c].add(e[p])),
                (m[2] = e[c].toJ().mixedAdd(e[p].neg())))
              : 0 === e[c].y.cmp(e[p].y.redNeg())
              ? ((m[1] = e[c].toJ().mixedAdd(e[p])),
                (m[2] = e[c].add(e[p].neg())))
              : ((m[1] = e[c].toJ().mixedAdd(e[p])),
                (m[2] = e[c].toJ().mixedAdd(e[p].neg())))
            var b = [-3, -1, -5, -7, 0, 7, 5, 1, 3],
              g = fe(r[c], r[p])
            for (
              d = Math.max(g[0].length, d),
                f[c] = new Array(d),
                f[p] = new Array(d),
                s = 0;
              s < d;
              s++
            )
              (f[c][s] = b[3 * (1 + (0 | g[0][s])) + (1 + (0 | g[1][s]))]),
                (f[p][s] = 0),
                (u[c] = m)
          } else
            (f[c] = ue(r[c], h[c], this._bitLength)),
              (f[p] = ue(r[p], h[p], this._bitLength)),
              (d = Math.max(f[c].length, d)),
              (d = Math.max(f[p].length, d))
        }
        var v = this.jpoint(null, null, null),
          y = this._wnafT4
        for (o = d; o >= 0; o--) {
          for (var w = 0; o >= 0; ) {
            var M = !0
            for (s = 0; s < i; s++) (y[s] = 0 | f[s][o]), 0 !== y[s] && (M = !1)
            if (!M) break
            w++, o--
          }
          if ((o >= 0 && w++, (v = v.dblp(w)), o < 0)) break
          for (s = 0; s < i; s++) {
            var _ = y[s]
            0 !== _ &&
              (_ > 0
                ? (a = u[s][(_ - 1) >> 1])
                : _ < 0 && (a = u[s][(-_ - 1) >> 1].neg()),
              (v = 'affine' === a.type ? v.mixedAdd(a) : v.add(a)))
          }
        }
        for (o = 0; o < i; o++) u[o] = null
        return n ? v : v.toP()
      }),
      (le.BasePoint = pe),
      (pe.prototype.eq = function () {
        throw new Error('Not implemented')
      }),
      (pe.prototype.validate = function () {
        return this.curve.validate(this)
      }),
      (le.prototype.decodePoint = function (t, e) {
        t = ne.toArray(t, e)
        var r = this.p.byteLength()
        if ((4 === t[0] || 6 === t[0] || 7 === t[0]) && t.length - 1 == 2 * r)
          return (
            6 === t[0]
              ? de(t[t.length - 1] % 2 == 0)
              : 7 === t[0] && de(t[t.length - 1] % 2 == 1),
            this.point(t.slice(1, 1 + r), t.slice(1 + r, 1 + 2 * r))
          )
        if ((2 === t[0] || 3 === t[0]) && t.length - 1 === r)
          return this.pointFromX(t.slice(1, 1 + r), 3 === t[0])
        throw new Error('Unknown point format')
      }),
      (pe.prototype.encodeCompressed = function (t) {
        return this.encode(t, !0)
      }),
      (pe.prototype._encode = function (t) {
        var e = this.curve.p.byteLength(),
          r = this.getX().toArray('be', e)
        return t
          ? [this.getY().isEven() ? 2 : 3].concat(r)
          : [4].concat(r, this.getY().toArray('be', e))
      }),
      (pe.prototype.encode = function (t, e) {
        return ne.encode(this._encode(e), t)
      }),
      (pe.prototype.precompute = function (t) {
        if (this.precomputed) return this
        var e = { doubles: null, naf: null, beta: null }
        return (
          (e.naf = this._getNAFPoints(8)),
          (e.doubles = this._getDoubles(4, t)),
          (e.beta = this._getBeta()),
          (this.precomputed = e),
          this
        )
      }),
      (pe.prototype._hasDoubles = function (t) {
        if (!this.precomputed) return !1
        var e = this.precomputed.doubles
        return !!e && e.points.length >= Math.ceil((t.bitLength() + 1) / e.step)
      }),
      (pe.prototype._getDoubles = function (t, e) {
        if (this.precomputed && this.precomputed.doubles)
          return this.precomputed.doubles
        for (var r = [this], i = this, n = 0; n < e; n += t) {
          for (var o = 0; o < t; o++) i = i.dbl()
          r.push(i)
        }
        return { step: t, points: r }
      }),
      (pe.prototype._getNAFPoints = function (t) {
        if (this.precomputed && this.precomputed.naf)
          return this.precomputed.naf
        for (
          var e = [this],
            r = (1 << t) - 1,
            i = 1 === r ? null : this.dbl(),
            n = 1;
          n < r;
          n++
        )
          e[n] = e[n - 1].add(i)
        return { wnd: t, points: e }
      }),
      (pe.prototype._getBeta = function () {
        return null
      }),
      (pe.prototype.dblp = function (t) {
        for (var e = this, r = 0; r < t; r++) e = e.dbl()
        return e
      })
    var me = dt(function (t) {
        t.exports =
          'function' == typeof Object.create
            ? function (t, e) {
                e &&
                  ((t.super_ = e),
                  (t.prototype = Object.create(e.prototype, {
                    constructor: {
                      value: t,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0
                    }
                  })))
              }
            : function (t, e) {
                if (e) {
                  t.super_ = e
                  var r = function () {}
                  ;(r.prototype = e.prototype),
                    (t.prototype = new r()),
                    (t.prototype.constructor = t)
                }
              }
      }),
      be = dt(function (t) {
        try {
          var e = z.default
          if ('function' != typeof e.inherits) throw ''
          t.exports = e.inherits
        } catch (e) {
          t.exports = me
        }
      }),
      ge = ne.assert
    function ve(t) {
      ce.call(this, 'short', t),
        (this.a = new pt(t.a, 16).toRed(this.red)),
        (this.b = new pt(t.b, 16).toRed(this.red)),
        (this.tinv = this.two.redInvm()),
        (this.zeroA = 0 === this.a.fromRed().cmpn(0)),
        (this.threeA = 0 === this.a.fromRed().sub(this.p).cmpn(-3)),
        (this.endo = this._getEndomorphism(t)),
        (this._endoWnafT1 = new Array(4)),
        (this._endoWnafT2 = new Array(4))
    }
    be(ve, ce)
    var ye = ve
    function we(t, e, r, i) {
      ce.BasePoint.call(this, t, 'affine'),
        null === e && null === r
          ? ((this.x = null), (this.y = null), (this.inf = !0))
          : ((this.x = new pt(e, 16)),
            (this.y = new pt(r, 16)),
            i &&
              (this.x.forceRed(this.curve.red),
              this.y.forceRed(this.curve.red)),
            this.x.red || (this.x = this.x.toRed(this.curve.red)),
            this.y.red || (this.y = this.y.toRed(this.curve.red)),
            (this.inf = !1))
    }
    function Me(t, e, r, i) {
      ce.BasePoint.call(this, t, 'jacobian'),
        null === e && null === r && null === i
          ? ((this.x = this.curve.one),
            (this.y = this.curve.one),
            (this.z = new pt(0)))
          : ((this.x = new pt(e, 16)),
            (this.y = new pt(r, 16)),
            (this.z = new pt(i, 16))),
        this.x.red || (this.x = this.x.toRed(this.curve.red)),
        this.y.red || (this.y = this.y.toRed(this.curve.red)),
        this.z.red || (this.z = this.z.toRed(this.curve.red)),
        (this.zOne = this.z === this.curve.one)
    }
    function _e(t) {
      ce.call(this, 'mont', t),
        (this.a = new pt(t.a, 16).toRed(this.red)),
        (this.b = new pt(t.b, 16).toRed(this.red)),
        (this.i4 = new pt(4).toRed(this.red).redInvm()),
        (this.two = new pt(2).toRed(this.red)),
        (this.a24 = this.i4.redMul(this.a.redAdd(this.two)))
    }
    ;(ve.prototype._getEndomorphism = function (t) {
      if (this.zeroA && this.g && this.n && 1 === this.p.modn(3)) {
        var e, r
        if (t.beta) e = new pt(t.beta, 16).toRed(this.red)
        else {
          var i = this._getEndoRoots(this.p)
          e = (e = i[0].cmp(i[1]) < 0 ? i[0] : i[1]).toRed(this.red)
        }
        if (t.lambda) r = new pt(t.lambda, 16)
        else {
          var n = this._getEndoRoots(this.n)
          0 === this.g.mul(n[0]).x.cmp(this.g.x.redMul(e))
            ? (r = n[0])
            : ge(0 === this.g.mul((r = n[1])).x.cmp(this.g.x.redMul(e)))
        }
        return {
          beta: e,
          lambda: r,
          basis: t.basis
            ? t.basis.map(function (t) {
                return { a: new pt(t.a, 16), b: new pt(t.b, 16) }
              })
            : this._getEndoBasis(r)
        }
      }
    }),
      (ve.prototype._getEndoRoots = function (t) {
        var e = t === this.p ? this.red : pt.mont(t),
          r = new pt(2).toRed(e).redInvm(),
          i = r.redNeg(),
          n = new pt(3).toRed(e).redNeg().redSqrt().redMul(r)
        return [i.redAdd(n).fromRed(), i.redSub(n).fromRed()]
      }),
      (ve.prototype._getEndoBasis = function (t) {
        for (
          var e,
            r,
            i,
            n,
            o,
            s,
            a,
            h,
            u,
            f = this.n.ushrn(Math.floor(this.n.bitLength() / 2)),
            d = t,
            l = this.n.clone(),
            c = new pt(1),
            p = new pt(0),
            m = new pt(0),
            b = new pt(1),
            g = 0;
          0 !== d.cmpn(0);

        ) {
          var v = l.div(d)
          ;(h = l.sub(v.mul(d))), (u = m.sub(v.mul(c)))
          var y = b.sub(v.mul(p))
          if (!i && h.cmp(f) < 0) (e = a.neg()), (r = c), (i = h.neg()), (n = u)
          else if (i && 2 == ++g) break
          ;(a = h), (l = d), (d = h), (m = c), (c = u), (b = p), (p = y)
        }
        ;(o = h.neg()), (s = u)
        var w = i.sqr().add(n.sqr())
        return (
          o.sqr().add(s.sqr()).cmp(w) >= 0 && ((o = e), (s = r)),
          i.negative && ((i = i.neg()), (n = n.neg())),
          o.negative && ((o = o.neg()), (s = s.neg())),
          [
            { a: i, b: n },
            { a: o, b: s }
          ]
        )
      }),
      (ve.prototype._endoSplit = function (t) {
        var e = this.endo.basis,
          r = e[0],
          i = e[1],
          n = i.b.mul(t).divRound(this.n),
          o = r.b.neg().mul(t).divRound(this.n),
          s = n.mul(r.a),
          a = o.mul(i.a),
          h = n.mul(r.b),
          u = o.mul(i.b)
        return { k1: t.sub(s).sub(a), k2: h.add(u).neg() }
      }),
      (ve.prototype.pointFromX = function (t, e) {
        ;(t = new pt(t, 16)).red || (t = t.toRed(this.red))
        var r = t.redSqr().redMul(t).redIAdd(t.redMul(this.a)).redIAdd(this.b),
          i = r.redSqrt()
        if (0 !== i.redSqr().redSub(r).cmp(this.zero))
          throw new Error('invalid point')
        var n = i.fromRed().isOdd()
        return ((e && !n) || (!e && n)) && (i = i.redNeg()), this.point(t, i)
      }),
      (ve.prototype.validate = function (t) {
        if (t.inf) return !0
        var e = t.x,
          r = t.y,
          i = this.a.redMul(e),
          n = e.redSqr().redMul(e).redIAdd(i).redIAdd(this.b)
        return 0 === r.redSqr().redISub(n).cmpn(0)
      }),
      (ve.prototype._endoWnafMulAdd = function (t, e, r) {
        for (
          var i = this._endoWnafT1, n = this._endoWnafT2, o = 0;
          o < t.length;
          o++
        ) {
          var s = this._endoSplit(e[o]),
            a = t[o],
            h = a._getBeta()
          s.k1.negative && (s.k1.ineg(), (a = a.neg(!0))),
            s.k2.negative && (s.k2.ineg(), (h = h.neg(!0))),
            (i[2 * o] = a),
            (i[2 * o + 1] = h),
            (n[2 * o] = s.k1),
            (n[2 * o + 1] = s.k2)
        }
        for (var u = this._wnafMulAdd(1, i, n, 2 * o, r), f = 0; f < 2 * o; f++)
          (i[f] = null), (n[f] = null)
        return u
      }),
      be(we, ce.BasePoint),
      (ve.prototype.point = function (t, e, r) {
        return new we(this, t, e, r)
      }),
      (ve.prototype.pointFromJSON = function (t, e) {
        return we.fromJSON(this, t, e)
      }),
      (we.prototype._getBeta = function () {
        if (this.curve.endo) {
          var t = this.precomputed
          if (t && t.beta) return t.beta
          var e = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y)
          if (t) {
            var r = this.curve,
              i = function (t) {
                return r.point(t.x.redMul(r.endo.beta), t.y)
              }
            ;(t.beta = e),
              (e.precomputed = {
                beta: null,
                naf: t.naf && { wnd: t.naf.wnd, points: t.naf.points.map(i) },
                doubles: t.doubles && {
                  step: t.doubles.step,
                  points: t.doubles.points.map(i)
                }
              })
          }
          return e
        }
      }),
      (we.prototype.toJSON = function () {
        return this.precomputed
          ? [
              this.x,
              this.y,
              this.precomputed && {
                doubles: this.precomputed.doubles && {
                  step: this.precomputed.doubles.step,
                  points: this.precomputed.doubles.points.slice(1)
                },
                naf: this.precomputed.naf && {
                  wnd: this.precomputed.naf.wnd,
                  points: this.precomputed.naf.points.slice(1)
                }
              }
            ]
          : [this.x, this.y]
      }),
      (we.fromJSON = function (t, e, r) {
        'string' == typeof e && (e = JSON.parse(e))
        var i = t.point(e[0], e[1], r)
        if (!e[2]) return i
        function n(e) {
          return t.point(e[0], e[1], r)
        }
        var o = e[2]
        return (
          (i.precomputed = {
            beta: null,
            doubles: o.doubles && {
              step: o.doubles.step,
              points: [i].concat(o.doubles.points.map(n))
            },
            naf: o.naf && {
              wnd: o.naf.wnd,
              points: [i].concat(o.naf.points.map(n))
            }
          }),
          i
        )
      }),
      (we.prototype.inspect = function () {
        return this.isInfinity()
          ? '<EC Point Infinity>'
          : '<EC Point x: ' +
              this.x.fromRed().toString(16, 2) +
              ' y: ' +
              this.y.fromRed().toString(16, 2) +
              '>'
      }),
      (we.prototype.isInfinity = function () {
        return this.inf
      }),
      (we.prototype.add = function (t) {
        if (this.inf) return t
        if (t.inf) return this
        if (this.eq(t)) return this.dbl()
        if (this.neg().eq(t)) return this.curve.point(null, null)
        if (0 === this.x.cmp(t.x)) return this.curve.point(null, null)
        var e = this.y.redSub(t.y)
        0 !== e.cmpn(0) && (e = e.redMul(this.x.redSub(t.x).redInvm()))
        var r = e.redSqr().redISub(this.x).redISub(t.x),
          i = e.redMul(this.x.redSub(r)).redISub(this.y)
        return this.curve.point(r, i)
      }),
      (we.prototype.dbl = function () {
        if (this.inf) return this
        var t = this.y.redAdd(this.y)
        if (0 === t.cmpn(0)) return this.curve.point(null, null)
        var e = this.curve.a,
          r = this.x.redSqr(),
          i = t.redInvm(),
          n = r.redAdd(r).redIAdd(r).redIAdd(e).redMul(i),
          o = n.redSqr().redISub(this.x.redAdd(this.x)),
          s = n.redMul(this.x.redSub(o)).redISub(this.y)
        return this.curve.point(o, s)
      }),
      (we.prototype.getX = function () {
        return this.x.fromRed()
      }),
      (we.prototype.getY = function () {
        return this.y.fromRed()
      }),
      (we.prototype.mul = function (t) {
        return (
          (t = new pt(t, 16)),
          this.isInfinity()
            ? this
            : this._hasDoubles(t)
            ? this.curve._fixedNafMul(this, t)
            : this.curve.endo
            ? this.curve._endoWnafMulAdd([this], [t])
            : this.curve._wnafMul(this, t)
        )
      }),
      (we.prototype.mulAdd = function (t, e, r) {
        var i = [this, e],
          n = [t, r]
        return this.curve.endo
          ? this.curve._endoWnafMulAdd(i, n)
          : this.curve._wnafMulAdd(1, i, n, 2)
      }),
      (we.prototype.jmulAdd = function (t, e, r) {
        var i = [this, e],
          n = [t, r]
        return this.curve.endo
          ? this.curve._endoWnafMulAdd(i, n, !0)
          : this.curve._wnafMulAdd(1, i, n, 2, !0)
      }),
      (we.prototype.eq = function (t) {
        return (
          this === t ||
          (this.inf === t.inf &&
            (this.inf || (0 === this.x.cmp(t.x) && 0 === this.y.cmp(t.y))))
        )
      }),
      (we.prototype.neg = function (t) {
        if (this.inf) return this
        var e = this.curve.point(this.x, this.y.redNeg())
        if (t && this.precomputed) {
          var r = this.precomputed,
            i = function (t) {
              return t.neg()
            }
          e.precomputed = {
            naf: r.naf && { wnd: r.naf.wnd, points: r.naf.points.map(i) },
            doubles: r.doubles && {
              step: r.doubles.step,
              points: r.doubles.points.map(i)
            }
          }
        }
        return e
      }),
      (we.prototype.toJ = function () {
        return this.inf
          ? this.curve.jpoint(null, null, null)
          : this.curve.jpoint(this.x, this.y, this.curve.one)
      }),
      be(Me, ce.BasePoint),
      (ve.prototype.jpoint = function (t, e, r) {
        return new Me(this, t, e, r)
      }),
      (Me.prototype.toP = function () {
        if (this.isInfinity()) return this.curve.point(null, null)
        var t = this.z.redInvm(),
          e = t.redSqr(),
          r = this.x.redMul(e),
          i = this.y.redMul(e).redMul(t)
        return this.curve.point(r, i)
      }),
      (Me.prototype.neg = function () {
        return this.curve.jpoint(this.x, this.y.redNeg(), this.z)
      }),
      (Me.prototype.add = function (t) {
        if (this.isInfinity()) return t
        if (t.isInfinity()) return this
        var e = t.z.redSqr(),
          r = this.z.redSqr(),
          i = this.x.redMul(e),
          n = t.x.redMul(r),
          o = this.y.redMul(e.redMul(t.z)),
          s = t.y.redMul(r.redMul(this.z)),
          a = i.redSub(n),
          h = o.redSub(s)
        if (0 === a.cmpn(0))
          return 0 !== h.cmpn(0)
            ? this.curve.jpoint(null, null, null)
            : this.dbl()
        var u = a.redSqr(),
          f = u.redMul(a),
          d = i.redMul(u),
          l = h.redSqr().redIAdd(f).redISub(d).redISub(d),
          c = h.redMul(d.redISub(l)).redISub(o.redMul(f)),
          p = this.z.redMul(t.z).redMul(a)
        return this.curve.jpoint(l, c, p)
      }),
      (Me.prototype.mixedAdd = function (t) {
        if (this.isInfinity()) return t.toJ()
        if (t.isInfinity()) return this
        var e = this.z.redSqr(),
          r = this.x,
          i = t.x.redMul(e),
          n = this.y,
          o = t.y.redMul(e).redMul(this.z),
          s = r.redSub(i),
          a = n.redSub(o)
        if (0 === s.cmpn(0))
          return 0 !== a.cmpn(0)
            ? this.curve.jpoint(null, null, null)
            : this.dbl()
        var h = s.redSqr(),
          u = h.redMul(s),
          f = r.redMul(h),
          d = a.redSqr().redIAdd(u).redISub(f).redISub(f),
          l = a.redMul(f.redISub(d)).redISub(n.redMul(u)),
          c = this.z.redMul(s)
        return this.curve.jpoint(d, l, c)
      }),
      (Me.prototype.dblp = function (t) {
        if (0 === t) return this
        if (this.isInfinity()) return this
        if (!t) return this.dbl()
        var e
        if (this.curve.zeroA || this.curve.threeA) {
          var r = this
          for (e = 0; e < t; e++) r = r.dbl()
          return r
        }
        var i = this.curve.a,
          n = this.curve.tinv,
          o = this.x,
          s = this.y,
          a = this.z,
          h = a.redSqr().redSqr(),
          u = s.redAdd(s)
        for (e = 0; e < t; e++) {
          var f = o.redSqr(),
            d = u.redSqr(),
            l = d.redSqr(),
            c = f.redAdd(f).redIAdd(f).redIAdd(i.redMul(h)),
            p = o.redMul(d),
            m = c.redSqr().redISub(p.redAdd(p)),
            b = p.redISub(m),
            g = c.redMul(b)
          g = g.redIAdd(g).redISub(l)
          var v = u.redMul(a)
          e + 1 < t && (h = h.redMul(l)), (o = m), (a = v), (u = g)
        }
        return this.curve.jpoint(o, u.redMul(n), a)
      }),
      (Me.prototype.dbl = function () {
        return this.isInfinity()
          ? this
          : this.curve.zeroA
          ? this._zeroDbl()
          : this.curve.threeA
          ? this._threeDbl()
          : this._dbl()
      }),
      (Me.prototype._zeroDbl = function () {
        var t, e, r
        if (this.zOne) {
          var i = this.x.redSqr(),
            n = this.y.redSqr(),
            o = n.redSqr(),
            s = this.x.redAdd(n).redSqr().redISub(i).redISub(o)
          s = s.redIAdd(s)
          var a = i.redAdd(i).redIAdd(i),
            h = a.redSqr().redISub(s).redISub(s),
            u = o.redIAdd(o)
          ;(u = (u = u.redIAdd(u)).redIAdd(u)),
            (t = h),
            (e = a.redMul(s.redISub(h)).redISub(u)),
            (r = this.y.redAdd(this.y))
        } else {
          var f = this.x.redSqr(),
            d = this.y.redSqr(),
            l = d.redSqr(),
            c = this.x.redAdd(d).redSqr().redISub(f).redISub(l)
          c = c.redIAdd(c)
          var p = f.redAdd(f).redIAdd(f),
            m = p.redSqr(),
            b = l.redIAdd(l)
          ;(b = (b = b.redIAdd(b)).redIAdd(b)),
            (t = m.redISub(c).redISub(c)),
            (e = p.redMul(c.redISub(t)).redISub(b)),
            (r = (r = this.y.redMul(this.z)).redIAdd(r))
        }
        return this.curve.jpoint(t, e, r)
      }),
      (Me.prototype._threeDbl = function () {
        var t, e, r
        if (this.zOne) {
          var i = this.x.redSqr(),
            n = this.y.redSqr(),
            o = n.redSqr(),
            s = this.x.redAdd(n).redSqr().redISub(i).redISub(o)
          s = s.redIAdd(s)
          var a = i.redAdd(i).redIAdd(i).redIAdd(this.curve.a),
            h = a.redSqr().redISub(s).redISub(s)
          t = h
          var u = o.redIAdd(o)
          ;(u = (u = u.redIAdd(u)).redIAdd(u)),
            (e = a.redMul(s.redISub(h)).redISub(u)),
            (r = this.y.redAdd(this.y))
        } else {
          var f = this.z.redSqr(),
            d = this.y.redSqr(),
            l = this.x.redMul(d),
            c = this.x.redSub(f).redMul(this.x.redAdd(f))
          c = c.redAdd(c).redIAdd(c)
          var p = l.redIAdd(l),
            m = (p = p.redIAdd(p)).redAdd(p)
          ;(t = c.redSqr().redISub(m)),
            (r = this.y.redAdd(this.z).redSqr().redISub(d).redISub(f))
          var b = d.redSqr()
          ;(b = (b = (b = b.redIAdd(b)).redIAdd(b)).redIAdd(b)),
            (e = c.redMul(p.redISub(t)).redISub(b))
        }
        return this.curve.jpoint(t, e, r)
      }),
      (Me.prototype._dbl = function () {
        var t = this.curve.a,
          e = this.x,
          r = this.y,
          i = this.z,
          n = i.redSqr().redSqr(),
          o = e.redSqr(),
          s = r.redSqr(),
          a = o.redAdd(o).redIAdd(o).redIAdd(t.redMul(n)),
          h = e.redAdd(e),
          u = (h = h.redIAdd(h)).redMul(s),
          f = a.redSqr().redISub(u.redAdd(u)),
          d = u.redISub(f),
          l = s.redSqr()
        l = (l = (l = l.redIAdd(l)).redIAdd(l)).redIAdd(l)
        var c = a.redMul(d).redISub(l),
          p = r.redAdd(r).redMul(i)
        return this.curve.jpoint(f, c, p)
      }),
      (Me.prototype.trpl = function () {
        if (!this.curve.zeroA) return this.dbl().add(this)
        var t = this.x.redSqr(),
          e = this.y.redSqr(),
          r = this.z.redSqr(),
          i = e.redSqr(),
          n = t.redAdd(t).redIAdd(t),
          o = n.redSqr(),
          s = this.x.redAdd(e).redSqr().redISub(t).redISub(i),
          a = (s = (s = (s = s.redIAdd(s)).redAdd(s).redIAdd(s)).redISub(
            o
          )).redSqr(),
          h = i.redIAdd(i)
        h = (h = (h = h.redIAdd(h)).redIAdd(h)).redIAdd(h)
        var u = n.redIAdd(s).redSqr().redISub(o).redISub(a).redISub(h),
          f = e.redMul(u)
        f = (f = f.redIAdd(f)).redIAdd(f)
        var d = this.x.redMul(a).redISub(f)
        d = (d = d.redIAdd(d)).redIAdd(d)
        var l = this.y.redMul(u.redMul(h.redISub(u)).redISub(s.redMul(a)))
        l = (l = (l = l.redIAdd(l)).redIAdd(l)).redIAdd(l)
        var c = this.z.redAdd(s).redSqr().redISub(r).redISub(a)
        return this.curve.jpoint(d, l, c)
      }),
      (Me.prototype.mul = function (t, e) {
        return (t = new pt(t, e)), this.curve._wnafMul(this, t)
      }),
      (Me.prototype.eq = function (t) {
        if ('affine' === t.type) return this.eq(t.toJ())
        if (this === t) return !0
        var e = this.z.redSqr(),
          r = t.z.redSqr()
        if (0 !== this.x.redMul(r).redISub(t.x.redMul(e)).cmpn(0)) return !1
        var i = e.redMul(this.z),
          n = r.redMul(t.z)
        return 0 === this.y.redMul(n).redISub(t.y.redMul(i)).cmpn(0)
      }),
      (Me.prototype.eqXToP = function (t) {
        var e = this.z.redSqr(),
          r = t.toRed(this.curve.red).redMul(e)
        if (0 === this.x.cmp(r)) return !0
        for (var i = t.clone(), n = this.curve.redN.redMul(e); ; ) {
          if ((i.iadd(this.curve.n), i.cmp(this.curve.p) >= 0)) return !1
          if ((r.redIAdd(n), 0 === this.x.cmp(r))) return !0
        }
      }),
      (Me.prototype.inspect = function () {
        return this.isInfinity()
          ? '<EC JPoint Infinity>'
          : '<EC JPoint x: ' +
              this.x.toString(16, 2) +
              ' y: ' +
              this.y.toString(16, 2) +
              ' z: ' +
              this.z.toString(16, 2) +
              '>'
      }),
      (Me.prototype.isInfinity = function () {
        return 0 === this.z.cmpn(0)
      }),
      be(_e, ce)
    var Se = _e
    function Ae(t, e, r) {
      ce.BasePoint.call(this, t, 'projective'),
        null === e && null === r
          ? ((this.x = this.curve.one), (this.z = this.curve.zero))
          : ((this.x = new pt(e, 16)),
            (this.z = new pt(r, 16)),
            this.x.red || (this.x = this.x.toRed(this.curve.red)),
            this.z.red || (this.z = this.z.toRed(this.curve.red)))
    }
    ;(_e.prototype.validate = function (t) {
      var e = t.normalize().x,
        r = e.redSqr(),
        i = r.redMul(e).redAdd(r.redMul(this.a)).redAdd(e)
      return 0 === i.redSqrt().redSqr().cmp(i)
    }),
      be(Ae, ce.BasePoint),
      (_e.prototype.decodePoint = function (t, e) {
        return this.point(ne.toArray(t, e), 1)
      }),
      (_e.prototype.point = function (t, e) {
        return new Ae(this, t, e)
      }),
      (_e.prototype.pointFromJSON = function (t) {
        return Ae.fromJSON(this, t)
      }),
      (Ae.prototype.precompute = function () {}),
      (Ae.prototype._encode = function () {
        return this.getX().toArray('be', this.curve.p.byteLength())
      }),
      (Ae.fromJSON = function (t, e) {
        return new Ae(t, e[0], e[1] || t.one)
      }),
      (Ae.prototype.inspect = function () {
        return this.isInfinity()
          ? '<EC Point Infinity>'
          : '<EC Point x: ' +
              this.x.fromRed().toString(16, 2) +
              ' z: ' +
              this.z.fromRed().toString(16, 2) +
              '>'
      }),
      (Ae.prototype.isInfinity = function () {
        return 0 === this.z.cmpn(0)
      }),
      (Ae.prototype.dbl = function () {
        var t = this.x.redAdd(this.z).redSqr(),
          e = this.x.redSub(this.z).redSqr(),
          r = t.redSub(e),
          i = t.redMul(e),
          n = r.redMul(e.redAdd(this.curve.a24.redMul(r)))
        return this.curve.point(i, n)
      }),
      (Ae.prototype.add = function () {
        throw new Error('Not supported on Montgomery curve')
      }),
      (Ae.prototype.diffAdd = function (t, e) {
        var r = this.x.redAdd(this.z),
          i = this.x.redSub(this.z),
          n = t.x.redAdd(t.z),
          o = t.x.redSub(t.z).redMul(r),
          s = n.redMul(i),
          a = e.z.redMul(o.redAdd(s).redSqr()),
          h = e.x.redMul(o.redISub(s).redSqr())
        return this.curve.point(a, h)
      }),
      (Ae.prototype.mul = function (t) {
        for (
          var e = t.clone(), r = this, i = this.curve.point(null, null), n = [];
          0 !== e.cmpn(0);
          e.iushrn(1)
        )
          n.push(e.andln(1))
        for (var o = n.length - 1; o >= 0; o--)
          0 === n[o]
            ? ((r = r.diffAdd(i, this)), (i = i.dbl()))
            : ((i = r.diffAdd(i, this)), (r = r.dbl()))
        return i
      }),
      (Ae.prototype.mulAdd = function () {
        throw new Error('Not supported on Montgomery curve')
      }),
      (Ae.prototype.jumlAdd = function () {
        throw new Error('Not supported on Montgomery curve')
      }),
      (Ae.prototype.eq = function (t) {
        return 0 === this.getX().cmp(t.getX())
      }),
      (Ae.prototype.normalize = function () {
        return (
          (this.x = this.x.redMul(this.z.redInvm())),
          (this.z = this.curve.one),
          this
        )
      }),
      (Ae.prototype.getX = function () {
        return this.normalize(), this.x.fromRed()
      })
    var ke = ne.assert
    function xe(t) {
      ;(this.twisted = 1 != (0 | t.a)),
        (this.mOneA = this.twisted && -1 == (0 | t.a)),
        (this.extended = this.mOneA),
        ce.call(this, 'edwards', t),
        (this.a = new pt(t.a, 16).umod(this.red.m)),
        (this.a = this.a.toRed(this.red)),
        (this.c = new pt(t.c, 16).toRed(this.red)),
        (this.c2 = this.c.redSqr()),
        (this.d = new pt(t.d, 16).toRed(this.red)),
        (this.dd = this.d.redAdd(this.d)),
        ke(!this.twisted || 0 === this.c.fromRed().cmpn(1)),
        (this.oneC = 1 == (0 | t.c))
    }
    be(xe, ce)
    var Ee = xe
    function Re(t, e, r, i, n) {
      ce.BasePoint.call(this, t, 'projective'),
        null === e && null === r && null === i
          ? ((this.x = this.curve.zero),
            (this.y = this.curve.one),
            (this.z = this.curve.one),
            (this.t = this.curve.zero),
            (this.zOne = !0))
          : ((this.x = new pt(e, 16)),
            (this.y = new pt(r, 16)),
            (this.z = i ? new pt(i, 16) : this.curve.one),
            (this.t = n && new pt(n, 16)),
            this.x.red || (this.x = this.x.toRed(this.curve.red)),
            this.y.red || (this.y = this.y.toRed(this.curve.red)),
            this.z.red || (this.z = this.z.toRed(this.curve.red)),
            this.t && !this.t.red && (this.t = this.t.toRed(this.curve.red)),
            (this.zOne = this.z === this.curve.one),
            this.curve.extended &&
              !this.t &&
              ((this.t = this.x.redMul(this.y)),
              this.zOne || (this.t = this.t.redMul(this.z.redInvm()))))
    }
    ;(xe.prototype._mulA = function (t) {
      return this.mOneA ? t.redNeg() : this.a.redMul(t)
    }),
      (xe.prototype._mulC = function (t) {
        return this.oneC ? t : this.c.redMul(t)
      }),
      (xe.prototype.jpoint = function (t, e, r, i) {
        return this.point(t, e, r, i)
      }),
      (xe.prototype.pointFromX = function (t, e) {
        ;(t = new pt(t, 16)).red || (t = t.toRed(this.red))
        var r = t.redSqr(),
          i = this.c2.redSub(this.a.redMul(r)),
          n = this.one.redSub(this.c2.redMul(this.d).redMul(r)),
          o = i.redMul(n.redInvm()),
          s = o.redSqrt()
        if (0 !== s.redSqr().redSub(o).cmp(this.zero))
          throw new Error('invalid point')
        var a = s.fromRed().isOdd()
        return ((e && !a) || (!e && a)) && (s = s.redNeg()), this.point(t, s)
      }),
      (xe.prototype.pointFromY = function (t, e) {
        ;(t = new pt(t, 16)).red || (t = t.toRed(this.red))
        var r = t.redSqr(),
          i = r.redSub(this.c2),
          n = r.redMul(this.d).redMul(this.c2).redSub(this.a),
          o = i.redMul(n.redInvm())
        if (0 === o.cmp(this.zero)) {
          if (e) throw new Error('invalid point')
          return this.point(this.zero, t)
        }
        var s = o.redSqrt()
        if (0 !== s.redSqr().redSub(o).cmp(this.zero))
          throw new Error('invalid point')
        return s.fromRed().isOdd() !== e && (s = s.redNeg()), this.point(s, t)
      }),
      (xe.prototype.validate = function (t) {
        if (t.isInfinity()) return !0
        t.normalize()
        var e = t.x.redSqr(),
          r = t.y.redSqr(),
          i = e.redMul(this.a).redAdd(r),
          n = this.c2.redMul(this.one.redAdd(this.d.redMul(e).redMul(r)))
        return 0 === i.cmp(n)
      }),
      be(Re, ce.BasePoint),
      (xe.prototype.pointFromJSON = function (t) {
        return Re.fromJSON(this, t)
      }),
      (xe.prototype.point = function (t, e, r, i) {
        return new Re(this, t, e, r, i)
      }),
      (Re.fromJSON = function (t, e) {
        return new Re(t, e[0], e[1], e[2])
      }),
      (Re.prototype.inspect = function () {
        return this.isInfinity()
          ? '<EC Point Infinity>'
          : '<EC Point x: ' +
              this.x.fromRed().toString(16, 2) +
              ' y: ' +
              this.y.fromRed().toString(16, 2) +
              ' z: ' +
              this.z.fromRed().toString(16, 2) +
              '>'
      }),
      (Re.prototype.isInfinity = function () {
        return (
          0 === this.x.cmpn(0) &&
          (0 === this.y.cmp(this.z) ||
            (this.zOne && 0 === this.y.cmp(this.curve.c)))
        )
      }),
      (Re.prototype._extDbl = function () {
        var t = this.x.redSqr(),
          e = this.y.redSqr(),
          r = this.z.redSqr()
        r = r.redIAdd(r)
        var i = this.curve._mulA(t),
          n = this.x.redAdd(this.y).redSqr().redISub(t).redISub(e),
          o = i.redAdd(e),
          s = o.redSub(r),
          a = i.redSub(e),
          h = n.redMul(s),
          u = o.redMul(a),
          f = n.redMul(a),
          d = s.redMul(o)
        return this.curve.point(h, u, d, f)
      }),
      (Re.prototype._projDbl = function () {
        var t,
          e,
          r,
          i,
          n,
          o,
          s = this.x.redAdd(this.y).redSqr(),
          a = this.x.redSqr(),
          h = this.y.redSqr()
        if (this.curve.twisted) {
          var u = (i = this.curve._mulA(a)).redAdd(h)
          this.zOne
            ? ((t = s.redSub(a).redSub(h).redMul(u.redSub(this.curve.two))),
              (e = u.redMul(i.redSub(h))),
              (r = u.redSqr().redSub(u).redSub(u)))
            : ((n = this.z.redSqr()),
              (o = u.redSub(n).redISub(n)),
              (t = s.redSub(a).redISub(h).redMul(o)),
              (e = u.redMul(i.redSub(h))),
              (r = u.redMul(o)))
        } else
          (i = a.redAdd(h)),
            (n = this.curve._mulC(this.z).redSqr()),
            (o = i.redSub(n).redSub(n)),
            (t = this.curve._mulC(s.redISub(i)).redMul(o)),
            (e = this.curve._mulC(i).redMul(a.redISub(h))),
            (r = i.redMul(o))
        return this.curve.point(t, e, r)
      }),
      (Re.prototype.dbl = function () {
        return this.isInfinity()
          ? this
          : this.curve.extended
          ? this._extDbl()
          : this._projDbl()
      }),
      (Re.prototype._extAdd = function (t) {
        var e = this.y.redSub(this.x).redMul(t.y.redSub(t.x)),
          r = this.y.redAdd(this.x).redMul(t.y.redAdd(t.x)),
          i = this.t.redMul(this.curve.dd).redMul(t.t),
          n = this.z.redMul(t.z.redAdd(t.z)),
          o = r.redSub(e),
          s = n.redSub(i),
          a = n.redAdd(i),
          h = r.redAdd(e),
          u = o.redMul(s),
          f = a.redMul(h),
          d = o.redMul(h),
          l = s.redMul(a)
        return this.curve.point(u, f, l, d)
      }),
      (Re.prototype._projAdd = function (t) {
        var e,
          r,
          i = this.z.redMul(t.z),
          n = i.redSqr(),
          o = this.x.redMul(t.x),
          s = this.y.redMul(t.y),
          a = this.curve.d.redMul(o).redMul(s),
          h = n.redSub(a),
          u = n.redAdd(a),
          f = this.x
            .redAdd(this.y)
            .redMul(t.x.redAdd(t.y))
            .redISub(o)
            .redISub(s),
          d = i.redMul(h).redMul(f)
        return (
          this.curve.twisted
            ? ((e = i.redMul(u).redMul(s.redSub(this.curve._mulA(o)))),
              (r = h.redMul(u)))
            : ((e = i.redMul(u).redMul(s.redSub(o))),
              (r = this.curve._mulC(h).redMul(u))),
          this.curve.point(d, e, r)
        )
      }),
      (Re.prototype.add = function (t) {
        return this.isInfinity()
          ? t
          : t.isInfinity()
          ? this
          : this.curve.extended
          ? this._extAdd(t)
          : this._projAdd(t)
      }),
      (Re.prototype.mul = function (t) {
        return this._hasDoubles(t)
          ? this.curve._fixedNafMul(this, t)
          : this.curve._wnafMul(this, t)
      }),
      (Re.prototype.mulAdd = function (t, e, r) {
        return this.curve._wnafMulAdd(1, [this, e], [t, r], 2, !1)
      }),
      (Re.prototype.jmulAdd = function (t, e, r) {
        return this.curve._wnafMulAdd(1, [this, e], [t, r], 2, !0)
      }),
      (Re.prototype.normalize = function () {
        if (this.zOne) return this
        var t = this.z.redInvm()
        return (
          (this.x = this.x.redMul(t)),
          (this.y = this.y.redMul(t)),
          this.t && (this.t = this.t.redMul(t)),
          (this.z = this.curve.one),
          (this.zOne = !0),
          this
        )
      }),
      (Re.prototype.neg = function () {
        return this.curve.point(
          this.x.redNeg(),
          this.y,
          this.z,
          this.t && this.t.redNeg()
        )
      }),
      (Re.prototype.getX = function () {
        return this.normalize(), this.x.fromRed()
      }),
      (Re.prototype.getY = function () {
        return this.normalize(), this.y.fromRed()
      }),
      (Re.prototype.eq = function (t) {
        return (
          this === t ||
          (0 === this.getX().cmp(t.getX()) && 0 === this.getY().cmp(t.getY()))
        )
      }),
      (Re.prototype.eqXToP = function (t) {
        var e = t.toRed(this.curve.red).redMul(this.z)
        if (0 === this.x.cmp(e)) return !0
        for (var r = t.clone(), i = this.curve.redN.redMul(this.z); ; ) {
          if ((r.iadd(this.curve.n), r.cmp(this.curve.p) >= 0)) return !1
          if ((e.redIAdd(i), 0 === this.x.cmp(e))) return !0
        }
      }),
      (Re.prototype.toP = Re.prototype.normalize),
      (Re.prototype.mixedAdd = Re.prototype.add)
    var Be = dt(function (t, e) {
      var r = e
      ;(r.base = ce), (r.short = ye), (r.mont = Se), (r.edwards = Ee)
    })
    function Ie(t, e) {
      return (
        55296 == (64512 & t.charCodeAt(e)) &&
        !(e < 0 || e + 1 >= t.length) &&
        56320 == (64512 & t.charCodeAt(e + 1))
      )
    }
    function Ne(t) {
      return (
        ((t >>> 24) |
          ((t >>> 8) & 65280) |
          ((t << 8) & 16711680) |
          ((255 & t) << 24)) >>>
        0
      )
    }
    function Te(t) {
      return 1 === t.length ? '0' + t : t
    }
    function Pe(t) {
      return 7 === t.length
        ? '0' + t
        : 6 === t.length
        ? '00' + t
        : 5 === t.length
        ? '000' + t
        : 4 === t.length
        ? '0000' + t
        : 3 === t.length
        ? '00000' + t
        : 2 === t.length
        ? '000000' + t
        : 1 === t.length
        ? '0000000' + t
        : t
    }
    var Oe = {
      inherits: be,
      toArray: function (t, e) {
        if (Array.isArray(t)) return t.slice()
        if (!t) return []
        var r = []
        if ('string' == typeof t)
          if (e) {
            if ('hex' === e)
              for (
                (t = t.replace(/[^a-z0-9]+/gi, '')).length % 2 != 0 &&
                  (t = '0' + t),
                  n = 0;
                n < t.length;
                n += 2
              )
                r.push(parseInt(t[n] + t[n + 1], 16))
          } else
            for (var i = 0, n = 0; n < t.length; n++) {
              var o = t.charCodeAt(n)
              o < 128
                ? (r[i++] = o)
                : o < 2048
                ? ((r[i++] = (o >> 6) | 192), (r[i++] = (63 & o) | 128))
                : Ie(t, n)
                ? ((o =
                    65536 + ((1023 & o) << 10) + (1023 & t.charCodeAt(++n))),
                  (r[i++] = (o >> 18) | 240),
                  (r[i++] = ((o >> 12) & 63) | 128),
                  (r[i++] = ((o >> 6) & 63) | 128),
                  (r[i++] = (63 & o) | 128))
                : ((r[i++] = (o >> 12) | 224),
                  (r[i++] = ((o >> 6) & 63) | 128),
                  (r[i++] = (63 & o) | 128))
            }
        else for (n = 0; n < t.length; n++) r[n] = 0 | t[n]
        return r
      },
      toHex: function (t) {
        for (var e = '', r = 0; r < t.length; r++) e += Te(t[r].toString(16))
        return e
      },
      htonl: Ne,
      toHex32: function (t, e) {
        for (var r = '', i = 0; i < t.length; i++) {
          var n = t[i]
          'little' === e && (n = Ne(n)), (r += Pe(n.toString(16)))
        }
        return r
      },
      zero2: Te,
      zero8: Pe,
      join32: function (t, e, r, i) {
        var n = r - e
        te(n % 4 == 0)
        for (var o = new Array(n / 4), s = 0, a = e; s < o.length; s++, a += 4)
          o[s] =
            ('big' === i
              ? (t[a] << 24) | (t[a + 1] << 16) | (t[a + 2] << 8) | t[a + 3]
              : (t[a + 3] << 24) |
                (t[a + 2] << 16) |
                (t[a + 1] << 8) |
                t[a]) >>> 0
        return o
      },
      split32: function (t, e) {
        for (
          var r = new Array(4 * t.length), i = 0, n = 0;
          i < t.length;
          i++, n += 4
        ) {
          var o = t[i]
          'big' === e
            ? ((r[n] = o >>> 24),
              (r[n + 1] = (o >>> 16) & 255),
              (r[n + 2] = (o >>> 8) & 255),
              (r[n + 3] = 255 & o))
            : ((r[n + 3] = o >>> 24),
              (r[n + 2] = (o >>> 16) & 255),
              (r[n + 1] = (o >>> 8) & 255),
              (r[n] = 255 & o))
        }
        return r
      },
      rotr32: function (t, e) {
        return (t >>> e) | (t << (32 - e))
      },
      rotl32: function (t, e) {
        return (t << e) | (t >>> (32 - e))
      },
      sum32: function (t, e) {
        return (t + e) >>> 0
      },
      sum32_3: function (t, e, r) {
        return (t + e + r) >>> 0
      },
      sum32_4: function (t, e, r, i) {
        return (t + e + r + i) >>> 0
      },
      sum32_5: function (t, e, r, i, n) {
        return (t + e + r + i + n) >>> 0
      },
      sum64: function (t, e, r, i) {
        var n = (i + t[e + 1]) >>> 0
        ;(t[e] = ((n < i ? 1 : 0) + r + t[e]) >>> 0), (t[e + 1] = n)
      },
      sum64_hi: function (t, e, r, i) {
        return (((e + i) >>> 0 < e ? 1 : 0) + t + r) >>> 0
      },
      sum64_lo: function (t, e, r, i) {
        return (e + i) >>> 0
      },
      sum64_4_hi: function (t, e, r, i, n, o, s, a) {
        var h = 0,
          u = e
        return (
          (h += (u = (u + i) >>> 0) < e ? 1 : 0),
          (h += (u = (u + o) >>> 0) < o ? 1 : 0),
          (t + r + n + s + (h += (u = (u + a) >>> 0) < a ? 1 : 0)) >>> 0
        )
      },
      sum64_4_lo: function (t, e, r, i, n, o, s, a) {
        return (e + i + o + a) >>> 0
      },
      sum64_5_hi: function (t, e, r, i, n, o, s, a, h, u) {
        var f = 0,
          d = e
        return (
          (f += (d = (d + i) >>> 0) < e ? 1 : 0),
          (f += (d = (d + o) >>> 0) < o ? 1 : 0),
          (f += (d = (d + a) >>> 0) < a ? 1 : 0),
          (t + r + n + s + h + (f += (d = (d + u) >>> 0) < u ? 1 : 0)) >>> 0
        )
      },
      sum64_5_lo: function (t, e, r, i, n, o, s, a, h, u) {
        return (e + i + o + a + u) >>> 0
      },
      rotr64_hi: function (t, e, r) {
        return ((e << (32 - r)) | (t >>> r)) >>> 0
      },
      rotr64_lo: function (t, e, r) {
        return ((t << (32 - r)) | (e >>> r)) >>> 0
      },
      shr64_hi: function (t, e, r) {
        return t >>> r
      },
      shr64_lo: function (t, e, r) {
        return ((t << (32 - r)) | (e >>> r)) >>> 0
      }
    }
    function qe() {
      ;(this.pending = null),
        (this.pendingTotal = 0),
        (this.blockSize = this.constructor.blockSize),
        (this.outSize = this.constructor.outSize),
        (this.hmacStrength = this.constructor.hmacStrength),
        (this.padLength = this.constructor.padLength / 8),
        (this.endian = 'big'),
        (this._delta8 = this.blockSize / 8),
        (this._delta32 = this.blockSize / 32)
    }
    var Le = qe
    ;(qe.prototype.update = function (t, e) {
      if (
        ((t = Oe.toArray(t, e)),
        (this.pending = this.pending ? this.pending.concat(t) : t),
        (this.pendingTotal += t.length),
        this.pending.length >= this._delta8)
      ) {
        var r = (t = this.pending).length % this._delta8
        ;(this.pending = t.slice(t.length - r, t.length)),
          0 === this.pending.length && (this.pending = null),
          (t = Oe.join32(t, 0, t.length - r, this.endian))
        for (var i = 0; i < t.length; i += this._delta32)
          this._update(t, i, i + this._delta32)
      }
      return this
    }),
      (qe.prototype.digest = function (t) {
        return (
          this.update(this._pad()), te(null === this.pending), this._digest(t)
        )
      }),
      (qe.prototype._pad = function () {
        var t = this.pendingTotal,
          e = this._delta8,
          r = e - ((t + this.padLength) % e),
          i = new Array(r + this.padLength)
        i[0] = 128
        for (var n = 1; n < r; n++) i[n] = 0
        if (((t <<= 3), 'big' === this.endian)) {
          for (var o = 8; o < this.padLength; o++) i[n++] = 0
          ;(i[n++] = 0),
            (i[n++] = 0),
            (i[n++] = 0),
            (i[n++] = 0),
            (i[n++] = (t >>> 24) & 255),
            (i[n++] = (t >>> 16) & 255),
            (i[n++] = (t >>> 8) & 255),
            (i[n++] = 255 & t)
        } else
          for (
            i[n++] = 255 & t,
              i[n++] = (t >>> 8) & 255,
              i[n++] = (t >>> 16) & 255,
              i[n++] = (t >>> 24) & 255,
              i[n++] = 0,
              i[n++] = 0,
              i[n++] = 0,
              i[n++] = 0,
              o = 8;
            o < this.padLength;
            o++
          )
            i[n++] = 0
        return i
      })
    var ze = { BlockHash: Le },
      je = Oe.rotr32
    function Ce(t, e, r) {
      return (t & e) ^ (~t & r)
    }
    function Ue(t, e, r) {
      return (t & e) ^ (t & r) ^ (e & r)
    }
    var De = Ce,
      Ze = Ue,
      Fe = Oe.rotl32,
      Ke = Oe.sum32,
      He = Oe.sum32_5,
      Ve = function (t, e, r, i) {
        return 0 === t
          ? Ce(e, r, i)
          : 1 === t || 3 === t
          ? (function (t, e, r) {
              return t ^ e ^ r
            })(e, r, i)
          : 2 === t
          ? Ue(e, r, i)
          : void 0
      },
      $e = ze.BlockHash,
      We = [1518500249, 1859775393, 2400959708, 3395469782]
    function Je() {
      if (!(this instanceof Je)) return new Je()
      $e.call(this),
        (this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520]),
        (this.W = new Array(80))
    }
    Oe.inherits(Je, $e)
    var Ge = Je
    ;(Je.blockSize = 512),
      (Je.outSize = 160),
      (Je.hmacStrength = 80),
      (Je.padLength = 64),
      (Je.prototype._update = function (t, e) {
        for (var r = this.W, i = 0; i < 16; i++) r[i] = t[e + i]
        for (; i < r.length; i++)
          r[i] = Fe(r[i - 3] ^ r[i - 8] ^ r[i - 14] ^ r[i - 16], 1)
        var n = this.h[0],
          o = this.h[1],
          s = this.h[2],
          a = this.h[3],
          h = this.h[4]
        for (i = 0; i < r.length; i++) {
          var u = ~~(i / 20),
            f = He(Fe(n, 5), Ve(u, o, s, a), h, r[i], We[u])
          ;(h = a), (a = s), (s = Fe(o, 30)), (o = n), (n = f)
        }
        ;(this.h[0] = Ke(this.h[0], n)),
          (this.h[1] = Ke(this.h[1], o)),
          (this.h[2] = Ke(this.h[2], s)),
          (this.h[3] = Ke(this.h[3], a)),
          (this.h[4] = Ke(this.h[4], h))
      }),
      (Je.prototype._digest = function (t) {
        return 'hex' === t
          ? Oe.toHex32(this.h, 'big')
          : Oe.split32(this.h, 'big')
      })
    var Xe = Oe.sum32,
      Ye = Oe.sum32_4,
      Qe = Oe.sum32_5,
      tr = De,
      er = Ze,
      rr = function (t) {
        return je(t, 2) ^ je(t, 13) ^ je(t, 22)
      },
      ir = function (t) {
        return je(t, 6) ^ je(t, 11) ^ je(t, 25)
      },
      nr = function (t) {
        return je(t, 7) ^ je(t, 18) ^ (t >>> 3)
      },
      or = ze.BlockHash,
      sr = [
        1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993,
        2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987,
        1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774,
        264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
        2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711,
        113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291,
        1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411,
        3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344,
        430227734, 506948616, 659060556, 883997877, 958139571, 1322822218,
        1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424,
        2428436474, 2756734187, 3204031479, 3329325298
      ]
    function ar() {
      if (!(this instanceof ar)) return new ar()
      or.call(this),
        (this.h = [
          1779033703, 3144134277, 1013904242, 2773480762, 1359893119,
          2600822924, 528734635, 1541459225
        ]),
        (this.k = sr),
        (this.W = new Array(64))
    }
    Oe.inherits(ar, or)
    var hr = ar
    function ur() {
      if (!(this instanceof ur)) return new ur()
      hr.call(this),
        (this.h = [
          3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025,
          1694076839, 3204075428
        ])
    }
    ;(ar.blockSize = 512),
      (ar.outSize = 256),
      (ar.hmacStrength = 192),
      (ar.padLength = 64),
      (ar.prototype._update = function (t, e) {
        for (var r = this.W, i = 0; i < 16; i++) r[i] = t[e + i]
        for (; i < r.length; i++)
          r[i] = Ye(
            je((n = r[i - 2]), 17) ^ je(n, 19) ^ (n >>> 10),
            r[i - 7],
            nr(r[i - 15]),
            r[i - 16]
          )
        var n,
          o = this.h[0],
          s = this.h[1],
          a = this.h[2],
          h = this.h[3],
          u = this.h[4],
          f = this.h[5],
          d = this.h[6],
          l = this.h[7]
        for (te(this.k.length === r.length), i = 0; i < r.length; i++) {
          var c = Qe(l, ir(u), tr(u, f, d), this.k[i], r[i]),
            p = Xe(rr(o), er(o, s, a))
          ;(l = d),
            (d = f),
            (f = u),
            (u = Xe(h, c)),
            (h = a),
            (a = s),
            (s = o),
            (o = Xe(c, p))
        }
        ;(this.h[0] = Xe(this.h[0], o)),
          (this.h[1] = Xe(this.h[1], s)),
          (this.h[2] = Xe(this.h[2], a)),
          (this.h[3] = Xe(this.h[3], h)),
          (this.h[4] = Xe(this.h[4], u)),
          (this.h[5] = Xe(this.h[5], f)),
          (this.h[6] = Xe(this.h[6], d)),
          (this.h[7] = Xe(this.h[7], l))
      }),
      (ar.prototype._digest = function (t) {
        return 'hex' === t
          ? Oe.toHex32(this.h, 'big')
          : Oe.split32(this.h, 'big')
      }),
      Oe.inherits(ur, hr)
    var fr = ur
    ;(ur.blockSize = 512),
      (ur.outSize = 224),
      (ur.hmacStrength = 192),
      (ur.padLength = 64),
      (ur.prototype._digest = function (t) {
        return 'hex' === t
          ? Oe.toHex32(this.h.slice(0, 7), 'big')
          : Oe.split32(this.h.slice(0, 7), 'big')
      })
    var dr = Oe.rotr64_hi,
      lr = Oe.rotr64_lo,
      cr = Oe.shr64_hi,
      pr = Oe.shr64_lo,
      mr = Oe.sum64,
      br = Oe.sum64_hi,
      gr = Oe.sum64_lo,
      vr = Oe.sum64_4_hi,
      yr = Oe.sum64_4_lo,
      wr = Oe.sum64_5_hi,
      Mr = Oe.sum64_5_lo,
      _r = ze.BlockHash,
      Sr = [
        1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399,
        3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265,
        2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394,
        310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994,
        1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317,
        3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139,
        264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901,
        1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837,
        2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879,
        3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901,
        113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964,
        773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823,
        1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142,
        2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273,
        3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344,
        3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720,
        430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593,
        883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403,
        1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012,
        2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044,
        2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573,
        3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711,
        3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554,
        174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315,
        685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100,
        1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866,
        1607167915, 987167468, 1816402316, 1246189591
      ]
    function Ar() {
      if (!(this instanceof Ar)) return new Ar()
      _r.call(this),
        (this.h = [
          1779033703, 4089235720, 3144134277, 2227873595, 1013904242,
          4271175723, 2773480762, 1595750129, 1359893119, 2917565137,
          2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209
        ]),
        (this.k = Sr),
        (this.W = new Array(160))
    }
    Oe.inherits(Ar, _r)
    var kr = Ar
    function xr(t, e, r, i, n) {
      var o = (t & r) ^ (~t & n)
      return o < 0 && (o += 4294967296), o
    }
    function Er(t, e, r, i, n, o) {
      var s = (e & i) ^ (~e & o)
      return s < 0 && (s += 4294967296), s
    }
    function Rr(t, e, r, i, n) {
      var o = (t & r) ^ (t & n) ^ (r & n)
      return o < 0 && (o += 4294967296), o
    }
    function Br(t, e, r, i, n, o) {
      var s = (e & i) ^ (e & o) ^ (i & o)
      return s < 0 && (s += 4294967296), s
    }
    function Ir(t, e) {
      var r = dr(t, e, 28) ^ dr(e, t, 2) ^ dr(e, t, 7)
      return r < 0 && (r += 4294967296), r
    }
    function Nr(t, e) {
      var r = lr(t, e, 28) ^ lr(e, t, 2) ^ lr(e, t, 7)
      return r < 0 && (r += 4294967296), r
    }
    function Tr(t, e) {
      var r = dr(t, e, 14) ^ dr(t, e, 18) ^ dr(e, t, 9)
      return r < 0 && (r += 4294967296), r
    }
    function Pr(t, e) {
      var r = lr(t, e, 14) ^ lr(t, e, 18) ^ lr(e, t, 9)
      return r < 0 && (r += 4294967296), r
    }
    function Or(t, e) {
      var r = dr(t, e, 1) ^ dr(t, e, 8) ^ cr(t, e, 7)
      return r < 0 && (r += 4294967296), r
    }
    function qr(t, e) {
      var r = lr(t, e, 1) ^ lr(t, e, 8) ^ pr(t, e, 7)
      return r < 0 && (r += 4294967296), r
    }
    function Lr(t, e) {
      var r = dr(t, e, 19) ^ dr(e, t, 29) ^ cr(t, e, 6)
      return r < 0 && (r += 4294967296), r
    }
    function zr(t, e) {
      var r = lr(t, e, 19) ^ lr(e, t, 29) ^ pr(t, e, 6)
      return r < 0 && (r += 4294967296), r
    }
    function jr() {
      if (!(this instanceof jr)) return new jr()
      kr.call(this),
        (this.h = [
          3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999,
          355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025,
          3675008525, 1694076839, 1203062813, 3204075428
        ])
    }
    ;(Ar.blockSize = 1024),
      (Ar.outSize = 512),
      (Ar.hmacStrength = 192),
      (Ar.padLength = 128),
      (Ar.prototype._prepareBlock = function (t, e) {
        for (var r = this.W, i = 0; i < 32; i++) r[i] = t[e + i]
        for (; i < r.length; i += 2) {
          var n = Lr(r[i - 4], r[i - 3]),
            o = zr(r[i - 4], r[i - 3]),
            s = r[i - 14],
            a = r[i - 13],
            h = Or(r[i - 30], r[i - 29]),
            u = qr(r[i - 30], r[i - 29]),
            f = r[i - 32],
            d = r[i - 31]
          ;(r[i] = vr(n, o, s, a, h, u, f, d)),
            (r[i + 1] = yr(n, o, s, a, h, u, f, d))
        }
      }),
      (Ar.prototype._update = function (t, e) {
        this._prepareBlock(t, e)
        var r = this.W,
          i = this.h[0],
          n = this.h[1],
          o = this.h[2],
          s = this.h[3],
          a = this.h[4],
          h = this.h[5],
          u = this.h[6],
          f = this.h[7],
          d = this.h[8],
          l = this.h[9],
          c = this.h[10],
          p = this.h[11],
          m = this.h[12],
          b = this.h[13],
          g = this.h[14],
          v = this.h[15]
        te(this.k.length === r.length)
        for (var y = 0; y < r.length; y += 2) {
          var w = g,
            M = v,
            _ = Tr(d, l),
            S = Pr(d, l),
            A = xr(d, 0, c, 0, m),
            k = Er(0, l, 0, p, 0, b),
            x = this.k[y],
            E = this.k[y + 1],
            R = r[y],
            B = r[y + 1],
            I = wr(w, M, _, S, A, k, x, E, R, B),
            N = Mr(w, M, _, S, A, k, x, E, R, B)
          ;(w = Ir(i, n)),
            (M = Nr(i, n)),
            (_ = Rr(i, 0, o, 0, a)),
            (S = Br(0, n, 0, s, 0, h))
          var T = br(w, M, _, S),
            P = gr(w, M, _, S)
          ;(g = m),
            (v = b),
            (m = c),
            (b = p),
            (c = d),
            (p = l),
            (d = br(u, f, I, N)),
            (l = gr(f, f, I, N)),
            (u = a),
            (f = h),
            (a = o),
            (h = s),
            (o = i),
            (s = n),
            (i = br(I, N, T, P)),
            (n = gr(I, N, T, P))
        }
        mr(this.h, 0, i, n),
          mr(this.h, 2, o, s),
          mr(this.h, 4, a, h),
          mr(this.h, 6, u, f),
          mr(this.h, 8, d, l),
          mr(this.h, 10, c, p),
          mr(this.h, 12, m, b),
          mr(this.h, 14, g, v)
      }),
      (Ar.prototype._digest = function (t) {
        return 'hex' === t
          ? Oe.toHex32(this.h, 'big')
          : Oe.split32(this.h, 'big')
      }),
      Oe.inherits(jr, kr)
    var Cr = jr
    ;(jr.blockSize = 1024),
      (jr.outSize = 384),
      (jr.hmacStrength = 192),
      (jr.padLength = 128),
      (jr.prototype._digest = function (t) {
        return 'hex' === t
          ? Oe.toHex32(this.h.slice(0, 12), 'big')
          : Oe.split32(this.h.slice(0, 12), 'big')
      })
    var Ur = { sha1: Ge, sha224: fr, sha256: hr, sha384: Cr, sha512: kr },
      Dr = Oe.rotl32,
      Zr = Oe.sum32,
      Fr = Oe.sum32_3,
      Kr = Oe.sum32_4,
      Hr = ze.BlockHash
    function Vr() {
      if (!(this instanceof Vr)) return new Vr()
      Hr.call(this),
        (this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520]),
        (this.endian = 'little')
    }
    Oe.inherits(Vr, Hr)
    var $r = Vr
    function Wr(t, e, r, i) {
      return t <= 15
        ? e ^ r ^ i
        : t <= 31
        ? (e & r) | (~e & i)
        : t <= 47
        ? (e | ~r) ^ i
        : t <= 63
        ? (e & i) | (r & ~i)
        : e ^ (r | ~i)
    }
    function Jr(t) {
      return t <= 15
        ? 0
        : t <= 31
        ? 1518500249
        : t <= 47
        ? 1859775393
        : t <= 63
        ? 2400959708
        : 2840853838
    }
    function Gr(t) {
      return t <= 15
        ? 1352829926
        : t <= 31
        ? 1548603684
        : t <= 47
        ? 1836072691
        : t <= 63
        ? 2053994217
        : 0
    }
    ;(Vr.blockSize = 512),
      (Vr.outSize = 160),
      (Vr.hmacStrength = 192),
      (Vr.padLength = 64),
      (Vr.prototype._update = function (t, e) {
        for (
          var r = this.h[0],
            i = this.h[1],
            n = this.h[2],
            o = this.h[3],
            s = this.h[4],
            a = r,
            h = i,
            u = n,
            f = o,
            d = s,
            l = 0;
          l < 80;
          l++
        ) {
          var c = Zr(Dr(Kr(r, Wr(l, i, n, o), t[Xr[l] + e], Jr(l)), Qr[l]), s)
          ;(r = s),
            (s = o),
            (o = Dr(n, 10)),
            (n = i),
            (i = c),
            (c = Zr(
              Dr(Kr(a, Wr(79 - l, h, u, f), t[Yr[l] + e], Gr(l)), ti[l]),
              d
            )),
            (a = d),
            (d = f),
            (f = Dr(u, 10)),
            (u = h),
            (h = c)
        }
        ;(c = Fr(this.h[1], n, f)),
          (this.h[1] = Fr(this.h[2], o, d)),
          (this.h[2] = Fr(this.h[3], s, a)),
          (this.h[3] = Fr(this.h[4], r, h)),
          (this.h[4] = Fr(this.h[0], i, u)),
          (this.h[0] = c)
      }),
      (Vr.prototype._digest = function (t) {
        return 'hex' === t
          ? Oe.toHex32(this.h, 'little')
          : Oe.split32(this.h, 'little')
      })
    var Xr = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10,
        6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0,
        6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
        4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
      ],
      Yr = [
        5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0,
        13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8,
        12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10,
        14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
      ],
      Qr = [
        11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11,
        9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14,
        8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6,
        5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
      ],
      ti = [
        8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7,
        12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12,
        13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12,
        5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
      ],
      ei = { ripemd160: $r }
    function ri(t, e, r) {
      if (!(this instanceof ri)) return new ri(t, e, r)
      ;(this.Hash = t),
        (this.blockSize = t.blockSize / 8),
        (this.outSize = t.outSize / 8),
        (this.inner = null),
        (this.outer = null),
        this._init(Oe.toArray(e, r))
    }
    var ii = ri
    ;(ri.prototype._init = function (t) {
      t.length > this.blockSize && (t = new this.Hash().update(t).digest()),
        te(t.length <= this.blockSize)
      for (var e = t.length; e < this.blockSize; e++) t.push(0)
      for (e = 0; e < t.length; e++) t[e] ^= 54
      for (this.inner = new this.Hash().update(t), e = 0; e < t.length; e++)
        t[e] ^= 106
      this.outer = new this.Hash().update(t)
    }),
      (ri.prototype.update = function (t, e) {
        return this.inner.update(t, e), this
      }),
      (ri.prototype.digest = function (t) {
        return this.outer.update(this.inner.digest()), this.outer.digest(t)
      })
    var ni = dt(function (t, e) {
        var r = e
        ;(r.utils = Oe),
          (r.common = ze),
          (r.sha = Ur),
          (r.ripemd = ei),
          (r.hmac = ii),
          (r.sha1 = r.sha.sha1),
          (r.sha256 = r.sha.sha256),
          (r.sha224 = r.sha.sha224),
          (r.sha384 = r.sha.sha384),
          (r.sha512 = r.sha.sha512),
          (r.ripemd160 = r.ripemd.ripemd160)
      }),
      oi = {
        doubles: {
          step: 4,
          points: [
            [
              'e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a',
              'f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821'
            ],
            [
              '8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508',
              '11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf'
            ],
            [
              '175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739',
              'd3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695'
            ],
            [
              '363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640',
              '4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9'
            ],
            [
              '8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c',
              '4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36'
            ],
            [
              '723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda',
              '96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f'
            ],
            [
              'eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa',
              '5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999'
            ],
            [
              '100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0',
              'cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09'
            ],
            [
              'e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d',
              '9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d'
            ],
            [
              'feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d',
              'e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088'
            ],
            [
              'da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1',
              '9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d'
            ],
            [
              '53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0',
              '5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8'
            ],
            [
              '8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047',
              '10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a'
            ],
            [
              '385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862',
              '283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453'
            ],
            [
              '6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7',
              '7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160'
            ],
            [
              '3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd',
              '56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0'
            ],
            [
              '85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83',
              '7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6'
            ],
            [
              '948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a',
              '53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589'
            ],
            [
              '6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8',
              'bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17'
            ],
            [
              'e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d',
              '4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda'
            ],
            [
              'e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725',
              '7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd'
            ],
            [
              '213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754',
              '4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2'
            ],
            [
              '4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c',
              '17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6'
            ],
            [
              'fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6',
              '6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f'
            ],
            [
              '76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39',
              'c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01'
            ],
            [
              'c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891',
              '893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3'
            ],
            [
              'd895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b',
              'febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f'
            ],
            [
              'b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03',
              '2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7'
            ],
            [
              'e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d',
              'eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78'
            ],
            [
              'a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070',
              '7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1'
            ],
            [
              '90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4',
              'e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150'
            ],
            [
              '8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da',
              '662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82'
            ],
            [
              'e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11',
              '1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc'
            ],
            [
              '8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e',
              'efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b'
            ],
            [
              'e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41',
              '2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51'
            ],
            [
              'b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef',
              '67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45'
            ],
            [
              'd68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8',
              'db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120'
            ],
            [
              '324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d',
              '648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84'
            ],
            [
              '4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96',
              '35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d'
            ],
            [
              '9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd',
              'ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d'
            ],
            [
              '6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5',
              '9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8'
            ],
            [
              'a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266',
              '40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8'
            ],
            [
              '7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71',
              '34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac'
            ],
            [
              '928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac',
              'c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f'
            ],
            [
              '85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751',
              '1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962'
            ],
            [
              'ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e',
              '493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907'
            ],
            [
              '827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241',
              'c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec'
            ],
            [
              'eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3',
              'be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d'
            ],
            [
              'e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f',
              '4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414'
            ],
            [
              '1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19',
              'aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd'
            ],
            [
              '146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be',
              'b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0'
            ],
            [
              'fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9',
              '6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811'
            ],
            [
              'da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2',
              '8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1'
            ],
            [
              'a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13',
              '7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c'
            ],
            [
              '174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c',
              'ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73'
            ],
            [
              '959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba',
              '2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd'
            ],
            [
              'd2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151',
              'e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405'
            ],
            [
              '64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073',
              'd99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589'
            ],
            [
              '8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458',
              '38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e'
            ],
            [
              '13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b',
              '69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27'
            ],
            [
              'bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366',
              'd3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1'
            ],
            [
              '8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa',
              '40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482'
            ],
            [
              '8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0',
              '620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945'
            ],
            [
              'dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787',
              '7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573'
            ],
            [
              'f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e',
              'ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82'
            ]
          ]
        },
        naf: {
          wnd: 7,
          points: [
            [
              'f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9',
              '388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672'
            ],
            [
              '2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4',
              'd8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6'
            ],
            [
              '5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc',
              '6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da'
            ],
            [
              'acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe',
              'cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37'
            ],
            [
              '774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb',
              'd984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b'
            ],
            [
              'f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8',
              'ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81'
            ],
            [
              'd7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e',
              '581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58'
            ],
            [
              'defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34',
              '4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77'
            ],
            [
              '2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c',
              '85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a'
            ],
            [
              '352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5',
              '321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c'
            ],
            [
              '2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f',
              '2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67'
            ],
            [
              '9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714',
              '73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402'
            ],
            [
              'daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729',
              'a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55'
            ],
            [
              'c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db',
              '2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482'
            ],
            [
              '6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4',
              'e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82'
            ],
            [
              '1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5',
              'b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396'
            ],
            [
              '605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479',
              '2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49'
            ],
            [
              '62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d',
              '80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf'
            ],
            [
              '80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f',
              '1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a'
            ],
            [
              '7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb',
              'd0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7'
            ],
            [
              'd528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9',
              'eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933'
            ],
            [
              '49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963',
              '758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a'
            ],
            [
              '77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74',
              '958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6'
            ],
            [
              'f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530',
              'e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37'
            ],
            [
              '463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b',
              '5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e'
            ],
            [
              'f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247',
              'cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6'
            ],
            [
              'caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1',
              'cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476'
            ],
            [
              '2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120',
              '4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40'
            ],
            [
              '7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435',
              '91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61'
            ],
            [
              '754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18',
              '673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683'
            ],
            [
              'e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8',
              '59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5'
            ],
            [
              '186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb',
              '3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b'
            ],
            [
              'df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f',
              '55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417'
            ],
            [
              '5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143',
              'efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868'
            ],
            [
              '290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba',
              'e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a'
            ],
            [
              'af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45',
              'f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6'
            ],
            [
              '766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a',
              '744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996'
            ],
            [
              '59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e',
              'c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e'
            ],
            [
              'f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8',
              'e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d'
            ],
            [
              '7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c',
              '30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2'
            ],
            [
              '948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519',
              'e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e'
            ],
            [
              '7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab',
              '100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437'
            ],
            [
              '3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca',
              'ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311'
            ],
            [
              'd3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf',
              '8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4'
            ],
            [
              '1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610',
              '68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575'
            ],
            [
              '733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4',
              'f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d'
            ],
            [
              '15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c',
              'd56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d'
            ],
            [
              'a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940',
              'edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629'
            ],
            [
              'e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980',
              'a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06'
            ],
            [
              '311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3',
              '66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374'
            ],
            [
              '34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf',
              '9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee'
            ],
            [
              'f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63',
              '4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1'
            ],
            [
              'd7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448',
              'fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b'
            ],
            [
              '32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf',
              '5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661'
            ],
            [
              '7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5',
              '8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6'
            ],
            [
              'ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6',
              '8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e'
            ],
            [
              '16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5',
              '5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d'
            ],
            [
              'eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99',
              'f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc'
            ],
            [
              '78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51',
              'f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4'
            ],
            [
              '494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5',
              '42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c'
            ],
            [
              'a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5',
              '204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b'
            ],
            [
              'c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997',
              '4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913'
            ],
            [
              '841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881',
              '73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154'
            ],
            [
              '5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5',
              '39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865'
            ],
            [
              '36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66',
              'd2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc'
            ],
            [
              '336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726',
              'ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224'
            ],
            [
              '8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede',
              '6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e'
            ],
            [
              '1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94',
              '60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6'
            ],
            [
              '85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31',
              '3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511'
            ],
            [
              '29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51',
              'b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b'
            ],
            [
              'a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252',
              'ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2'
            ],
            [
              '4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5',
              'cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c'
            ],
            [
              'd24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b',
              '6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3'
            ],
            [
              'ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4',
              '322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d'
            ],
            [
              'af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f',
              '6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700'
            ],
            [
              'e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889',
              '2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4'
            ],
            [
              '591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246',
              'b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196'
            ],
            [
              '11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984',
              '998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4'
            ],
            [
              '3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a',
              'b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257'
            ],
            [
              'cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030',
              'bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13'
            ],
            [
              'c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197',
              '6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096'
            ],
            [
              'c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593',
              'c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38'
            ],
            [
              'a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef',
              '21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f'
            ],
            [
              '347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38',
              '60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448'
            ],
            [
              'da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a',
              '49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a'
            ],
            [
              'c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111',
              '5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4'
            ],
            [
              '4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502',
              '7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437'
            ],
            [
              '3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea',
              'be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7'
            ],
            [
              'cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26',
              '8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d'
            ],
            [
              'b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986',
              '39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a'
            ],
            [
              'd4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e',
              '62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54'
            ],
            [
              '48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4',
              '25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77'
            ],
            [
              'dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda',
              'ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517'
            ],
            [
              '6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859',
              'cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10'
            ],
            [
              'e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f',
              'f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125'
            ],
            [
              'eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c',
              '6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e'
            ],
            [
              '13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942',
              'fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1'
            ],
            [
              'ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a',
              '1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2'
            ],
            [
              'b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80',
              '5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423'
            ],
            [
              'ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d',
              '438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8'
            ],
            [
              '8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1',
              'cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758'
            ],
            [
              '52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63',
              'c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375'
            ],
            [
              'e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352',
              '6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d'
            ],
            [
              '7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193',
              'ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec'
            ],
            [
              '5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00',
              '9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0'
            ],
            [
              '32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58',
              'ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c'
            ],
            [
              'e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7',
              'd3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4'
            ],
            [
              '8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8',
              'c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f'
            ],
            [
              '4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e',
              '67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649'
            ],
            [
              '3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d',
              'cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826'
            ],
            [
              '674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b',
              '299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5'
            ],
            [
              'd32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f',
              'f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87'
            ],
            [
              '30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6',
              '462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b'
            ],
            [
              'be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297',
              '62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc'
            ],
            [
              '93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a',
              '7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c'
            ],
            [
              'b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c',
              'ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f'
            ],
            [
              'd5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52',
              '4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a'
            ],
            [
              'd3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb',
              'bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46'
            ],
            [
              '463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065',
              'bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f'
            ],
            [
              '7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917',
              '603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03'
            ],
            [
              '74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9',
              'cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08'
            ],
            [
              '30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3',
              '553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8'
            ],
            [
              '9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57',
              '712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373'
            ],
            [
              '176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66',
              'ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3'
            ],
            [
              '75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8',
              '9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8'
            ],
            [
              '809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721',
              '9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1'
            ],
            [
              '1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180',
              '4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9'
            ]
          ]
        }
      },
      si = dt(function (t, e) {
        var r,
          i = e,
          n = ne.assert
        function o(t) {
          ;(this.curve =
            'short' === t.type
              ? new Be.short(t)
              : 'edwards' === t.type
              ? new Be.edwards(t)
              : new Be.mont(t)),
            (this.g = this.curve.g),
            (this.n = this.curve.n),
            (this.hash = t.hash),
            n(this.g.validate(), 'Invalid curve'),
            n(this.g.mul(this.n).isInfinity(), 'Invalid curve, G*N != O')
        }
        function s(t, e) {
          Object.defineProperty(i, t, {
            configurable: !0,
            enumerable: !0,
            get: function () {
              var r = new o(e)
              return (
                Object.defineProperty(i, t, {
                  configurable: !0,
                  enumerable: !0,
                  value: r
                }),
                r
              )
            }
          })
        }
        ;(i.PresetCurve = o),
          s('p192', {
            type: 'short',
            prime: 'p192',
            p: 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff',
            a: 'ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc',
            b: '64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1',
            n: 'ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831',
            hash: ni.sha256,
            gRed: !1,
            g: [
              '188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012',
              '07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811'
            ]
          }),
          s('p224', {
            type: 'short',
            prime: 'p224',
            p: 'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001',
            a: 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe',
            b: 'b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4',
            n: 'ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d',
            hash: ni.sha256,
            gRed: !1,
            g: [
              'b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21',
              'bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34'
            ]
          }),
          s('p256', {
            type: 'short',
            prime: null,
            p: 'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff',
            a: 'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc',
            b: '5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b',
            n: 'ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551',
            hash: ni.sha256,
            gRed: !1,
            g: [
              '6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296',
              '4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5'
            ]
          }),
          s('p384', {
            type: 'short',
            prime: null,
            p: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff',
            a: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc',
            b: 'b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef',
            n: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973',
            hash: ni.sha384,
            gRed: !1,
            g: [
              'aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7',
              '3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f'
            ]
          }),
          s('p521', {
            type: 'short',
            prime: null,
            p: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff',
            a: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc',
            b: '00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00',
            n: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409',
            hash: ni.sha512,
            gRed: !1,
            g: [
              '000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66',
              '00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650'
            ]
          }),
          s('curve25519', {
            type: 'mont',
            prime: 'p25519',
            p: '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
            a: '76d06',
            b: '1',
            n: '1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',
            hash: ni.sha256,
            gRed: !1,
            g: ['9']
          }),
          s('ed25519', {
            type: 'edwards',
            prime: 'p25519',
            p: '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
            a: '-1',
            c: '1',
            d: '52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3',
            n: '1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',
            hash: ni.sha256,
            gRed: !1,
            g: [
              '216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a',
              '6666666666666666666666666666666666666666666666666666666666666658'
            ]
          })
        try {
          r = oi
        } catch (t) {
          r = void 0
        }
        s('secp256k1', {
          type: 'short',
          prime: 'k256',
          p: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f',
          a: '0',
          b: '7',
          n: 'ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141',
          h: '1',
          hash: ni.sha256,
          beta: '7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee',
          lambda:
            '5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72',
          basis: [
            {
              a: '3086d221a7d46bcde86c90e49284eb15',
              b: '-e4437ed6010e88286f547fa90abfe4c3'
            },
            {
              a: '114ca50f7a8e2f3f657c1108d9d44cfd8',
              b: '3086d221a7d46bcde86c90e49284eb15'
            }
          ],
          gRed: !1,
          g: [
            '79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798',
            '483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8',
            r
          ]
        })
      })
    function ai(t) {
      if (!(this instanceof ai)) return new ai(t)
      ;(this.hash = t.hash),
        (this.predResist = !!t.predResist),
        (this.outLen = this.hash.outSize),
        (this.minEntropy = t.minEntropy || this.hash.hmacStrength),
        (this._reseed = null),
        (this.reseedInterval = null),
        (this.K = null),
        (this.V = null)
      var e = ie.toArray(t.entropy, t.entropyEnc || 'hex'),
        r = ie.toArray(t.nonce, t.nonceEnc || 'hex'),
        i = ie.toArray(t.pers, t.persEnc || 'hex')
      te(
        e.length >= this.minEntropy / 8,
        'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits'
      ),
        this._init(e, r, i)
    }
    var hi = ai
    ;(ai.prototype._init = function (t, e, r) {
      var i = t.concat(e).concat(r)
      ;(this.K = new Array(this.outLen / 8)),
        (this.V = new Array(this.outLen / 8))
      for (var n = 0; n < this.V.length; n++) (this.K[n] = 0), (this.V[n] = 1)
      this._update(i),
        (this._reseed = 1),
        (this.reseedInterval = 281474976710656)
    }),
      (ai.prototype._hmac = function () {
        return new ni.hmac(this.hash, this.K)
      }),
      (ai.prototype._update = function (t) {
        var e = this._hmac().update(this.V).update([0])
        t && (e = e.update(t)),
          (this.K = e.digest()),
          (this.V = this._hmac().update(this.V).digest()),
          t &&
            ((this.K = this._hmac()
              .update(this.V)
              .update([1])
              .update(t)
              .digest()),
            (this.V = this._hmac().update(this.V).digest()))
      }),
      (ai.prototype.reseed = function (t, e, r, i) {
        'string' != typeof e && ((i = r), (r = e), (e = null)),
          (t = ie.toArray(t, e)),
          (r = ie.toArray(r, i)),
          te(
            t.length >= this.minEntropy / 8,
            'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits'
          ),
          this._update(t.concat(r || [])),
          (this._reseed = 1)
      }),
      (ai.prototype.generate = function (t, e, r, i) {
        if (this._reseed > this.reseedInterval)
          throw new Error('Reseed is required')
        'string' != typeof e && ((i = r), (r = e), (e = null)),
          r && ((r = ie.toArray(r, i || 'hex')), this._update(r))
        for (var n = []; n.length < t; )
          (this.V = this._hmac().update(this.V).digest()),
            (n = n.concat(this.V))
        var o = n.slice(0, t)
        return this._update(r), this._reseed++, ie.encode(o, e)
      })
    var ui = ne.assert
    function fi(t, e) {
      ;(this.ec = t),
        (this.priv = null),
        (this.pub = null),
        e.priv && this._importPrivate(e.priv, e.privEnc),
        e.pub && this._importPublic(e.pub, e.pubEnc)
    }
    var di = fi
    ;(fi.fromPublic = function (t, e, r) {
      return e instanceof fi ? e : new fi(t, { pub: e, pubEnc: r })
    }),
      (fi.fromPrivate = function (t, e, r) {
        return e instanceof fi ? e : new fi(t, { priv: e, privEnc: r })
      }),
      (fi.prototype.validate = function () {
        var t = this.getPublic()
        return t.isInfinity()
          ? { result: !1, reason: 'Invalid public key' }
          : t.validate()
          ? t.mul(this.ec.curve.n).isInfinity()
            ? { result: !0, reason: null }
            : { result: !1, reason: 'Public key * N != O' }
          : { result: !1, reason: 'Public key is not a point' }
      }),
      (fi.prototype.getPublic = function (t, e) {
        return (
          'string' == typeof t && ((e = t), (t = null)),
          this.pub || (this.pub = this.ec.g.mul(this.priv)),
          e ? this.pub.encode(e, t) : this.pub
        )
      }),
      (fi.prototype.getPrivate = function (t) {
        return 'hex' === t ? this.priv.toString(16, 2) : this.priv
      }),
      (fi.prototype._importPrivate = function (t, e) {
        ;(this.priv = new pt(t, e || 16)),
          (this.priv = this.priv.umod(this.ec.curve.n))
      }),
      (fi.prototype._importPublic = function (t, e) {
        if (t.x || t.y)
          return (
            'mont' === this.ec.curve.type
              ? ui(t.x, 'Need x coordinate')
              : ('short' !== this.ec.curve.type &&
                  'edwards' !== this.ec.curve.type) ||
                ui(t.x && t.y, 'Need both x and y coordinate'),
            void (this.pub = this.ec.curve.point(t.x, t.y))
          )
        this.pub = this.ec.curve.decodePoint(t, e)
      }),
      (fi.prototype.derive = function (t) {
        return (
          t.validate() || ui(t.validate(), 'public point not validated'),
          t.mul(this.priv).getX()
        )
      }),
      (fi.prototype.sign = function (t, e, r) {
        return this.ec.sign(t, this, e, r)
      }),
      (fi.prototype.verify = function (t, e) {
        return this.ec.verify(t, e, this)
      }),
      (fi.prototype.inspect = function () {
        return (
          '<Key priv: ' +
          (this.priv && this.priv.toString(16, 2)) +
          ' pub: ' +
          (this.pub && this.pub.inspect()) +
          ' >'
        )
      })
    var li = ne.assert
    function ci(t, e) {
      if (t instanceof ci) return t
      this._importDER(t, e) ||
        (li(t.r && t.s, 'Signature without r or s'),
        (this.r = new pt(t.r, 16)),
        (this.s = new pt(t.s, 16)),
        (this.recoveryParam =
          void 0 === t.recoveryParam ? null : t.recoveryParam))
    }
    var pi = ci
    function mi() {
      this.place = 0
    }
    function bi(t, e) {
      var r = t[e.place++]
      if (!(128 & r)) return r
      var i = 15 & r
      if (0 === i || i > 4) return !1
      for (var n = 0, o = 0, s = e.place; o < i; o++, s++)
        (n <<= 8), (n |= t[s]), (n >>>= 0)
      return !(n <= 127) && ((e.place = s), n)
    }
    function gi(t) {
      for (var e = 0, r = t.length - 1; !t[e] && !(128 & t[e + 1]) && e < r; )
        e++
      return 0 === e ? t : t.slice(e)
    }
    function vi(t, e) {
      if (e < 128) t.push(e)
      else {
        var r = 1 + ((Math.log(e) / Math.LN2) >>> 3)
        for (t.push(128 | r); --r; ) t.push((e >>> (r << 3)) & 255)
        t.push(e)
      }
    }
    ;(ci.prototype._importDER = function (t, e) {
      t = ne.toArray(t, e)
      var r = new mi()
      if (48 !== t[r.place++]) return !1
      var i = bi(t, r)
      if (!1 === i) return !1
      if (i + r.place !== t.length) return !1
      if (2 !== t[r.place++]) return !1
      var n = bi(t, r)
      if (!1 === n) return !1
      var o = t.slice(r.place, n + r.place)
      if (((r.place += n), 2 !== t[r.place++])) return !1
      var s = bi(t, r)
      if (!1 === s) return !1
      if (t.length !== s + r.place) return !1
      var a = t.slice(r.place, s + r.place)
      if (0 === o[0]) {
        if (!(128 & o[1])) return !1
        o = o.slice(1)
      }
      if (0 === a[0]) {
        if (!(128 & a[1])) return !1
        a = a.slice(1)
      }
      return (
        (this.r = new pt(o)),
        (this.s = new pt(a)),
        (this.recoveryParam = null),
        !0
      )
    }),
      (ci.prototype.toDER = function (t) {
        var e = this.r.toArray(),
          r = this.s.toArray()
        for (
          128 & e[0] && (e = [0].concat(e)),
            128 & r[0] && (r = [0].concat(r)),
            e = gi(e),
            r = gi(r);
          !(r[0] || 128 & r[1]);

        )
          r = r.slice(1)
        var i = [2]
        vi(i, e.length), (i = i.concat(e)).push(2), vi(i, r.length)
        var n = i.concat(r),
          o = [48]
        return vi(o, n.length), (o = o.concat(n)), ne.encode(o, t)
      })
    var yi = ne.assert
    function wi(t) {
      if (!(this instanceof wi)) return new wi(t)
      'string' == typeof t &&
        (yi(Object.prototype.hasOwnProperty.call(si, t), 'Unknown curve ' + t),
        (t = si[t])),
        t instanceof si.PresetCurve && (t = { curve: t }),
        (this.curve = t.curve.curve),
        (this.n = this.curve.n),
        (this.nh = this.n.ushrn(1)),
        (this.g = this.curve.g),
        (this.g = t.curve.g),
        this.g.precompute(t.curve.n.bitLength() + 1),
        (this.hash = t.hash || t.curve.hash)
    }
    var Mi = wi
    ;(wi.prototype.keyPair = function (t) {
      return new di(this, t)
    }),
      (wi.prototype.keyFromPrivate = function (t, e) {
        return di.fromPrivate(this, t, e)
      }),
      (wi.prototype.keyFromPublic = function (t, e) {
        return di.fromPublic(this, t, e)
      }),
      (wi.prototype.genKeyPair = function (t) {
        t || (t = {})
        for (
          var e = new hi({
              hash: this.hash,
              pers: t.pers,
              persEnc: t.persEnc || 'utf8',
              entropy: t.entropy || oe(this.hash.hmacStrength),
              entropyEnc: (t.entropy && t.entropyEnc) || 'utf8',
              nonce: this.n.toArray()
            }),
            r = this.n.byteLength(),
            i = this.n.sub(new pt(2));
          ;

        ) {
          var n = new pt(e.generate(r))
          if (!(n.cmp(i) > 0)) return n.iaddn(1), this.keyFromPrivate(n)
        }
      }),
      (wi.prototype._truncateToN = function (t, e) {
        var r = 8 * t.byteLength() - this.n.bitLength()
        return (
          r > 0 && (t = t.ushrn(r)),
          !e && t.cmp(this.n) >= 0 ? t.sub(this.n) : t
        )
      }),
      (wi.prototype.sign = function (t, e, r, i) {
        'object' == typeof r && ((i = r), (r = null)),
          i || (i = {}),
          (e = this.keyFromPrivate(e, r)),
          (t = this._truncateToN(new pt(t, 16)))
        for (
          var n = this.n.byteLength(),
            o = e.getPrivate().toArray('be', n),
            s = t.toArray('be', n),
            a = new hi({
              hash: this.hash,
              entropy: o,
              nonce: s,
              pers: i.pers,
              persEnc: i.persEnc || 'utf8'
            }),
            h = this.n.sub(new pt(1)),
            u = 0;
          ;
          u++
        ) {
          var f = i.k ? i.k(u) : new pt(a.generate(this.n.byteLength()))
          if (!((f = this._truncateToN(f, !0)).cmpn(1) <= 0 || f.cmp(h) >= 0)) {
            var d = this.g.mul(f)
            if (!d.isInfinity()) {
              var l = d.getX(),
                c = l.umod(this.n)
              if (0 !== c.cmpn(0)) {
                var p = f.invm(this.n).mul(c.mul(e.getPrivate()).iadd(t))
                if (0 !== (p = p.umod(this.n)).cmpn(0)) {
                  var m = (d.getY().isOdd() ? 1 : 0) | (0 !== l.cmp(c) ? 2 : 0)
                  return (
                    i.canonical &&
                      p.cmp(this.nh) > 0 &&
                      ((p = this.n.sub(p)), (m ^= 1)),
                    new pi({ r: c, s: p, recoveryParam: m })
                  )
                }
              }
            }
          }
        }
      }),
      (wi.prototype.verify = function (t, e, r, i) {
        ;(t = this._truncateToN(new pt(t, 16))), (r = this.keyFromPublic(r, i))
        var n = (e = new pi(e, 'hex')).r,
          o = e.s
        if (n.cmpn(1) < 0 || n.cmp(this.n) >= 0) return !1
        if (o.cmpn(1) < 0 || o.cmp(this.n) >= 0) return !1
        var s,
          a = o.invm(this.n),
          h = a.mul(t).umod(this.n),
          u = a.mul(n).umod(this.n)
        return this.curve._maxwellTrick
          ? !(s = this.g.jmulAdd(h, r.getPublic(), u)).isInfinity() &&
              s.eqXToP(n)
          : !(s = this.g.mulAdd(h, r.getPublic(), u)).isInfinity() &&
              0 === s.getX().umod(this.n).cmp(n)
      }),
      (wi.prototype.recoverPubKey = function (t, e, r, i) {
        yi((3 & r) === r, 'The recovery param is more than two bits'),
          (e = new pi(e, i))
        var n = this.n,
          o = new pt(t),
          s = e.r,
          a = e.s,
          h = 1 & r,
          u = r >> 1
        if (s.cmp(this.curve.p.umod(this.curve.n)) >= 0 && u)
          throw new Error('Unable to find sencond key candinate')
        s = this.curve.pointFromX(u ? s.add(this.curve.n) : s, h)
        var f = e.r.invm(n),
          d = n.sub(o).mul(f).umod(n),
          l = a.mul(f).umod(n)
        return this.g.mulAdd(d, s, l)
      }),
      (wi.prototype.getKeyRecoveryParam = function (t, e, r, i) {
        if (null !== (e = new pi(e, i)).recoveryParam) return e.recoveryParam
        for (var n = 0; n < 4; n++) {
          var o
          try {
            o = this.recoverPubKey(t, e, n)
          } catch (t) {
            continue
          }
          if (o.eq(r)) return n
        }
        throw new Error('Unable to find valid recovery factor')
      })
    var _i = ne.assert,
      Si = ne.parseBytes,
      Ai = ne.cachedProperty
    function ki(t, e) {
      ;(this.eddsa = t),
        (this._secret = Si(e.secret)),
        t.isPoint(e.pub) ? (this._pub = e.pub) : (this._pubBytes = Si(e.pub))
    }
    ;(ki.fromPublic = function (t, e) {
      return e instanceof ki ? e : new ki(t, { pub: e })
    }),
      (ki.fromSecret = function (t, e) {
        return e instanceof ki ? e : new ki(t, { secret: e })
      }),
      (ki.prototype.secret = function () {
        return this._secret
      }),
      Ai(ki, 'pubBytes', function () {
        return this.eddsa.encodePoint(this.pub())
      }),
      Ai(ki, 'pub', function () {
        return this._pubBytes
          ? this.eddsa.decodePoint(this._pubBytes)
          : this.eddsa.g.mul(this.priv())
      }),
      Ai(ki, 'privBytes', function () {
        var t = this.eddsa,
          e = this.hash(),
          r = t.encodingLength - 1,
          i = e.slice(0, t.encodingLength)
        return (i[0] &= 248), (i[r] &= 127), (i[r] |= 64), i
      }),
      Ai(ki, 'priv', function () {
        return this.eddsa.decodeInt(this.privBytes())
      }),
      Ai(ki, 'hash', function () {
        return this.eddsa.hash().update(this.secret()).digest()
      }),
      Ai(ki, 'messagePrefix', function () {
        return this.hash().slice(this.eddsa.encodingLength)
      }),
      (ki.prototype.sign = function (t) {
        return (
          _i(this._secret, 'KeyPair can only verify'), this.eddsa.sign(t, this)
        )
      }),
      (ki.prototype.verify = function (t, e) {
        return this.eddsa.verify(t, e, this)
      }),
      (ki.prototype.getSecret = function (t) {
        return (
          _i(this._secret, 'KeyPair is public only'),
          ne.encode(this.secret(), t)
        )
      }),
      (ki.prototype.getPublic = function (t) {
        return ne.encode(this.pubBytes(), t)
      })
    var xi = ki,
      Ei = ne.assert,
      Ri = ne.cachedProperty,
      Bi = ne.parseBytes
    function Ii(t, e) {
      ;(this.eddsa = t),
        'object' != typeof e && (e = Bi(e)),
        Array.isArray(e) &&
          (e = {
            R: e.slice(0, t.encodingLength),
            S: e.slice(t.encodingLength)
          }),
        Ei(e.R && e.S, 'Signature without R or S'),
        t.isPoint(e.R) && (this._R = e.R),
        e.S instanceof pt && (this._S = e.S),
        (this._Rencoded = Array.isArray(e.R) ? e.R : e.Rencoded),
        (this._Sencoded = Array.isArray(e.S) ? e.S : e.Sencoded)
    }
    Ri(Ii, 'S', function () {
      return this.eddsa.decodeInt(this.Sencoded())
    }),
      Ri(Ii, 'R', function () {
        return this.eddsa.decodePoint(this.Rencoded())
      }),
      Ri(Ii, 'Rencoded', function () {
        return this.eddsa.encodePoint(this.R())
      }),
      Ri(Ii, 'Sencoded', function () {
        return this.eddsa.encodeInt(this.S())
      }),
      (Ii.prototype.toBytes = function () {
        return this.Rencoded().concat(this.Sencoded())
      }),
      (Ii.prototype.toHex = function () {
        return ne.encode(this.toBytes(), 'hex').toUpperCase()
      })
    var Ni = Ii,
      Ti = ne.assert,
      Pi = ne.parseBytes
    function Oi(t) {
      if (
        (Ti('ed25519' === t, 'only tested with ed25519 so far'),
        !(this instanceof Oi))
      )
        return new Oi(t)
      ;(this.curve = t = si[t].curve),
        (this.g = t.g),
        this.g.precompute(t.n.bitLength() + 1),
        (this.pointClass = t.point().constructor),
        (this.encodingLength = Math.ceil(t.n.bitLength() / 8)),
        (this.hash = ni.sha512)
    }
    var qi = Oi
    ;(Oi.prototype.sign = function (t, e) {
      t = Pi(t)
      var r = this.keyFromSecret(e),
        i = this.hashInt(r.messagePrefix(), t),
        n = this.g.mul(i),
        o = this.encodePoint(n),
        s = this.hashInt(o, r.pubBytes(), t).mul(r.priv()),
        a = i.add(s).umod(this.curve.n)
      return this.makeSignature({ R: n, S: a, Rencoded: o })
    }),
      (Oi.prototype.verify = function (t, e, r) {
        ;(t = Pi(t)), (e = this.makeSignature(e))
        var i = this.keyFromPublic(r),
          n = this.hashInt(e.Rencoded(), i.pubBytes(), t),
          o = this.g.mul(e.S())
        return e.R().add(i.pub().mul(n)).eq(o)
      }),
      (Oi.prototype.hashInt = function () {
        for (var t = this.hash(), e = 0; e < arguments.length; e++)
          t.update(arguments[e])
        return ne.intFromLE(t.digest()).umod(this.curve.n)
      }),
      (Oi.prototype.keyFromPublic = function (t) {
        return xi.fromPublic(this, t)
      }),
      (Oi.prototype.keyFromSecret = function (t) {
        return xi.fromSecret(this, t)
      }),
      (Oi.prototype.makeSignature = function (t) {
        return t instanceof Ni ? t : new Ni(this, t)
      }),
      (Oi.prototype.encodePoint = function (t) {
        var e = t.getY().toArray('le', this.encodingLength)
        return (e[this.encodingLength - 1] |= t.getX().isOdd() ? 128 : 0), e
      }),
      (Oi.prototype.decodePoint = function (t) {
        var e = (t = ne.parseBytes(t)).length - 1,
          r = t.slice(0, e).concat(-129 & t[e]),
          i = 0 != (128 & t[e]),
          n = ne.intFromLE(r)
        return this.curve.pointFromY(n, i)
      }),
      (Oi.prototype.encodeInt = function (t) {
        return t.toArray('le', this.encodingLength)
      }),
      (Oi.prototype.decodeInt = function (t) {
        return ne.intFromLE(t)
      }),
      (Oi.prototype.isPoint = function (t) {
        return t instanceof this.pointClass
      })
    var Li = dt(function (t, e) {
      var r = e
      ;(r.version = '6.5.4'),
        (r.utils = ne),
        (r.rand = oe),
        (r.curve = Be),
        (r.curves = si),
        (r.ec = Mi),
        (r.eddsa = qi)
    })
    const zi = new (0, Li.ec)('secp256k1'),
      ji = zi.curve,
      Ci = ji.n.constructor
    function Ui(t) {
      const e = t[0]
      switch (e) {
        case 2:
        case 3:
          return 33 !== t.length
            ? null
            : (function (t, e) {
                let r = new Ci(e)
                if (r.cmp(ji.p) >= 0) return null
                r = r.toRed(ji.red)
                let i = r.redSqr().redIMul(r).redIAdd(ji.b).redSqrt()
                return (
                  (3 === t) !== i.isOdd() && (i = i.redNeg()),
                  zi.keyPair({ pub: { x: r, y: i } })
                )
              })(e, t.subarray(1, 33))
        case 4:
        case 6:
        case 7:
          return 65 !== t.length
            ? null
            : (function (t, e, r) {
                let i = new Ci(e),
                  n = new Ci(r)
                if (i.cmp(ji.p) >= 0 || n.cmp(ji.p) >= 0) return null
                if (
                  ((i = i.toRed(ji.red)),
                  (n = n.toRed(ji.red)),
                  (6 === t || 7 === t) && n.isOdd() !== (7 === t))
                )
                  return null
                const o = i.redSqr().redIMul(i)
                return n.redSqr().redISub(o.redIAdd(ji.b)).isZero()
                  ? zi.keyPair({ pub: { x: i, y: n } })
                  : null
              })(e, t.subarray(1, 33), t.subarray(33, 65))
        default:
          return null
      }
    }
    function Di(t, e) {
      const r = e.encode(null, 33 === t.length)
      for (let e = 0; e < t.length; ++e) t[e] = r[e]
    }
    var Zi = {
        contextRandomize: () => 0,
        privateKeyVerify(t) {
          const e = new Ci(t)
          return e.cmp(ji.n) < 0 && !e.isZero() ? 0 : 1
        },
        privateKeyNegate(t) {
          const e = new Ci(t),
            r = ji.n.sub(e).umod(ji.n).toArrayLike(Uint8Array, 'be', 32)
          return t.set(r), 0
        },
        privateKeyTweakAdd(t, e) {
          const r = new Ci(e)
          if (r.cmp(ji.n) >= 0) return 1
          if ((r.iadd(new Ci(t)), r.cmp(ji.n) >= 0 && r.isub(ji.n), r.isZero()))
            return 1
          const i = r.toArrayLike(Uint8Array, 'be', 32)
          return t.set(i), 0
        },
        privateKeyTweakMul(t, e) {
          let r = new Ci(e)
          if (r.cmp(ji.n) >= 0 || r.isZero()) return 1
          r.imul(new Ci(t)), r.cmp(ji.n) >= 0 && (r = r.umod(ji.n))
          const i = r.toArrayLike(Uint8Array, 'be', 32)
          return t.set(i), 0
        },
        publicKeyVerify: (t) => (null === Ui(t) ? 1 : 0),
        publicKeyCreate(t, e) {
          const r = new Ci(e)
          return r.cmp(ji.n) >= 0 || r.isZero()
            ? 1
            : (Di(t, zi.keyFromPrivate(e).getPublic()), 0)
        },
        publicKeyConvert(t, e) {
          const r = Ui(e)
          return null === r ? 1 : (Di(t, r.getPublic()), 0)
        },
        publicKeyNegate(t, e) {
          const r = Ui(e)
          if (null === r) return 1
          const i = r.getPublic()
          return (i.y = i.y.redNeg()), Di(t, i), 0
        },
        publicKeyCombine(t, e) {
          const r = new Array(e.length)
          for (let t = 0; t < e.length; ++t)
            if (((r[t] = Ui(e[t])), null === r[t])) return 1
          let i = r[0].getPublic()
          for (let t = 1; t < r.length; ++t) i = i.add(r[t].pub)
          return i.isInfinity() ? 2 : (Di(t, i), 0)
        },
        publicKeyTweakAdd(t, e, r) {
          const i = Ui(e)
          if (null === i) return 1
          if ((r = new Ci(r)).cmp(ji.n) >= 0) return 2
          const n = i.getPublic().add(ji.g.mul(r))
          return n.isInfinity() ? 2 : (Di(t, n), 0)
        },
        publicKeyTweakMul(t, e, r) {
          const i = Ui(e)
          return null === i
            ? 1
            : (r = new Ci(r)).cmp(ji.n) >= 0 || r.isZero()
            ? 2
            : (Di(t, i.getPublic().mul(r)), 0)
        },
        signatureNormalize(t) {
          const e = new Ci(t.subarray(0, 32)),
            r = new Ci(t.subarray(32, 64))
          return e.cmp(ji.n) >= 0 || r.cmp(ji.n) >= 0
            ? 1
            : (1 === r.cmp(zi.nh) &&
                t.set(ji.n.sub(r).toArrayLike(Uint8Array, 'be', 32), 32),
              0)
        },
        signatureExport(t, e) {
          const r = e.subarray(0, 32),
            i = e.subarray(32, 64)
          if (new Ci(r).cmp(ji.n) >= 0) return 1
          if (new Ci(i).cmp(ji.n) >= 0) return 1
          const { output: n } = t
          let o = n.subarray(4, 37)
          ;(o[0] = 0), o.set(r, 1)
          let s = 33,
            a = 0
          for (; s > 1 && 0 === o[a] && !(128 & o[a + 1]); --s, ++a);
          if (((o = o.subarray(a)), 128 & o[0])) return 1
          if (s > 1 && 0 === o[0] && !(128 & o[1])) return 1
          let h = n.subarray(39, 72)
          ;(h[0] = 0), h.set(i, 1)
          let u = 33,
            f = 0
          for (; u > 1 && 0 === h[f] && !(128 & h[f + 1]); --u, ++f);
          return (
            (h = h.subarray(f)),
            128 & h[0] || (u > 1 && 0 === h[0] && !(128 & h[1]))
              ? 1
              : ((t.outputlen = 6 + s + u),
                (n[0] = 48),
                (n[1] = t.outputlen - 2),
                (n[2] = 2),
                (n[3] = o.length),
                n.set(o, 4),
                (n[4 + s] = 2),
                (n[5 + s] = h.length),
                n.set(h, 6 + s),
                0)
          )
        },
        signatureImport(t, e) {
          if (e.length < 8) return 1
          if (e.length > 72) return 1
          if (48 !== e[0]) return 1
          if (e[1] !== e.length - 2) return 1
          if (2 !== e[2]) return 1
          const r = e[3]
          if (0 === r) return 1
          if (5 + r >= e.length) return 1
          if (2 !== e[4 + r]) return 1
          const i = e[5 + r]
          if (0 === i) return 1
          if (6 + r + i !== e.length) return 1
          if (128 & e[4]) return 1
          if (r > 1 && 0 === e[4] && !(128 & e[5])) return 1
          if (128 & e[r + 6]) return 1
          if (i > 1 && 0 === e[r + 6] && !(128 & e[r + 7])) return 1
          let n = e.subarray(4, 4 + r)
          if (
            (33 === n.length && 0 === n[0] && (n = n.subarray(1)),
            n.length > 32)
          )
            return 1
          let o = e.subarray(6 + r)
          if (
            (33 === o.length && 0 === o[0] && (o = o.slice(1)), o.length > 32)
          )
            throw new Error('S length is too long')
          let s = new Ci(n)
          s.cmp(ji.n) >= 0 && (s = new Ci(0))
          let a = new Ci(e.subarray(6 + r))
          return (
            a.cmp(ji.n) >= 0 && (a = new Ci(0)),
            t.set(s.toArrayLike(Uint8Array, 'be', 32), 0),
            t.set(a.toArrayLike(Uint8Array, 'be', 32), 32),
            0
          )
        },
        ecdsaSign(t, e, r, i, n) {
          if (n) {
            const t = n
            n = (n) => {
              const o = t(e, r, null, i, n)
              if (!(o instanceof Uint8Array && 32 === o.length))
                throw new Error('This is the way')
              return new Ci(o)
            }
          }
          const o = new Ci(r)
          if (o.cmp(ji.n) >= 0 || o.isZero()) return 1
          let s
          try {
            s = zi.sign(e, r, { canonical: !0, k: n, pers: i })
          } catch (t) {
            return 1
          }
          return (
            t.signature.set(s.r.toArrayLike(Uint8Array, 'be', 32), 0),
            t.signature.set(s.s.toArrayLike(Uint8Array, 'be', 32), 32),
            (t.recid = s.recoveryParam),
            0
          )
        },
        ecdsaVerify(t, e, r) {
          const i = { r: t.subarray(0, 32), s: t.subarray(32, 64) },
            n = new Ci(i.r),
            o = new Ci(i.s)
          if (n.cmp(ji.n) >= 0 || o.cmp(ji.n) >= 0) return 1
          if (1 === o.cmp(zi.nh) || n.isZero() || o.isZero()) return 3
          const s = Ui(r)
          if (null === s) return 2
          const a = s.getPublic()
          return zi.verify(e, i, a) ? 0 : 3
        },
        ecdsaRecover(t, e, r, i) {
          const n = { r: e.slice(0, 32), s: e.slice(32, 64) },
            o = new Ci(n.r),
            s = new Ci(n.s)
          if (o.cmp(ji.n) >= 0 || s.cmp(ji.n) >= 0) return 1
          if (o.isZero() || s.isZero()) return 2
          let a
          try {
            a = zi.recoverPubKey(i, n, r)
          } catch (t) {
            return 2
          }
          return Di(t, a), 0
        },
        ecdh(t, e, r, i, n, o, s) {
          const a = Ui(e)
          if (null === a) return 1
          const h = new Ci(r)
          if (h.cmp(ji.n) >= 0 || h.isZero()) return 2
          const u = a.getPublic().mul(h)
          if (void 0 === n) {
            const e = u.encode(null, !0),
              r = zi.hash().update(e).digest()
            for (let e = 0; e < 32; ++e) t[e] = r[e]
          } else {
            o || (o = new Uint8Array(32))
            const e = u.getX().toArray('be', 32)
            for (let t = 0; t < 32; ++t) o[t] = e[t]
            s || (s = new Uint8Array(32))
            const r = u.getY().toArray('be', 32)
            for (let t = 0; t < 32; ++t) s[t] = r[t]
            const a = n(o, s, i)
            if (!(a instanceof Uint8Array && a.length === t.length)) return 2
            t.set(a)
          }
          return 0
        }
      },
      Fi = Yt(Zi),
      Ki = dt(function (t) {
        try {
          t.exports = Qt
        } catch (e) {
          t.exports = Fi
        }
      }),
      Hi = q.default.randomBytes,
      Vi = /*#__PURE__*/ Object.defineProperty(
        {
          getRandomBytes: function (t) {
            return new Promise(function (e, r) {
              Hi(t, function (t, i) {
                t ? r(t) : e(i)
              })
            })
          },
          getRandomBytesSync: function (t) {
            return Hi(t)
          }
        },
        '__esModule',
        { value: !0 }
      ),
      $i = dt(function (t, e) {
        var r =
            (ft && ft.__awaiter) ||
            function (t, e, r, i) {
              return new (r || (r = Promise))(function (n, o) {
                function s(t) {
                  try {
                    h(i.next(t))
                  } catch (t) {
                    o(t)
                  }
                }
                function a(t) {
                  try {
                    h(i.throw(t))
                  } catch (t) {
                    o(t)
                  }
                }
                function h(t) {
                  var e
                  t.done
                    ? n(t.value)
                    : ((e = t.value),
                      e instanceof r
                        ? e
                        : new r(function (t) {
                            t(e)
                          })).then(s, a)
                }
                h((i = i.apply(t, e || [])).next())
              })
            },
          i =
            (ft && ft.__generator) ||
            function (t, e) {
              var r,
                i,
                n,
                o,
                s = {
                  label: 0,
                  sent: function () {
                    if (1 & n[0]) throw n[1]
                    return n[1]
                  },
                  trys: [],
                  ops: []
                }
              return (
                (o = { next: a(0), throw: a(1), return: a(2) }),
                'function' == typeof Symbol &&
                  (o[Symbol.iterator] = function () {
                    return this
                  }),
                o
              )
              function a(o) {
                return function (a) {
                  return (function (o) {
                    if (r)
                      throw new TypeError('Generator is already executing.')
                    for (; s; )
                      try {
                        if (
                          ((r = 1),
                          i &&
                            (n =
                              2 & o[0]
                                ? i.return
                                : o[0]
                                ? i.throw || ((n = i.return) && n.call(i), 0)
                                : i.next) &&
                            !(n = n.call(i, o[1])).done)
                        )
                          return n
                        switch (
                          ((i = 0), n && (o = [2 & o[0], n.value]), o[0])
                        ) {
                          case 0:
                          case 1:
                            n = o
                            break
                          case 4:
                            return s.label++, { value: o[1], done: !1 }
                          case 5:
                            s.label++, (i = o[1]), (o = [0])
                            continue
                          case 7:
                            ;(o = s.ops.pop()), s.trys.pop()
                            continue
                          default:
                            if (
                              !(
                                (n =
                                  (n = s.trys).length > 0 && n[n.length - 1]) ||
                                (6 !== o[0] && 2 !== o[0])
                              )
                            ) {
                              s = 0
                              continue
                            }
                            if (
                              3 === o[0] &&
                              (!n || (o[1] > n[0] && o[1] < n[3]))
                            ) {
                              s.label = o[1]
                              break
                            }
                            if (6 === o[0] && s.label < n[1]) {
                              ;(s.label = n[1]), (n = o)
                              break
                            }
                            if (n && s.label < n[2]) {
                              ;(s.label = n[2]), s.ops.push(o)
                              break
                            }
                            n[2] && s.ops.pop(), s.trys.pop()
                            continue
                        }
                        o = e.call(t, s)
                      } catch (t) {
                        ;(o = [6, t]), (i = 0)
                      } finally {
                        r = n = 0
                      }
                    if (5 & o[0]) throw o[1]
                    return { value: o[0] ? o[1] : void 0, done: !0 }
                  })([o, a])
                }
              }
            }
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.createPrivateKey = function () {
            return r(this, void 0, void 0, function () {
              var t
              return i(this, function (e) {
                switch (e.label) {
                  case 0:
                    return [4, Vi.getRandomBytes(32)]
                  case 1:
                    return (
                      (t = e.sent()), Ki.privateKeyVerify(t) ? [2, t] : [3, 0]
                    )
                  case 2:
                    return [2]
                }
              })
            })
          }),
          (e.createPrivateKeySync = function () {
            for (;;) {
              var t = Vi.getRandomBytesSync(32)
              if (Ki.privateKeyVerify(t)) return t
            }
          }),
          (function (t) {
            for (var r in t) e.hasOwnProperty(r) || (e[r] = t[r])
          })(Ki)
      }),
      Wi = dt(function (t, e) {
        function r(t) {
          if ('string' != typeof t)
            throw new Error(
              "[isHexPrefixed] input must be type 'string', received type " +
                typeof t
            )
          return '0' === t[0] && 'x' === t[1]
        }
        function i(t) {
          let e = t
          if ('string' != typeof e)
            throw new Error(
              "[padToEven] value must be type 'string', received " + typeof e
            )
          return e.length % 2 && (e = `0${e}`), e
        }
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.isHexString =
            e.getKeys =
            e.fromAscii =
            e.fromUtf8 =
            e.toAscii =
            e.arrayContainsArray =
            e.getBinarySize =
            e.padToEven =
            e.stripHexPrefix =
            e.isHexPrefixed =
              void 0),
          (e.isHexPrefixed = r),
          (e.stripHexPrefix = (t) => {
            if ('string' != typeof t)
              throw new Error(
                "[stripHexPrefix] input must be type 'string', received " +
                  typeof t
              )
            return r(t) ? t.slice(2) : t
          }),
          (e.padToEven = i),
          (e.getBinarySize = function (t) {
            if ('string' != typeof t)
              throw new Error(
                "[getBinarySize] method requires input type 'string', recieved " +
                  typeof t
              )
            return Buffer.byteLength(t, 'utf8')
          }),
          (e.arrayContainsArray = function (t, e, r) {
            if (!0 !== Array.isArray(t))
              throw new Error(
                `[arrayContainsArray] method requires input 'superset' to be an array, got type '${typeof t}'`
              )
            if (!0 !== Array.isArray(e))
              throw new Error(
                `[arrayContainsArray] method requires input 'subset' to be an array, got type '${typeof e}'`
              )
            return e[r ? 'some' : 'every']((e) => t.indexOf(e) >= 0)
          }),
          (e.toAscii = function (t) {
            let e = '',
              r = 0
            const i = t.length
            for ('0x' === t.substring(0, 2) && (r = 2); r < i; r += 2) {
              const i = parseInt(t.substr(r, 2), 16)
              e += String.fromCharCode(i)
            }
            return e
          }),
          (e.fromUtf8 = function (t) {
            return `0x${i(Buffer.from(t, 'utf8').toString('hex')).replace(
              /^0+|0+$/g,
              ''
            )}`
          }),
          (e.fromAscii = function (t) {
            let e = ''
            for (let r = 0; r < t.length; r++) {
              const i = t.charCodeAt(r).toString(16)
              e += i.length < 2 ? `0${i}` : i
            }
            return `0x${e}`
          }),
          (e.getKeys = function (t, e, r) {
            if (!Array.isArray(t))
              throw new Error(
                "[getKeys] method expects input 'params' to be an array, got " +
                  typeof t
              )
            if ('string' != typeof e)
              throw new Error(
                "[getKeys] method expects input 'key' to be type 'string', got " +
                  typeof t
              )
            const i = []
            for (let n = 0; n < t.length; n++) {
              let o = t[n][e]
              if (r && !o) o = ''
              else if ('string' != typeof o)
                throw new Error(
                  "invalid abi - expected type 'string', received " + typeof o
                )
              i.push(o)
            }
            return i
          }),
          (e.isHexString = function (t, e) {
            return !(
              'string' != typeof t ||
              !t.match(/^0x[0-9A-Fa-f]*$/) ||
              (e && t.length !== 2 + 2 * e)
            )
          })
      }),
      Ji = dt(function (t, e) {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.assertIsString =
            e.assertIsArray =
            e.assertIsBuffer =
            e.assertIsHexString =
              void 0),
          (e.assertIsHexString = function (t) {
            if (!(0, Wi.isHexString)(t))
              throw new Error(
                `This method only supports 0x-prefixed hex strings but input was: ${t}`
              )
          }),
          (e.assertIsBuffer = function (t) {
            if (!Buffer.isBuffer(t))
              throw new Error(
                `This method only supports Buffer but input was: ${t}`
              )
          }),
          (e.assertIsArray = function (t) {
            if (!Array.isArray(t))
              throw new Error(
                `This method only supports number arrays but input was: ${t}`
              )
          }),
          (e.assertIsString = function (t) {
            if ('string' != typeof t)
              throw new Error(
                `This method only supports strings but input was: ${t}`
              )
          })
      }),
      Gi = dt(function (t, e) {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.bufArrToArr =
            e.arrToBufArr =
            e.validateNoLeadingZeroes =
            e.baToJSON =
            e.toUtf8 =
            e.addHexPrefix =
            e.toUnsigned =
            e.fromSigned =
            e.bufferToHex =
            e.bufferToInt =
            e.toBuffer =
            e.unpadHexString =
            e.unpadArray =
            e.unpadBuffer =
            e.setLengthRight =
            e.setLengthLeft =
            e.zeros =
            e.intToBuffer =
            e.intToHex =
              void 0),
          (e.intToHex = function (t) {
            if (!Number.isSafeInteger(t) || t < 0)
              throw new Error(`Received an invalid integer type: ${t}`)
            return `0x${t.toString(16)}`
          }),
          (e.intToBuffer = function (t) {
            const r = (0, e.intToHex)(t)
            return Buffer.from((0, Wi.padToEven)(r.slice(2)), 'hex')
          }),
          (e.zeros = function (t) {
            return Buffer.allocUnsafe(t).fill(0)
          })
        const r = function (t, r, i) {
          const n = (0, e.zeros)(r)
          return i
            ? t.length < r
              ? (t.copy(n), n)
              : t.slice(0, r)
            : t.length < r
            ? (t.copy(n, r - t.length), n)
            : t.slice(-r)
        }
        ;(e.setLengthLeft = function (t, e) {
          return (0, Ji.assertIsBuffer)(t), r(t, e, !1)
        }),
          (e.setLengthRight = function (t, e) {
            return (0, Ji.assertIsBuffer)(t), r(t, e, !0)
          })
        const i = function (t) {
          let e = t[0]
          for (; t.length > 0 && '0' === e.toString(); ) e = (t = t.slice(1))[0]
          return t
        }
        ;(e.unpadBuffer = function (t) {
          return (0, Ji.assertIsBuffer)(t), i(t)
        }),
          (e.unpadArray = function (t) {
            return (0, Ji.assertIsArray)(t), i(t)
          }),
          (e.unpadHexString = function (t) {
            return (
              (0, Ji.assertIsHexString)(t),
              (t = (0, Wi.stripHexPrefix)(t)),
              i(t)
            )
          }),
          (e.toBuffer = function (t) {
            if (null == t) return Buffer.allocUnsafe(0)
            if (Buffer.isBuffer(t)) return Buffer.from(t)
            if (Array.isArray(t) || t instanceof Uint8Array)
              return Buffer.from(t)
            if ('string' == typeof t) {
              if (!(0, Wi.isHexString)(t))
                throw new Error(
                  `Cannot convert string to buffer. toBuffer only supports 0x-prefixed hex strings and this string was given: ${t}`
                )
              return Buffer.from(
                (0, Wi.padToEven)((0, Wi.stripHexPrefix)(t)),
                'hex'
              )
            }
            if ('number' == typeof t) return (0, e.intToBuffer)(t)
            if (vt.BN.isBN(t)) {
              if (t.isNeg())
                throw new Error(
                  `Cannot convert negative BN to buffer. Given: ${t}`
                )
              return t.toArrayLike(Buffer)
            }
            if (t.toArray) return Buffer.from(t.toArray())
            if (t.toBuffer) return Buffer.from(t.toBuffer())
            throw new Error('invalid type')
          }),
          (e.bufferToInt = function (t) {
            return new vt.BN((0, e.toBuffer)(t)).toNumber()
          }),
          (e.bufferToHex = function (t) {
            return '0x' + (t = (0, e.toBuffer)(t)).toString('hex')
          }),
          (e.fromSigned = function (t) {
            return new vt.BN(t).fromTwos(256)
          }),
          (e.toUnsigned = function (t) {
            return Buffer.from(t.toTwos(256).toArray())
          }),
          (e.addHexPrefix = function (t) {
            return 'string' != typeof t || (0, Wi.isHexPrefixed)(t)
              ? t
              : '0x' + t
          }),
          (e.toUtf8 = function (t) {
            if ((t = (0, Wi.stripHexPrefix)(t)).length % 2 != 0)
              throw new Error(
                'Invalid non-even hex string input for toUtf8() provided'
              )
            return Buffer.from(t.replace(/^(00)+|(00)+$/g, ''), 'hex').toString(
              'utf8'
            )
          }),
          (e.baToJSON = function (t) {
            if (Buffer.isBuffer(t)) return `0x${t.toString('hex')}`
            if (t instanceof Array) {
              const r = []
              for (let i = 0; i < t.length; i++) r.push((0, e.baToJSON)(t[i]))
              return r
            }
          }),
          (e.validateNoLeadingZeroes = function (t) {
            for (const [e, r] of Object.entries(t))
              if (void 0 !== r && r.length > 0 && 0 === r[0])
                throw new Error(
                  `${e} cannot have leading zeroes, received: ${r.toString(
                    'hex'
                  )}`
                )
          }),
          (e.arrToBufArr = function t(e) {
            return Array.isArray(e) ? e.map((e) => t(e)) : Buffer.from(e)
          }),
          (e.bufArrToArr = function t(e) {
            return Array.isArray(e)
              ? e.map((e) => t(e))
              : Uint8Array.from(null != e ? e : [])
          })
      }),
      Xi = /*#__PURE__*/ Object.defineProperty(
        {
          createHashFunction: function (t) {
            return function (e) {
              var r = t()
              return r.update(e), Buffer.from(r.digest())
            }
          }
        },
        '__esModule',
        { value: !0 }
      ),
      Yi = L.default
    function Qi(t, e) {
      var r = Object.keys(t)
      if (Object.getOwnPropertySymbols) {
        var i = Object.getOwnPropertySymbols(t)
        e &&
          (i = i.filter(function (e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable
          })),
          r.push.apply(r, i)
      }
      return r
    }
    function tn(t, e, r) {
      return (
        e in t
          ? Object.defineProperty(t, e, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0
            })
          : (t[e] = r),
        t
      )
    }
    var en = P.default.Buffer,
      rn = z.default.inspect,
      nn = (rn && rn.custom) || 'inspect',
      on =
        /*#__PURE__*/
        (function () {
          function t() {
            !(function (t, e) {
              if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function')
            })(this, t),
              (this.head = null),
              (this.tail = null),
              (this.length = 0)
          }
          var e
          return (
            (e = [
              {
                key: 'push',
                value: function (t) {
                  var e = { data: t, next: null }
                  this.length > 0 ? (this.tail.next = e) : (this.head = e),
                    (this.tail = e),
                    ++this.length
                }
              },
              {
                key: 'unshift',
                value: function (t) {
                  var e = { data: t, next: this.head }
                  0 === this.length && (this.tail = e),
                    (this.head = e),
                    ++this.length
                }
              },
              {
                key: 'shift',
                value: function () {
                  if (0 !== this.length) {
                    var t = this.head.data
                    return (
                      (this.head =
                        1 === this.length
                          ? (this.tail = null)
                          : this.head.next),
                      --this.length,
                      t
                    )
                  }
                }
              },
              {
                key: 'clear',
                value: function () {
                  ;(this.head = this.tail = null), (this.length = 0)
                }
              },
              {
                key: 'join',
                value: function (t) {
                  if (0 === this.length) return ''
                  for (var e = this.head, r = '' + e.data; (e = e.next); )
                    r += t + e.data
                  return r
                }
              },
              {
                key: 'concat',
                value: function (t) {
                  if (0 === this.length) return en.alloc(0)
                  for (
                    var e = en.allocUnsafe(t >>> 0), r = this.head, i = 0;
                    r;

                  )
                    en.prototype.copy.call(r.data, e, i),
                      (i += r.data.length),
                      (r = r.next)
                  return e
                }
              },
              {
                key: 'consume',
                value: function (t, e) {
                  var r
                  return (
                    t < this.head.data.length
                      ? ((r = this.head.data.slice(0, t)),
                        (this.head.data = this.head.data.slice(t)))
                      : (r =
                          t === this.head.data.length
                            ? this.shift()
                            : e
                            ? this._getString(t)
                            : this._getBuffer(t)),
                    r
                  )
                }
              },
              {
                key: 'first',
                value: function () {
                  return this.head.data
                }
              },
              {
                key: '_getString',
                value: function (t) {
                  var e = this.head,
                    r = 1,
                    i = e.data
                  for (t -= i.length; (e = e.next); ) {
                    var n = e.data,
                      o = t > n.length ? n.length : t
                    if (
                      ((i += o === n.length ? n : n.slice(0, t)), 0 == (t -= o))
                    ) {
                      o === n.length
                        ? (++r,
                          (this.head = e.next ? e.next : (this.tail = null)))
                        : ((this.head = e), (e.data = n.slice(o)))
                      break
                    }
                    ++r
                  }
                  return (this.length -= r), i
                }
              },
              {
                key: '_getBuffer',
                value: function (t) {
                  var e = en.allocUnsafe(t),
                    r = this.head,
                    i = 1
                  for (r.data.copy(e), t -= r.data.length; (r = r.next); ) {
                    var n = r.data,
                      o = t > n.length ? n.length : t
                    if ((n.copy(e, e.length - t, 0, o), 0 == (t -= o))) {
                      o === n.length
                        ? (++i,
                          (this.head = r.next ? r.next : (this.tail = null)))
                        : ((this.head = r), (r.data = n.slice(o)))
                      break
                    }
                    ++i
                  }
                  return (this.length -= i), e
                }
              },
              {
                key: nn,
                value: function (t, e) {
                  return rn(
                    this,
                    (function (t) {
                      for (var e = 1; e < arguments.length; e++) {
                        var r = null != arguments[e] ? arguments[e] : {}
                        e % 2
                          ? Qi(Object(r), !0).forEach(function (e) {
                              tn(t, e, r[e])
                            })
                          : Object.getOwnPropertyDescriptors
                          ? Object.defineProperties(
                              t,
                              Object.getOwnPropertyDescriptors(r)
                            )
                          : Qi(Object(r)).forEach(function (e) {
                              Object.defineProperty(
                                t,
                                e,
                                Object.getOwnPropertyDescriptor(r, e)
                              )
                            })
                      }
                      return t
                    })({}, e, { depth: 0, customInspect: !1 })
                  )
                }
              }
            ]),
            e &&
              (function (t, e) {
                for (var r = 0; r < e.length; r++) {
                  var i = e[r]
                  ;(i.enumerable = i.enumerable || !1),
                    (i.configurable = !0),
                    'value' in i && (i.writable = !0),
                    Object.defineProperty(t, i.key, i)
                }
              })(t.prototype, e),
            t
          )
        })()
    function sn(t, e) {
      hn(t, e), an(t)
    }
    function an(t) {
      ;(t._writableState && !t._writableState.emitClose) ||
        (t._readableState && !t._readableState.emitClose) ||
        t.emit('close')
    }
    function hn(t, e) {
      t.emit('error', e)
    }
    var un = function (t, e) {
        var r = this
        return (this._readableState && this._readableState.destroyed) ||
          (this._writableState && this._writableState.destroyed)
          ? (e
              ? e(t)
              : t &&
                (this._writableState
                  ? this._writableState.errorEmitted ||
                    ((this._writableState.errorEmitted = !0),
                    process.nextTick(hn, this, t))
                  : process.nextTick(hn, this, t)),
            this)
          : (this._readableState && (this._readableState.destroyed = !0),
            this._writableState && (this._writableState.destroyed = !0),
            this._destroy(t || null, function (t) {
              !e && t
                ? r._writableState
                  ? r._writableState.errorEmitted
                    ? process.nextTick(an, r)
                    : ((r._writableState.errorEmitted = !0),
                      process.nextTick(sn, r, t))
                  : process.nextTick(sn, r, t)
                : e
                ? (process.nextTick(an, r), e(t))
                : process.nextTick(an, r)
            }),
            this)
      },
      fn = function () {
        this._readableState &&
          ((this._readableState.destroyed = !1),
          (this._readableState.reading = !1),
          (this._readableState.ended = !1),
          (this._readableState.endEmitted = !1)),
          this._writableState &&
            ((this._writableState.destroyed = !1),
            (this._writableState.ended = !1),
            (this._writableState.ending = !1),
            (this._writableState.finalCalled = !1),
            (this._writableState.prefinished = !1),
            (this._writableState.finished = !1),
            (this._writableState.errorEmitted = !1))
      },
      dn = function (t, e) {
        var r = t._readableState,
          i = t._writableState
        ;(r && r.autoDestroy) || (i && i.autoDestroy)
          ? t.destroy(e)
          : t.emit('error', e)
      }
    const ln = {}
    function cn(t, e, r) {
      r || (r = Error)
      class i extends r {
        constructor(t, r, i) {
          super(
            (function (t, r, i) {
              return 'string' == typeof e ? e : e(t, r, i)
            })(t, r, i)
          )
        }
      }
      ;(i.prototype.name = r.name), (i.prototype.code = t), (ln[t] = i)
    }
    function pn(t, e) {
      if (Array.isArray(t)) {
        const r = t.length
        return (
          (t = t.map((t) => String(t))),
          r > 2
            ? `one of ${e} ${t.slice(0, r - 1).join(', ')}, or ` + t[r - 1]
            : 2 === r
            ? `one of ${e} ${t[0]} or ${t[1]}`
            : `of ${e} ${t[0]}`
        )
      }
      return `of ${e} ${String(t)}`
    }
    cn(
      'ERR_INVALID_OPT_VALUE',
      function (t, e) {
        return 'The value "' + e + '" is invalid for option "' + t + '"'
      },
      TypeError
    ),
      cn(
        'ERR_INVALID_ARG_TYPE',
        function (t, e, r) {
          let i, n
          var o, s
          return (
            'string' == typeof e && 'not ' === e.substr(0, 'not '.length)
              ? ((i = 'must not be'), (e = e.replace(/^not /, '')))
              : (i = 'must be'),
            (n = (function (t, e, r) {
              return (
                (void 0 === r || r > t.length) && (r = t.length),
                t.substring(r - e.length, r) === e
              )
            })(t, ' argument')
              ? `The ${t} ${i} ${pn(e, 'type')}`
              : `The "${t}" ${
                  ('number' != typeof s && (s = 0),
                  s + '.'.length > (o = t).length || -1 === o.indexOf('.', s)
                    ? 'argument'
                    : 'property')
                } ${i} ${pn(e, 'type')}`),
            (n += '. Received type ' + typeof r),
            n
          )
        },
        TypeError
      ),
      cn('ERR_STREAM_PUSH_AFTER_EOF', 'stream.push() after EOF'),
      cn('ERR_METHOD_NOT_IMPLEMENTED', function (t) {
        return 'The ' + t + ' method is not implemented'
      }),
      cn('ERR_STREAM_PREMATURE_CLOSE', 'Premature close'),
      cn('ERR_STREAM_DESTROYED', function (t) {
        return 'Cannot call ' + t + ' after a stream was destroyed'
      }),
      cn('ERR_MULTIPLE_CALLBACK', 'Callback called multiple times'),
      cn('ERR_STREAM_CANNOT_PIPE', 'Cannot pipe, not readable'),
      cn('ERR_STREAM_WRITE_AFTER_END', 'write after end'),
      cn(
        'ERR_STREAM_NULL_VALUES',
        'May not write null values to stream',
        TypeError
      ),
      cn(
        'ERR_UNKNOWN_ENCODING',
        function (t) {
          return 'Unknown encoding: ' + t
        },
        TypeError
      ),
      cn(
        'ERR_STREAM_UNSHIFT_AFTER_END_EVENT',
        'stream.unshift() after end event'
      )
    var mn,
      bn = { codes: ln },
      gn = bn.codes.ERR_INVALID_OPT_VALUE,
      vn = function (t, e, r, i) {
        var n = (function (t, e, r) {
          return null != t.highWaterMark ? t.highWaterMark : e ? t[r] : null
        })(e, i, r)
        if (null != n) {
          if (!isFinite(n) || Math.floor(n) !== n || n < 0)
            throw new gn(i ? r : 'highWaterMark', n)
          return Math.floor(n)
        }
        return t.objectMode ? 16 : 16384
      },
      yn = z.default.deprecate,
      wn = Jn,
      Mn = Un
    function _n(t) {
      var e = this
      ;(this.next = null),
        (this.entry = null),
        (this.finish = function () {
          !(function (t, e, r) {
            var i = t.entry
            for (t.entry = null; i; ) {
              var n = i.callback
              e.pendingcb--, n(void 0), (i = i.next)
            }
            e.corkedRequestsFree.next = t
          })(e, t)
        })
    }
    Un.WritableState = Cn
    var Sn,
      An = { deprecate: yn },
      kn = P.default.Buffer,
      xn = ft.Uint8Array || function () {},
      En = vn,
      Rn = bn.codes,
      Bn = Rn.ERR_INVALID_ARG_TYPE,
      In = Rn.ERR_METHOD_NOT_IMPLEMENTED,
      Nn = Rn.ERR_MULTIPLE_CALLBACK,
      Tn = Rn.ERR_STREAM_CANNOT_PIPE,
      Pn = Rn.ERR_STREAM_DESTROYED,
      On = Rn.ERR_STREAM_NULL_VALUES,
      qn = Rn.ERR_STREAM_WRITE_AFTER_END,
      Ln = Rn.ERR_UNKNOWN_ENCODING,
      zn = dn
    function jn() {}
    function Cn(t, e, r) {
      ;(mn = mn || wn),
        'boolean' != typeof r && (r = e instanceof mn),
        (this.objectMode = !!(t = t || {}).objectMode),
        r && (this.objectMode = this.objectMode || !!t.writableObjectMode),
        (this.highWaterMark = En(this, t, 'writableHighWaterMark', r)),
        (this.finalCalled = !1),
        (this.needDrain = !1),
        (this.ending = !1),
        (this.ended = !1),
        (this.finished = !1),
        (this.destroyed = !1),
        (this.decodeStrings = !(!1 === t.decodeStrings)),
        (this.defaultEncoding = t.defaultEncoding || 'utf8'),
        (this.length = 0),
        (this.writing = !1),
        (this.corked = 0),
        (this.sync = !0),
        (this.bufferProcessing = !1),
        (this.onwrite = function (t) {
          !(function (t, e) {
            var r = t._writableState,
              i = r.sync,
              n = r.writecb
            if ('function' != typeof n) throw new Nn()
            if (
              ((function (t) {
                ;(t.writing = !1),
                  (t.writecb = null),
                  (t.length -= t.writelen),
                  (t.writelen = 0)
              })(r),
              e)
            )
              !(function (t, e, r, i, n) {
                --e.pendingcb,
                  r
                    ? (process.nextTick(n, i),
                      process.nextTick(Vn, t, e),
                      (t._writableState.errorEmitted = !0),
                      zn(t, i))
                    : (n(i),
                      (t._writableState.errorEmitted = !0),
                      zn(t, i),
                      Vn(t, e))
              })(t, r, i, e, n)
            else {
              var o = Kn(r) || t.destroyed
              o ||
                r.corked ||
                r.bufferProcessing ||
                !r.bufferedRequest ||
                Fn(t, r),
                i ? process.nextTick(Zn, t, r, o, n) : Zn(t, r, o, n)
            }
          })(e, t)
        }),
        (this.writecb = null),
        (this.writelen = 0),
        (this.bufferedRequest = null),
        (this.lastBufferedRequest = null),
        (this.pendingcb = 0),
        (this.prefinished = !1),
        (this.errorEmitted = !1),
        (this.emitClose = !1 !== t.emitClose),
        (this.autoDestroy = !!t.autoDestroy),
        (this.bufferedRequestCount = 0),
        (this.corkedRequestsFree = new _n(this))
    }
    function Un(t) {
      var e = this instanceof (mn = mn || wn)
      if (!e && !Sn.call(Un, this)) return new Un(t)
      ;(this._writableState = new Cn(t, this, e)),
        (this.writable = !0),
        t &&
          ('function' == typeof t.write && (this._write = t.write),
          'function' == typeof t.writev && (this._writev = t.writev),
          'function' == typeof t.destroy && (this._destroy = t.destroy),
          'function' == typeof t.final && (this._final = t.final)),
        Yi.call(this)
    }
    function Dn(t, e, r, i, n, o, s) {
      ;(e.writelen = i),
        (e.writecb = s),
        (e.writing = !0),
        (e.sync = !0),
        e.destroyed
          ? e.onwrite(new Pn('write'))
          : r
          ? t._writev(n, e.onwrite)
          : t._write(n, o, e.onwrite),
        (e.sync = !1)
    }
    function Zn(t, e, r, i) {
      r ||
        (function (t, e) {
          0 === e.length && e.needDrain && ((e.needDrain = !1), t.emit('drain'))
        })(t, e),
        e.pendingcb--,
        i(),
        Vn(t, e)
    }
    function Fn(t, e) {
      e.bufferProcessing = !0
      var r = e.bufferedRequest
      if (t._writev && r && r.next) {
        var i = new Array(e.bufferedRequestCount),
          n = e.corkedRequestsFree
        n.entry = r
        for (var o = 0, s = !0; r; )
          (i[o] = r), r.isBuf || (s = !1), (r = r.next), (o += 1)
        ;(i.allBuffers = s),
          Dn(t, e, !0, e.length, i, '', n.finish),
          e.pendingcb++,
          (e.lastBufferedRequest = null),
          n.next
            ? ((e.corkedRequestsFree = n.next), (n.next = null))
            : (e.corkedRequestsFree = new _n(e)),
          (e.bufferedRequestCount = 0)
      } else {
        for (; r; ) {
          var a = r.chunk
          if (
            (Dn(
              t,
              e,
              !1,
              e.objectMode ? 1 : a.length,
              a,
              r.encoding,
              r.callback
            ),
            (r = r.next),
            e.bufferedRequestCount--,
            e.writing)
          )
            break
        }
        null === r && (e.lastBufferedRequest = null)
      }
      ;(e.bufferedRequest = r), (e.bufferProcessing = !1)
    }
    function Kn(t) {
      return (
        t.ending &&
        0 === t.length &&
        null === t.bufferedRequest &&
        !t.finished &&
        !t.writing
      )
    }
    function Hn(t, e) {
      t._final(function (r) {
        e.pendingcb--,
          r && zn(t, r),
          (e.prefinished = !0),
          t.emit('prefinish'),
          Vn(t, e)
      })
    }
    function Vn(t, e) {
      var r = Kn(e)
      if (
        r &&
        ((function (t, e) {
          e.prefinished ||
            e.finalCalled ||
            ('function' != typeof t._final || e.destroyed
              ? ((e.prefinished = !0), t.emit('prefinish'))
              : (e.pendingcb++,
                (e.finalCalled = !0),
                process.nextTick(Hn, t, e)))
        })(t, e),
        0 === e.pendingcb &&
          ((e.finished = !0), t.emit('finish'), e.autoDestroy))
      ) {
        var i = t._readableState
        ;(!i || (i.autoDestroy && i.endEmitted)) && t.destroy()
      }
      return r
    }
    be(Un, Yi),
      (Cn.prototype.getBuffer = function () {
        for (var t = this.bufferedRequest, e = []; t; ) e.push(t), (t = t.next)
        return e
      }),
      (function () {
        try {
          Object.defineProperty(Cn.prototype, 'buffer', {
            get: An.deprecate(
              function () {
                return this.getBuffer()
              },
              '_writableState.buffer is deprecated. Use _writableState.getBuffer instead.',
              'DEP0003'
            )
          })
        } catch (t) {}
      })(),
      'function' == typeof Symbol &&
      Symbol.hasInstance &&
      'function' == typeof Function.prototype[Symbol.hasInstance]
        ? ((Sn = Function.prototype[Symbol.hasInstance]),
          Object.defineProperty(Un, Symbol.hasInstance, {
            value: function (t) {
              return (
                !!Sn.call(this, t) ||
                (this === Un && t && t._writableState instanceof Cn)
              )
            }
          }))
        : (Sn = function (t) {
            return t instanceof this
          }),
      (Un.prototype.pipe = function () {
        zn(this, new Tn())
      }),
      (Un.prototype.write = function (t, e, r) {
        var i,
          n = this._writableState,
          o = !1,
          s = !n.objectMode && (kn.isBuffer((i = t)) || i instanceof xn)
        return (
          s &&
            !kn.isBuffer(t) &&
            (t = (function (t) {
              return kn.from(t)
            })(t)),
          'function' == typeof e && ((r = e), (e = null)),
          s ? (e = 'buffer') : e || (e = n.defaultEncoding),
          'function' != typeof r && (r = jn),
          n.ending
            ? (function (t, e) {
                var r = new qn()
                zn(t, r), process.nextTick(e, r)
              })(this, r)
            : (s ||
                (function (t, e, r, i) {
                  var n
                  return (
                    null === r
                      ? (n = new On())
                      : 'string' == typeof r ||
                        e.objectMode ||
                        (n = new Bn('chunk', ['string', 'Buffer'], r)),
                    !n || (zn(t, n), process.nextTick(i, n), !1)
                  )
                })(this, n, t, r)) &&
              (n.pendingcb++,
              (o = (function (t, e, r, i, n, o) {
                if (!r) {
                  var s = (function (t, e, r) {
                    return (
                      t.objectMode ||
                        !1 === t.decodeStrings ||
                        'string' != typeof e ||
                        (e = kn.from(e, r)),
                      e
                    )
                  })(e, i, n)
                  i !== s && ((r = !0), (n = 'buffer'), (i = s))
                }
                var a = e.objectMode ? 1 : i.length
                e.length += a
                var h = e.length < e.highWaterMark
                if ((h || (e.needDrain = !0), e.writing || e.corked)) {
                  var u = e.lastBufferedRequest
                  ;(e.lastBufferedRequest = {
                    chunk: i,
                    encoding: n,
                    isBuf: r,
                    callback: o,
                    next: null
                  }),
                    u
                      ? (u.next = e.lastBufferedRequest)
                      : (e.bufferedRequest = e.lastBufferedRequest),
                    (e.bufferedRequestCount += 1)
                } else Dn(t, e, !1, a, i, n, o)
                return h
              })(this, n, s, t, e, r))),
          o
        )
      }),
      (Un.prototype.cork = function () {
        this._writableState.corked++
      }),
      (Un.prototype.uncork = function () {
        var t = this._writableState
        t.corked &&
          (t.corked--,
          t.writing ||
            t.corked ||
            t.bufferProcessing ||
            !t.bufferedRequest ||
            Fn(this, t))
      }),
      (Un.prototype.setDefaultEncoding = function (t) {
        if (
          ('string' == typeof t && (t = t.toLowerCase()),
          !(
            [
              'hex',
              'utf8',
              'utf-8',
              'ascii',
              'binary',
              'base64',
              'ucs2',
              'ucs-2',
              'utf16le',
              'utf-16le',
              'raw'
            ].indexOf((t + '').toLowerCase()) > -1
          ))
        )
          throw new Ln(t)
        return (this._writableState.defaultEncoding = t), this
      }),
      Object.defineProperty(Un.prototype, 'writableBuffer', {
        enumerable: !1,
        get: function () {
          return this._writableState && this._writableState.getBuffer()
        }
      }),
      Object.defineProperty(Un.prototype, 'writableHighWaterMark', {
        enumerable: !1,
        get: function () {
          return this._writableState.highWaterMark
        }
      }),
      (Un.prototype._write = function (t, e, r) {
        r(new In('_write()'))
      }),
      (Un.prototype._writev = null),
      (Un.prototype.end = function (t, e, r) {
        var i = this._writableState
        return (
          'function' == typeof t
            ? ((r = t), (t = null), (e = null))
            : 'function' == typeof e && ((r = e), (e = null)),
          null != t && this.write(t, e),
          i.corked && ((i.corked = 1), this.uncork()),
          i.ending ||
            (function (t, e, r) {
              ;(e.ending = !0),
                Vn(t, e),
                r && (e.finished ? process.nextTick(r) : t.once('finish', r)),
                (e.ended = !0),
                (t.writable = !1)
            })(this, i, r),
          this
        )
      }),
      Object.defineProperty(Un.prototype, 'writableLength', {
        enumerable: !1,
        get: function () {
          return this._writableState.length
        }
      }),
      Object.defineProperty(Un.prototype, 'destroyed', {
        enumerable: !1,
        get: function () {
          return void 0 !== this._writableState && this._writableState.destroyed
        },
        set: function (t) {
          this._writableState && (this._writableState.destroyed = t)
        }
      }),
      (Un.prototype.destroy = un),
      (Un.prototype._undestroy = fn),
      (Un.prototype._destroy = function (t, e) {
        e(t)
      })
    var $n = Ro,
      Wn =
        Object.keys ||
        function (t) {
          var e = []
          for (var r in t) e.push(r)
          return e
        },
      Jn = Qn
    be(Qn, $n)
    for (var Gn = Wn(Mn.prototype), Xn = 0; Xn < Gn.length; Xn++) {
      var Yn = Gn[Xn]
      Qn.prototype[Yn] || (Qn.prototype[Yn] = Mn.prototype[Yn])
    }
    function Qn(t) {
      if (!(this instanceof Qn)) return new Qn(t)
      $n.call(this, t),
        Mn.call(this, t),
        (this.allowHalfOpen = !0),
        t &&
          (!1 === t.readable && (this.readable = !1),
          !1 === t.writable && (this.writable = !1),
          !1 === t.allowHalfOpen &&
            ((this.allowHalfOpen = !1), this.once('end', to)))
    }
    function to() {
      this._writableState.ended || process.nextTick(eo, this)
    }
    function eo(t) {
      t.end()
    }
    Object.defineProperty(Qn.prototype, 'writableHighWaterMark', {
      enumerable: !1,
      get: function () {
        return this._writableState.highWaterMark
      }
    }),
      Object.defineProperty(Qn.prototype, 'writableBuffer', {
        enumerable: !1,
        get: function () {
          return this._writableState && this._writableState.getBuffer()
        }
      }),
      Object.defineProperty(Qn.prototype, 'writableLength', {
        enumerable: !1,
        get: function () {
          return this._writableState.length
        }
      }),
      Object.defineProperty(Qn.prototype, 'destroyed', {
        enumerable: !1,
        get: function () {
          return (
            void 0 !== this._readableState &&
            void 0 !== this._writableState &&
            this._readableState.destroyed &&
            this._writableState.destroyed
          )
        },
        set: function (t) {
          void 0 !== this._readableState &&
            void 0 !== this._writableState &&
            ((this._readableState.destroyed = t),
            (this._writableState.destroyed = t))
        }
      })
    var ro = bn.codes.ERR_STREAM_PREMATURE_CLOSE
    function io() {}
    var no,
      oo = function t(e, r, i) {
        if ('function' == typeof r) return t(e, null, r)
        r || (r = {}),
          (i = (function (t) {
            var e = !1
            return function () {
              if (!e) {
                e = !0
                for (
                  var r = arguments.length, i = new Array(r), n = 0;
                  n < r;
                  n++
                )
                  i[n] = arguments[n]
                t.apply(this, i)
              }
            }
          })(i || io))
        var n = r.readable || (!1 !== r.readable && e.readable),
          o = r.writable || (!1 !== r.writable && e.writable),
          s = function () {
            e.writable || h()
          },
          a = e._writableState && e._writableState.finished,
          h = function () {
            ;(o = !1), (a = !0), n || i.call(e)
          },
          u = e._readableState && e._readableState.endEmitted,
          f = function () {
            ;(n = !1), (u = !0), o || i.call(e)
          },
          d = function (t) {
            i.call(e, t)
          },
          l = function () {
            var t
            return n && !u
              ? ((e._readableState && e._readableState.ended) || (t = new ro()),
                i.call(e, t))
              : o && !a
              ? ((e._writableState && e._writableState.ended) || (t = new ro()),
                i.call(e, t))
              : void 0
          },
          c = function () {
            e.req.on('finish', h)
          }
        return (
          (function (t) {
            return t.setHeader && 'function' == typeof t.abort
          })(e)
            ? (e.on('complete', h),
              e.on('abort', l),
              e.req ? c() : e.on('request', c))
            : o && !e._writableState && (e.on('end', s), e.on('close', s)),
          e.on('end', f),
          e.on('finish', h),
          !1 !== r.error && e.on('error', d),
          e.on('close', l),
          function () {
            e.removeListener('complete', h),
              e.removeListener('abort', l),
              e.removeListener('request', c),
              e.req && e.req.removeListener('finish', h),
              e.removeListener('end', s),
              e.removeListener('close', s),
              e.removeListener('finish', h),
              e.removeListener('end', f),
              e.removeListener('error', d),
              e.removeListener('close', l)
          }
        )
      }
    function so(t, e, r) {
      return (
        e in t
          ? Object.defineProperty(t, e, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0
            })
          : (t[e] = r),
        t
      )
    }
    var ao = Symbol('lastResolve'),
      ho = Symbol('lastReject'),
      uo = Symbol('error'),
      fo = Symbol('ended'),
      lo = Symbol('lastPromise'),
      co = Symbol('handlePromise'),
      po = Symbol('stream')
    function mo(t, e) {
      return { value: t, done: e }
    }
    function bo(t) {
      var e = t[ao]
      if (null !== e) {
        var r = t[po].read()
        null !== r &&
          ((t[lo] = null), (t[ao] = null), (t[ho] = null), e(mo(r, !1)))
      }
    }
    function go(t) {
      process.nextTick(bo, t)
    }
    var vo = Object.getPrototypeOf(function () {}),
      yo = Object.setPrototypeOf(
        (so(
          (no = {
            get stream() {
              return this[po]
            },
            next: function () {
              var t = this,
                e = this[uo]
              if (null !== e) return Promise.reject(e)
              if (this[fo]) return Promise.resolve(mo(void 0, !0))
              if (this[po].destroyed)
                return new Promise(function (e, r) {
                  process.nextTick(function () {
                    t[uo] ? r(t[uo]) : e(mo(void 0, !0))
                  })
                })
              var r,
                i = this[lo]
              if (i)
                r = new Promise(
                  (function (t, e) {
                    return function (r, i) {
                      t.then(function () {
                        e[fo] ? r(mo(void 0, !0)) : e[co](r, i)
                      }, i)
                    }
                  })(i, this)
                )
              else {
                var n = this[po].read()
                if (null !== n) return Promise.resolve(mo(n, !1))
                r = new Promise(this[co])
              }
              return (this[lo] = r), r
            }
          }),
          Symbol.asyncIterator,
          function () {
            return this
          }
        ),
        so(no, 'return', function () {
          var t = this
          return new Promise(function (e, r) {
            t[po].destroy(null, function (t) {
              t ? r(t) : e(mo(void 0, !0))
            })
          })
        }),
        no),
        vo
      ),
      wo = function (t) {
        var e,
          r = Object.create(
            yo,
            (so((e = {}), po, { value: t, writable: !0 }),
            so(e, ao, { value: null, writable: !0 }),
            so(e, ho, { value: null, writable: !0 }),
            so(e, uo, { value: null, writable: !0 }),
            so(e, fo, { value: t._readableState.endEmitted, writable: !0 }),
            so(e, co, {
              value: function (t, e) {
                var i = r[po].read()
                i
                  ? ((r[lo] = null),
                    (r[ao] = null),
                    (r[ho] = null),
                    t(mo(i, !1)))
                  : ((r[ao] = t), (r[ho] = e))
              },
              writable: !0
            }),
            e)
          )
        return (
          (r[lo] = null),
          oo(t, function (t) {
            if (t && 'ERR_STREAM_PREMATURE_CLOSE' !== t.code) {
              var e = r[ho]
              return (
                null !== e &&
                  ((r[lo] = null), (r[ao] = null), (r[ho] = null), e(t)),
                void (r[uo] = t)
              )
            }
            var i = r[ao]
            null !== i &&
              ((r[lo] = null),
              (r[ao] = null),
              (r[ho] = null),
              i(mo(void 0, !0))),
              (r[fo] = !0)
          }),
          t.on('readable', go.bind(null, r)),
          r
        )
      }
    function Mo(t, e, r, i, n, o, s) {
      try {
        var a = t[o](s),
          h = a.value
      } catch (t) {
        return void r(t)
      }
      a.done ? e(h) : Promise.resolve(h).then(i, n)
    }
    function _o(t) {
      return function () {
        var e = this,
          r = arguments
        return new Promise(function (i, n) {
          var o = t.apply(e, r)
          function s(t) {
            Mo(o, i, n, s, a, 'next', t)
          }
          function a(t) {
            Mo(o, i, n, s, a, 'throw', t)
          }
          s(void 0)
        })
      }
    }
    function So(t, e) {
      var r = Object.keys(t)
      if (Object.getOwnPropertySymbols) {
        var i = Object.getOwnPropertySymbols(t)
        e &&
          (i = i.filter(function (e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable
          })),
          r.push.apply(r, i)
      }
      return r
    }
    function Ao(t, e, r) {
      return (
        e in t
          ? Object.defineProperty(t, e, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0
            })
          : (t[e] = r),
        t
      )
    }
    var ko,
      xo = bn.codes.ERR_INVALID_ARG_TYPE,
      Eo = function (t, e, r) {
        var i
        if (e && 'function' == typeof e.next) i = e
        else if (e && e[Symbol.asyncIterator]) i = e[Symbol.asyncIterator]()
        else {
          if (!e || !e[Symbol.iterator])
            throw new xo('iterable', ['Iterable'], e)
          i = e[Symbol.iterator]()
        }
        var n = new t(
            (function (t) {
              for (var e = 1; e < arguments.length; e++) {
                var r = null != arguments[e] ? arguments[e] : {}
                e % 2
                  ? So(Object(r), !0).forEach(function (e) {
                      Ao(t, e, r[e])
                    })
                  : Object.getOwnPropertyDescriptors
                  ? Object.defineProperties(
                      t,
                      Object.getOwnPropertyDescriptors(r)
                    )
                  : So(Object(r)).forEach(function (e) {
                      Object.defineProperty(
                        t,
                        e,
                        Object.getOwnPropertyDescriptor(r, e)
                      )
                    })
              }
              return t
            })({ objectMode: !0 }, r)
          ),
          o = !1
        function s() {
          return a.apply(this, arguments)
        }
        function a() {
          return (a = _o(function* () {
            try {
              var t = yield i.next(),
                e = t.value
              t.done ? n.push(null) : n.push(yield e) ? s() : (o = !1)
            } catch (t) {
              n.destroy(t)
            }
          })).apply(this, arguments)
        }
        return (
          (n._read = function () {
            o || ((o = !0), s())
          }),
          n
        )
      },
      Ro = Ho
    Ho.ReadableState = Ko
    var Bo,
      Io = function (t, e) {
        return t.listeners(e).length
      },
      No = P.default.Buffer,
      To = ft.Uint8Array || function () {}
    Bo =
      z.default && z.default.debuglog
        ? z.default.debuglog('stream')
        : function () {}
    var Po,
      Oo,
      qo,
      Lo = vn,
      zo = bn.codes,
      jo = zo.ERR_INVALID_ARG_TYPE,
      Co = zo.ERR_STREAM_PUSH_AFTER_EOF,
      Uo = zo.ERR_METHOD_NOT_IMPLEMENTED,
      Do = zo.ERR_STREAM_UNSHIFT_AFTER_END_EVENT
    be(Ho, Yi)
    var Zo = dn,
      Fo = ['error', 'close', 'destroy', 'pause', 'resume']
    function Ko(t, e, r) {
      ;(ko = ko || wn),
        'boolean' != typeof r && (r = e instanceof ko),
        (this.objectMode = !!(t = t || {}).objectMode),
        r && (this.objectMode = this.objectMode || !!t.readableObjectMode),
        (this.highWaterMark = Lo(this, t, 'readableHighWaterMark', r)),
        (this.buffer = new on()),
        (this.length = 0),
        (this.pipes = null),
        (this.pipesCount = 0),
        (this.flowing = null),
        (this.ended = !1),
        (this.endEmitted = !1),
        (this.reading = !1),
        (this.sync = !0),
        (this.needReadable = !1),
        (this.emittedReadable = !1),
        (this.readableListening = !1),
        (this.resumeScheduled = !1),
        (this.paused = !0),
        (this.emitClose = !1 !== t.emitClose),
        (this.autoDestroy = !!t.autoDestroy),
        (this.destroyed = !1),
        (this.defaultEncoding = t.defaultEncoding || 'utf8'),
        (this.awaitDrain = 0),
        (this.readingMore = !1),
        (this.decoder = null),
        (this.encoding = null),
        t.encoding &&
          (Po || (Po = j.default.StringDecoder),
          (this.decoder = new Po(t.encoding)),
          (this.encoding = t.encoding))
    }
    function Ho(t) {
      if (((ko = ko || wn), !(this instanceof Ho))) return new Ho(t)
      ;(this._readableState = new Ko(t, this, this instanceof ko)),
        (this.readable = !0),
        t &&
          ('function' == typeof t.read && (this._read = t.read),
          'function' == typeof t.destroy && (this._destroy = t.destroy)),
        Yi.call(this)
    }
    function Vo(t, e, r, i, n) {
      Bo('readableAddChunk', e)
      var o,
        s = t._readableState
      if (null === e)
        (s.reading = !1),
          (function (t, e) {
            if ((Bo('onEofChunk'), !e.ended)) {
              if (e.decoder) {
                var r = e.decoder.end()
                r &&
                  r.length &&
                  (e.buffer.push(r), (e.length += e.objectMode ? 1 : r.length))
              }
              ;(e.ended = !0),
                e.sync
                  ? Go(t)
                  : ((e.needReadable = !1),
                    e.emittedReadable || ((e.emittedReadable = !0), Xo(t)))
            }
          })(t, s)
      else if (
        (n ||
          (o = (function (t, e) {
            var r, i
            return (
              No.isBuffer((i = e)) ||
                i instanceof To ||
                'string' == typeof e ||
                void 0 === e ||
                t.objectMode ||
                (r = new jo('chunk', ['string', 'Buffer', 'Uint8Array'], e)),
              r
            )
          })(s, e)),
        o)
      )
        Zo(t, o)
      else if (s.objectMode || (e && e.length > 0))
        if (
          ('string' == typeof e ||
            s.objectMode ||
            Object.getPrototypeOf(e) === No.prototype ||
            (e = (function (t) {
              return No.from(t)
            })(e)),
          i)
        )
          s.endEmitted ? Zo(t, new Do()) : $o(t, s, e, !0)
        else if (s.ended) Zo(t, new Co())
        else {
          if (s.destroyed) return !1
          ;(s.reading = !1),
            s.decoder && !r
              ? ((e = s.decoder.write(e)),
                s.objectMode || 0 !== e.length ? $o(t, s, e, !1) : Yo(t, s))
              : $o(t, s, e, !1)
        }
      else i || ((s.reading = !1), Yo(t, s))
      return !s.ended && (s.length < s.highWaterMark || 0 === s.length)
    }
    function $o(t, e, r, i) {
      e.flowing && 0 === e.length && !e.sync
        ? ((e.awaitDrain = 0), t.emit('data', r))
        : ((e.length += e.objectMode ? 1 : r.length),
          i ? e.buffer.unshift(r) : e.buffer.push(r),
          e.needReadable && Go(t)),
        Yo(t, e)
    }
    Object.defineProperty(Ho.prototype, 'destroyed', {
      enumerable: !1,
      get: function () {
        return void 0 !== this._readableState && this._readableState.destroyed
      },
      set: function (t) {
        this._readableState && (this._readableState.destroyed = t)
      }
    }),
      (Ho.prototype.destroy = un),
      (Ho.prototype._undestroy = fn),
      (Ho.prototype._destroy = function (t, e) {
        e(t)
      }),
      (Ho.prototype.push = function (t, e) {
        var r,
          i = this._readableState
        return (
          i.objectMode
            ? (r = !0)
            : 'string' == typeof t &&
              ((e = e || i.defaultEncoding) !== i.encoding &&
                ((t = No.from(t, e)), (e = '')),
              (r = !0)),
          Vo(this, t, e, !1, r)
        )
      }),
      (Ho.prototype.unshift = function (t) {
        return Vo(this, t, null, !0, !1)
      }),
      (Ho.prototype.isPaused = function () {
        return !1 === this._readableState.flowing
      }),
      (Ho.prototype.setEncoding = function (t) {
        Po || (Po = j.default.StringDecoder)
        var e = new Po(t)
        ;(this._readableState.decoder = e),
          (this._readableState.encoding = this._readableState.decoder.encoding)
        for (var r = this._readableState.buffer.head, i = ''; null !== r; )
          (i += e.write(r.data)), (r = r.next)
        return (
          this._readableState.buffer.clear(),
          '' !== i && this._readableState.buffer.push(i),
          (this._readableState.length = i.length),
          this
        )
      })
    var Wo = 1073741824
    function Jo(t, e) {
      return t <= 0 || (0 === e.length && e.ended)
        ? 0
        : e.objectMode
        ? 1
        : t != t
        ? e.flowing && e.length
          ? e.buffer.head.data.length
          : e.length
        : (t > e.highWaterMark &&
            (e.highWaterMark = (function (t) {
              return (
                t >= Wo
                  ? (t = Wo)
                  : (t--,
                    (t |= t >>> 1),
                    (t |= t >>> 2),
                    (t |= t >>> 4),
                    (t |= t >>> 8),
                    (t |= t >>> 16),
                    t++),
                t
              )
            })(t)),
          t <= e.length ? t : e.ended ? e.length : ((e.needReadable = !0), 0))
    }
    function Go(t) {
      var e = t._readableState
      Bo('emitReadable', e.needReadable, e.emittedReadable),
        (e.needReadable = !1),
        e.emittedReadable ||
          (Bo('emitReadable', e.flowing),
          (e.emittedReadable = !0),
          process.nextTick(Xo, t))
    }
    function Xo(t) {
      var e = t._readableState
      Bo('emitReadable_', e.destroyed, e.length, e.ended),
        e.destroyed ||
          (!e.length && !e.ended) ||
          (t.emit('readable'), (e.emittedReadable = !1)),
        (e.needReadable =
          !e.flowing && !e.ended && e.length <= e.highWaterMark),
        is(t)
    }
    function Yo(t, e) {
      e.readingMore || ((e.readingMore = !0), process.nextTick(Qo, t, e))
    }
    function Qo(t, e) {
      for (
        ;
        !e.reading &&
        !e.ended &&
        (e.length < e.highWaterMark || (e.flowing && 0 === e.length));

      ) {
        var r = e.length
        if ((Bo('maybeReadMore read 0'), t.read(0), r === e.length)) break
      }
      e.readingMore = !1
    }
    function ts(t) {
      var e = t._readableState
      ;(e.readableListening = t.listenerCount('readable') > 0),
        e.resumeScheduled && !e.paused
          ? (e.flowing = !0)
          : t.listenerCount('data') > 0 && t.resume()
    }
    function es(t) {
      Bo('readable nexttick read 0'), t.read(0)
    }
    function rs(t, e) {
      Bo('resume', e.reading),
        e.reading || t.read(0),
        (e.resumeScheduled = !1),
        t.emit('resume'),
        is(t),
        e.flowing && !e.reading && t.read(0)
    }
    function is(t) {
      var e = t._readableState
      for (Bo('flow', e.flowing); e.flowing && null !== t.read(); );
    }
    function ns(t, e) {
      return 0 === e.length
        ? null
        : (e.objectMode
            ? (r = e.buffer.shift())
            : !t || t >= e.length
            ? ((r = e.decoder
                ? e.buffer.join('')
                : 1 === e.buffer.length
                ? e.buffer.first()
                : e.buffer.concat(e.length)),
              e.buffer.clear())
            : (r = e.buffer.consume(t, e.decoder)),
          r)
      var r
    }
    function os(t) {
      var e = t._readableState
      Bo('endReadable', e.endEmitted),
        e.endEmitted || ((e.ended = !0), process.nextTick(ss, e, t))
    }
    function ss(t, e) {
      if (
        (Bo('endReadableNT', t.endEmitted, t.length),
        !t.endEmitted &&
          0 === t.length &&
          ((t.endEmitted = !0),
          (e.readable = !1),
          e.emit('end'),
          t.autoDestroy))
      ) {
        var r = e._writableState
        ;(!r || (r.autoDestroy && r.finished)) && e.destroy()
      }
    }
    function as(t, e) {
      for (var r = 0, i = t.length; r < i; r++) if (t[r] === e) return r
      return -1
    }
    ;(Ho.prototype.read = function (t) {
      Bo('read', t), (t = parseInt(t, 10))
      var e = this._readableState,
        r = t
      if (
        (0 !== t && (e.emittedReadable = !1),
        0 === t &&
          e.needReadable &&
          ((0 !== e.highWaterMark
            ? e.length >= e.highWaterMark
            : e.length > 0) ||
            e.ended))
      )
        return (
          Bo('read: emitReadable', e.length, e.ended),
          0 === e.length && e.ended ? os(this) : Go(this),
          null
        )
      if (0 === (t = Jo(t, e)) && e.ended)
        return 0 === e.length && os(this), null
      var i,
        n = e.needReadable
      return (
        Bo('need readable', n),
        (0 === e.length || e.length - t < e.highWaterMark) &&
          Bo('length less than watermark', (n = !0)),
        e.ended || e.reading
          ? Bo('reading or ended', (n = !1))
          : n &&
            (Bo('do read'),
            (e.reading = !0),
            (e.sync = !0),
            0 === e.length && (e.needReadable = !0),
            this._read(e.highWaterMark),
            (e.sync = !1),
            e.reading || (t = Jo(r, e))),
        null === (i = t > 0 ? ns(t, e) : null)
          ? ((e.needReadable = e.length <= e.highWaterMark), (t = 0))
          : ((e.length -= t), (e.awaitDrain = 0)),
        0 === e.length &&
          (e.ended || (e.needReadable = !0), r !== t && e.ended && os(this)),
        null !== i && this.emit('data', i),
        i
      )
    }),
      (Ho.prototype._read = function (t) {
        Zo(this, new Uo('_read()'))
      }),
      (Ho.prototype.pipe = function (t, e) {
        var r = this,
          i = this._readableState
        switch (i.pipesCount) {
          case 0:
            i.pipes = t
            break
          case 1:
            i.pipes = [i.pipes, t]
            break
          default:
            i.pipes.push(t)
        }
        ;(i.pipesCount += 1), Bo('pipe count=%d opts=%j', i.pipesCount, e)
        var n =
          (e && !1 === e.end) || t === process.stdout || t === process.stderr
            ? l
            : o
        function o() {
          Bo('onend'), t.end()
        }
        i.endEmitted ? process.nextTick(n) : r.once('end', n),
          t.on('unpipe', function e(n, c) {
            Bo('onunpipe'),
              n === r &&
                c &&
                !1 === c.hasUnpiped &&
                ((c.hasUnpiped = !0),
                Bo('cleanup'),
                t.removeListener('close', f),
                t.removeListener('finish', d),
                t.removeListener('drain', s),
                t.removeListener('error', u),
                t.removeListener('unpipe', e),
                r.removeListener('end', o),
                r.removeListener('end', l),
                r.removeListener('data', h),
                (a = !0),
                !i.awaitDrain ||
                  (t._writableState && !t._writableState.needDrain) ||
                  s())
          })
        var s = (function (t) {
          return function () {
            var e = t._readableState
            Bo('pipeOnDrain', e.awaitDrain),
              e.awaitDrain && e.awaitDrain--,
              0 === e.awaitDrain && Io(t, 'data') && ((e.flowing = !0), is(t))
          }
        })(r)
        t.on('drain', s)
        var a = !1
        function h(e) {
          Bo('ondata')
          var n = t.write(e)
          Bo('dest.write', n),
            !1 === n &&
              (((1 === i.pipesCount && i.pipes === t) ||
                (i.pipesCount > 1 && -1 !== as(i.pipes, t))) &&
                !a &&
                (Bo('false write response, pause', i.awaitDrain),
                i.awaitDrain++),
              r.pause())
        }
        function u(e) {
          Bo('onerror', e),
            l(),
            t.removeListener('error', u),
            0 === Io(t, 'error') && Zo(t, e)
        }
        function f() {
          t.removeListener('finish', d), l()
        }
        function d() {
          Bo('onfinish'), t.removeListener('close', f), l()
        }
        function l() {
          Bo('unpipe'), r.unpipe(t)
        }
        return (
          r.on('data', h),
          (function (t, e, r) {
            if ('function' == typeof t.prependListener)
              return t.prependListener(e, r)
            t._events && t._events.error
              ? Array.isArray(t._events.error)
                ? t._events.error.unshift(r)
                : (t._events.error = [r, t._events.error])
              : t.on(e, r)
          })(t, 'error', u),
          t.once('close', f),
          t.once('finish', d),
          t.emit('pipe', r),
          i.flowing || (Bo('pipe resume'), r.resume()),
          t
        )
      }),
      (Ho.prototype.unpipe = function (t) {
        var e = this._readableState,
          r = { hasUnpiped: !1 }
        if (0 === e.pipesCount) return this
        if (1 === e.pipesCount)
          return (
            (t && t !== e.pipes) ||
              (t || (t = e.pipes),
              (e.pipes = null),
              (e.pipesCount = 0),
              (e.flowing = !1),
              t && t.emit('unpipe', this, r)),
            this
          )
        if (!t) {
          var i = e.pipes,
            n = e.pipesCount
          ;(e.pipes = null), (e.pipesCount = 0), (e.flowing = !1)
          for (var o = 0; o < n; o++)
            i[o].emit('unpipe', this, { hasUnpiped: !1 })
          return this
        }
        var s = as(e.pipes, t)
        return (
          -1 === s ||
            (e.pipes.splice(s, 1),
            (e.pipesCount -= 1),
            1 === e.pipesCount && (e.pipes = e.pipes[0]),
            t.emit('unpipe', this, r)),
          this
        )
      }),
      (Ho.prototype.addListener = Ho.prototype.on =
        function (t, e) {
          var r = Yi.prototype.on.call(this, t, e),
            i = this._readableState
          return (
            'data' === t
              ? ((i.readableListening = this.listenerCount('readable') > 0),
                !1 !== i.flowing && this.resume())
              : 'readable' === t &&
                (i.endEmitted ||
                  i.readableListening ||
                  ((i.readableListening = i.needReadable = !0),
                  (i.flowing = !1),
                  (i.emittedReadable = !1),
                  Bo('on readable', i.length, i.reading),
                  i.length
                    ? Go(this)
                    : i.reading || process.nextTick(es, this))),
            r
          )
        }),
      (Ho.prototype.removeListener = function (t, e) {
        var r = Yi.prototype.removeListener.call(this, t, e)
        return 'readable' === t && process.nextTick(ts, this), r
      }),
      (Ho.prototype.removeAllListeners = function (t) {
        var e = Yi.prototype.removeAllListeners.apply(this, arguments)
        return (
          ('readable' !== t && void 0 !== t) || process.nextTick(ts, this), e
        )
      }),
      (Ho.prototype.resume = function () {
        var t = this._readableState
        return (
          t.flowing ||
            (Bo('resume'),
            (t.flowing = !t.readableListening),
            (function (t, e) {
              e.resumeScheduled ||
                ((e.resumeScheduled = !0), process.nextTick(rs, t, e))
            })(this, t)),
          (t.paused = !1),
          this
        )
      }),
      (Ho.prototype.pause = function () {
        return (
          Bo('call pause flowing=%j', this._readableState.flowing),
          !1 !== this._readableState.flowing &&
            (Bo('pause'),
            (this._readableState.flowing = !1),
            this.emit('pause')),
          (this._readableState.paused = !0),
          this
        )
      }),
      (Ho.prototype.wrap = function (t) {
        var e = this,
          r = this._readableState,
          i = !1
        for (var n in (t.on('end', function () {
          if ((Bo('wrapped end'), r.decoder && !r.ended)) {
            var t = r.decoder.end()
            t && t.length && e.push(t)
          }
          e.push(null)
        }),
        t.on('data', function (n) {
          Bo('wrapped data'),
            r.decoder && (n = r.decoder.write(n)),
            (r.objectMode && null == n) ||
              ((r.objectMode || (n && n.length)) &&
                (e.push(n) || ((i = !0), t.pause())))
        }),
        t))
          void 0 === this[n] &&
            'function' == typeof t[n] &&
            (this[n] = (function (e) {
              return function () {
                return t[e].apply(t, arguments)
              }
            })(n))
        for (var o = 0; o < Fo.length; o++)
          t.on(Fo[o], this.emit.bind(this, Fo[o]))
        return (
          (this._read = function (e) {
            Bo('wrapped _read', e), i && ((i = !1), t.resume())
          }),
          this
        )
      }),
      'function' == typeof Symbol &&
        (Ho.prototype[Symbol.asyncIterator] = function () {
          return void 0 === Oo && (Oo = wo), Oo(this)
        }),
      Object.defineProperty(Ho.prototype, 'readableHighWaterMark', {
        enumerable: !1,
        get: function () {
          return this._readableState.highWaterMark
        }
      }),
      Object.defineProperty(Ho.prototype, 'readableBuffer', {
        enumerable: !1,
        get: function () {
          return this._readableState && this._readableState.buffer
        }
      }),
      Object.defineProperty(Ho.prototype, 'readableFlowing', {
        enumerable: !1,
        get: function () {
          return this._readableState.flowing
        },
        set: function (t) {
          this._readableState && (this._readableState.flowing = t)
        }
      }),
      (Ho._fromList = ns),
      Object.defineProperty(Ho.prototype, 'readableLength', {
        enumerable: !1,
        get: function () {
          return this._readableState.length
        }
      }),
      'function' == typeof Symbol &&
        (Ho.from = function (t, e) {
          return void 0 === qo && (qo = Eo), qo(Ho, t, e)
        })
    var hs = ms,
      us = bn.codes,
      fs = us.ERR_METHOD_NOT_IMPLEMENTED,
      ds = us.ERR_MULTIPLE_CALLBACK,
      ls = us.ERR_TRANSFORM_ALREADY_TRANSFORMING,
      cs = us.ERR_TRANSFORM_WITH_LENGTH_0
    function ps(t, e) {
      var r = this._transformState
      r.transforming = !1
      var i = r.writecb
      if (null === i) return this.emit('error', new ds())
      ;(r.writechunk = null),
        (r.writecb = null),
        null != e && this.push(e),
        i(t)
      var n = this._readableState
      ;(n.reading = !1),
        (n.needReadable || n.length < n.highWaterMark) &&
          this._read(n.highWaterMark)
    }
    function ms(t) {
      if (!(this instanceof ms)) return new ms(t)
      wn.call(this, t),
        (this._transformState = {
          afterTransform: ps.bind(this),
          needTransform: !1,
          transforming: !1,
          writecb: null,
          writechunk: null,
          writeencoding: null
        }),
        (this._readableState.needReadable = !0),
        (this._readableState.sync = !1),
        t &&
          ('function' == typeof t.transform && (this._transform = t.transform),
          'function' == typeof t.flush && (this._flush = t.flush)),
        this.on('prefinish', bs)
    }
    function bs() {
      var t = this
      'function' != typeof this._flush || this._readableState.destroyed
        ? gs(this, null, null)
        : this._flush(function (e, r) {
            gs(t, e, r)
          })
    }
    function gs(t, e, r) {
      if (e) return t.emit('error', e)
      if ((null != r && t.push(r), t._writableState.length)) throw new cs()
      if (t._transformState.transforming) throw new ls()
      return t.push(null)
    }
    be(ms, wn),
      (ms.prototype.push = function (t, e) {
        return (
          (this._transformState.needTransform = !1),
          wn.prototype.push.call(this, t, e)
        )
      }),
      (ms.prototype._transform = function (t, e, r) {
        r(new fs('_transform()'))
      }),
      (ms.prototype._write = function (t, e, r) {
        var i = this._transformState
        if (
          ((i.writecb = r),
          (i.writechunk = t),
          (i.writeencoding = e),
          !i.transforming)
        ) {
          var n = this._readableState
          ;(i.needTransform || n.needReadable || n.length < n.highWaterMark) &&
            this._read(n.highWaterMark)
        }
      }),
      (ms.prototype._read = function (t) {
        var e = this._transformState
        null === e.writechunk || e.transforming
          ? (e.needTransform = !0)
          : ((e.transforming = !0),
            this._transform(e.writechunk, e.writeencoding, e.afterTransform))
      }),
      (ms.prototype._destroy = function (t, e) {
        wn.prototype._destroy.call(this, t, function (t) {
          e(t)
        })
      })
    var vs,
      ys = ws
    function ws(t) {
      if (!(this instanceof ws)) return new ws(t)
      hs.call(this, t)
    }
    be(ws, hs),
      (ws.prototype._transform = function (t, e, r) {
        r(null, t)
      })
    var Ms = bn.codes,
      _s = Ms.ERR_MISSING_ARGS,
      Ss = Ms.ERR_STREAM_DESTROYED
    function As(t) {
      if (t) throw t
    }
    function ks(t, e, r, i) {
      i = (function (t) {
        var e = !1
        return function () {
          e || ((e = !0), t.apply(void 0, arguments))
        }
      })(i)
      var n = !1
      t.on('close', function () {
        n = !0
      }),
        void 0 === vs && (vs = oo),
        vs(t, { readable: e, writable: r }, function (t) {
          if (t) return i(t)
          ;(n = !0), i()
        })
      var o = !1
      return function (e) {
        if (!n && !o)
          return (
            (o = !0),
            (function (t) {
              return t.setHeader && 'function' == typeof t.abort
            })(t)
              ? t.abort()
              : 'function' == typeof t.destroy
              ? t.destroy()
              : void i(e || new Ss('pipe'))
          )
      }
    }
    function xs(t) {
      t()
    }
    function Es(t, e) {
      return t.pipe(e)
    }
    function Rs(t) {
      return t.length
        ? 'function' != typeof t[t.length - 1]
          ? As
          : t.pop()
        : As
    }
    var Bs = function () {
        for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
          e[r] = arguments[r]
        var i,
          n = Rs(e)
        if ((Array.isArray(e[0]) && (e = e[0]), e.length < 2))
          throw new _s('streams')
        var o = e.map(function (t, r) {
          var s = r < e.length - 1
          return ks(t, s, r > 0, function (t) {
            i || (i = t), t && o.forEach(xs), s || (o.forEach(xs), n(i))
          })
        })
        return e.reduce(Es)
      },
      Is = dt(function (t, e) {
        'disable' === process.env.READABLE_STREAM && L.default
          ? ((t.exports = L.default.Readable),
            Object.assign(t.exports, L.default),
            (t.exports.Stream = L.default))
          : (((e = t.exports = $n).Stream = L.default || e),
            (e.Readable = e),
            (e.Writable = Mn),
            (e.Duplex = wn),
            (e.Transform = hs),
            (e.PassThrough = ys),
            (e.finished = oo),
            (e.pipeline = Bs))
      })
    const { Transform: Ns } = Is
    var Ts = (t) =>
      class e extends Ns {
        constructor(e, r, i, n, o) {
          super(o),
            (this._rate = e),
            (this._capacity = r),
            (this._delimitedSuffix = i),
            (this._hashBitLength = n),
            (this._options = o),
            (this._state = new t()),
            this._state.initialize(e, r),
            (this._finalized = !1)
        }
        _transform(t, e, r) {
          let i = null
          try {
            this.update(t, e)
          } catch (t) {
            i = t
          }
          r(i)
        }
        _flush(t) {
          let e = null
          try {
            this.push(this.digest())
          } catch (t) {
            e = t
          }
          t(e)
        }
        update(t, e) {
          if (!Buffer.isBuffer(t) && 'string' != typeof t)
            throw new TypeError('Data must be a string or a buffer')
          if (this._finalized) throw new Error('Digest already called')
          return (
            Buffer.isBuffer(t) || (t = Buffer.from(t, e)),
            this._state.absorb(t),
            this
          )
        }
        digest(t) {
          if (this._finalized) throw new Error('Digest already called')
          ;(this._finalized = !0),
            this._delimitedSuffix &&
              this._state.absorbLastFewBits(this._delimitedSuffix)
          let e = this._state.squeeze(this._hashBitLength / 8)
          return void 0 !== t && (e = e.toString(t)), this._resetState(), e
        }
        _resetState() {
          return this._state.initialize(this._rate, this._capacity), this
        }
        _clone() {
          const t = new e(
            this._rate,
            this._capacity,
            this._delimitedSuffix,
            this._hashBitLength,
            this._options
          )
          return this._state.copy(t._state), (t._finalized = this._finalized), t
        }
      }
    const { Transform: Ps } = Is
    var Os = (t) =>
        class e extends Ps {
          constructor(e, r, i, n) {
            super(n),
              (this._rate = e),
              (this._capacity = r),
              (this._delimitedSuffix = i),
              (this._options = n),
              (this._state = new t()),
              this._state.initialize(e, r),
              (this._finalized = !1)
          }
          _transform(t, e, r) {
            let i = null
            try {
              this.update(t, e)
            } catch (t) {
              i = t
            }
            r(i)
          }
          _flush() {}
          _read(t) {
            this.push(this.squeeze(t))
          }
          update(t, e) {
            if (!Buffer.isBuffer(t) && 'string' != typeof t)
              throw new TypeError('Data must be a string or a buffer')
            if (this._finalized) throw new Error('Squeeze already called')
            return (
              Buffer.isBuffer(t) || (t = Buffer.from(t, e)),
              this._state.absorb(t),
              this
            )
          }
          squeeze(t, e) {
            this._finalized ||
              ((this._finalized = !0),
              this._state.absorbLastFewBits(this._delimitedSuffix))
            let r = this._state.squeeze(t)
            return void 0 !== e && (r = r.toString(e)), r
          }
          _resetState() {
            return this._state.initialize(this._rate, this._capacity), this
          }
          _clone() {
            const t = new e(
              this._rate,
              this._capacity,
              this._delimitedSuffix,
              this._options
            )
            return (
              this._state.copy(t._state), (t._finalized = this._finalized), t
            )
          }
        },
      qs = function (t) {
        const e = Ts(t),
          r = Os(t)
        return function (t, i) {
          switch ('string' == typeof t ? t.toLowerCase() : t) {
            case 'keccak224':
              return new e(1152, 448, null, 224, i)
            case 'keccak256':
              return new e(1088, 512, null, 256, i)
            case 'keccak384':
              return new e(832, 768, null, 384, i)
            case 'keccak512':
              return new e(576, 1024, null, 512, i)
            case 'sha3-224':
              return new e(1152, 448, 6, 224, i)
            case 'sha3-256':
              return new e(1088, 512, 6, 256, i)
            case 'sha3-384':
              return new e(832, 768, 6, 384, i)
            case 'sha3-512':
              return new e(576, 1024, 6, 512, i)
            case 'shake128':
              return new r(1344, 256, 31, i)
            case 'shake256':
              return new r(1088, 512, 31, i)
            default:
              throw new Error('Invald algorithm: ' + t)
          }
        }
      },
      Ls = qs(It(__dirname))
    const zs = [
      1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0,
      2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0,
      2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905,
      2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778,
      0, 2147483658, 2147483648, 2147516545, 2147483648, 32896, 2147483648,
      2147483649, 0, 2147516424, 2147483648
    ]
    var js = function (t) {
      for (let e = 0; e < 24; ++e) {
        const r = t[0] ^ t[10] ^ t[20] ^ t[30] ^ t[40],
          i = t[1] ^ t[11] ^ t[21] ^ t[31] ^ t[41],
          n = t[2] ^ t[12] ^ t[22] ^ t[32] ^ t[42],
          o = t[3] ^ t[13] ^ t[23] ^ t[33] ^ t[43],
          s = t[4] ^ t[14] ^ t[24] ^ t[34] ^ t[44],
          a = t[5] ^ t[15] ^ t[25] ^ t[35] ^ t[45],
          h = t[6] ^ t[16] ^ t[26] ^ t[36] ^ t[46],
          u = t[7] ^ t[17] ^ t[27] ^ t[37] ^ t[47],
          f = t[8] ^ t[18] ^ t[28] ^ t[38] ^ t[48],
          d = t[9] ^ t[19] ^ t[29] ^ t[39] ^ t[49]
        let l = f ^ ((n << 1) | (o >>> 31)),
          c = d ^ ((o << 1) | (n >>> 31))
        const p = t[0] ^ l,
          m = t[1] ^ c,
          b = t[10] ^ l,
          g = t[11] ^ c,
          v = t[20] ^ l,
          y = t[21] ^ c,
          w = t[30] ^ l,
          M = t[31] ^ c,
          _ = t[40] ^ l,
          S = t[41] ^ c
        ;(l = r ^ ((s << 1) | (a >>> 31))), (c = i ^ ((a << 1) | (s >>> 31)))
        const A = t[2] ^ l,
          k = t[3] ^ c,
          x = t[12] ^ l,
          E = t[13] ^ c,
          R = t[22] ^ l,
          B = t[23] ^ c,
          I = t[32] ^ l,
          N = t[33] ^ c,
          T = t[42] ^ l,
          P = t[43] ^ c
        ;(l = n ^ ((h << 1) | (u >>> 31))), (c = o ^ ((u << 1) | (h >>> 31)))
        const O = t[4] ^ l,
          q = t[5] ^ c,
          L = t[14] ^ l,
          z = t[15] ^ c,
          j = t[24] ^ l,
          C = t[25] ^ c,
          U = t[34] ^ l,
          D = t[35] ^ c,
          Z = t[44] ^ l,
          F = t[45] ^ c
        ;(l = s ^ ((f << 1) | (d >>> 31))), (c = a ^ ((d << 1) | (f >>> 31)))
        const K = t[6] ^ l,
          H = t[7] ^ c,
          V = t[16] ^ l,
          $ = t[17] ^ c,
          W = t[26] ^ l,
          J = t[27] ^ c,
          G = t[36] ^ l,
          X = t[37] ^ c,
          Y = t[46] ^ l,
          Q = t[47] ^ c
        ;(l = h ^ ((r << 1) | (i >>> 31))), (c = u ^ ((i << 1) | (r >>> 31)))
        const tt = t[8] ^ l,
          et = t[9] ^ c,
          rt = t[18] ^ l,
          it = t[19] ^ c,
          nt = t[28] ^ l,
          ot = t[29] ^ c,
          st = t[38] ^ l,
          at = t[39] ^ c,
          ht = t[48] ^ l,
          ut = t[49] ^ c,
          ft = p,
          dt = m,
          lt = (g << 4) | (b >>> 28),
          ct = (b << 4) | (g >>> 28),
          pt = (v << 3) | (y >>> 29),
          mt = (y << 3) | (v >>> 29),
          bt = (M << 9) | (w >>> 23),
          gt = (w << 9) | (M >>> 23),
          vt = (_ << 18) | (S >>> 14),
          yt = (S << 18) | (_ >>> 14),
          wt = (A << 1) | (k >>> 31),
          Mt = (k << 1) | (A >>> 31),
          _t = (E << 12) | (x >>> 20),
          St = (x << 12) | (E >>> 20),
          At = (R << 10) | (B >>> 22),
          kt = (B << 10) | (R >>> 22),
          xt = (N << 13) | (I >>> 19),
          Et = (I << 13) | (N >>> 19),
          Rt = (T << 2) | (P >>> 30),
          Bt = (P << 2) | (T >>> 30),
          It = (q << 30) | (O >>> 2),
          Nt = (O << 30) | (q >>> 2),
          Tt = (L << 6) | (z >>> 26),
          Pt = (z << 6) | (L >>> 26),
          Ot = (C << 11) | (j >>> 21),
          qt = (j << 11) | (C >>> 21),
          Lt = (U << 15) | (D >>> 17),
          zt = (D << 15) | (U >>> 17),
          jt = (F << 29) | (Z >>> 3),
          Ct = (Z << 29) | (F >>> 3),
          Ut = (K << 28) | (H >>> 4),
          Dt = (H << 28) | (K >>> 4),
          Zt = ($ << 23) | (V >>> 9),
          Ft = (V << 23) | ($ >>> 9),
          Kt = (W << 25) | (J >>> 7),
          Ht = (J << 25) | (W >>> 7),
          Vt = (G << 21) | (X >>> 11),
          $t = (X << 21) | (G >>> 11),
          Wt = (Q << 24) | (Y >>> 8),
          Jt = (Y << 24) | (Q >>> 8),
          Gt = (tt << 27) | (et >>> 5),
          Xt = (et << 27) | (tt >>> 5),
          Yt = (rt << 20) | (it >>> 12),
          Qt = (it << 20) | (rt >>> 12),
          te = (ot << 7) | (nt >>> 25),
          ee = (nt << 7) | (ot >>> 25),
          re = (st << 8) | (at >>> 24),
          ie = (at << 8) | (st >>> 24),
          ne = (ht << 14) | (ut >>> 18),
          oe = (ut << 14) | (ht >>> 18)
        ;(t[0] = ft ^ (~_t & Ot)),
          (t[1] = dt ^ (~St & qt)),
          (t[10] = Ut ^ (~Yt & pt)),
          (t[11] = Dt ^ (~Qt & mt)),
          (t[20] = wt ^ (~Tt & Kt)),
          (t[21] = Mt ^ (~Pt & Ht)),
          (t[30] = Gt ^ (~lt & At)),
          (t[31] = Xt ^ (~ct & kt)),
          (t[40] = It ^ (~Zt & te)),
          (t[41] = Nt ^ (~Ft & ee)),
          (t[2] = _t ^ (~Ot & Vt)),
          (t[3] = St ^ (~qt & $t)),
          (t[12] = Yt ^ (~pt & xt)),
          (t[13] = Qt ^ (~mt & Et)),
          (t[22] = Tt ^ (~Kt & re)),
          (t[23] = Pt ^ (~Ht & ie)),
          (t[32] = lt ^ (~At & Lt)),
          (t[33] = ct ^ (~kt & zt)),
          (t[42] = Zt ^ (~te & bt)),
          (t[43] = Ft ^ (~ee & gt)),
          (t[4] = Ot ^ (~Vt & ne)),
          (t[5] = qt ^ (~$t & oe)),
          (t[14] = pt ^ (~xt & jt)),
          (t[15] = mt ^ (~Et & Ct)),
          (t[24] = Kt ^ (~re & vt)),
          (t[25] = Ht ^ (~ie & yt)),
          (t[34] = At ^ (~Lt & Wt)),
          (t[35] = kt ^ (~zt & Jt)),
          (t[44] = te ^ (~bt & Rt)),
          (t[45] = ee ^ (~gt & Bt)),
          (t[6] = Vt ^ (~ne & ft)),
          (t[7] = $t ^ (~oe & dt)),
          (t[16] = xt ^ (~jt & Ut)),
          (t[17] = Et ^ (~Ct & Dt)),
          (t[26] = re ^ (~vt & wt)),
          (t[27] = ie ^ (~yt & Mt)),
          (t[36] = Lt ^ (~Wt & Gt)),
          (t[37] = zt ^ (~Jt & Xt)),
          (t[46] = bt ^ (~Rt & It)),
          (t[47] = gt ^ (~Bt & Nt)),
          (t[8] = ne ^ (~ft & _t)),
          (t[9] = oe ^ (~dt & St)),
          (t[18] = jt ^ (~Ut & Yt)),
          (t[19] = Ct ^ (~Dt & Qt)),
          (t[28] = vt ^ (~wt & Tt)),
          (t[29] = yt ^ (~Mt & Pt)),
          (t[38] = Wt ^ (~Gt & lt)),
          (t[39] = Jt ^ (~Xt & ct)),
          (t[48] = Rt ^ (~It & Zt)),
          (t[49] = Bt ^ (~Nt & Ft)),
          (t[0] ^= zs[2 * e]),
          (t[1] ^= zs[2 * e + 1])
      }
    }
    function Cs() {
      ;(this.state = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0
      ]),
        (this.blockSize = null),
        (this.count = 0),
        (this.squeezing = !1)
    }
    ;(Cs.prototype.initialize = function (t, e) {
      for (let t = 0; t < 50; ++t) this.state[t] = 0
      ;(this.blockSize = t / 8), (this.count = 0), (this.squeezing = !1)
    }),
      (Cs.prototype.absorb = function (t) {
        for (let e = 0; e < t.length; ++e)
          (this.state[~~(this.count / 4)] ^= t[e] << ((this.count % 4) * 8)),
            (this.count += 1),
            this.count === this.blockSize && (js(this.state), (this.count = 0))
      }),
      (Cs.prototype.absorbLastFewBits = function (t) {
        ;(this.state[~~(this.count / 4)] ^= t << ((this.count % 4) * 8)),
          0 != (128 & t) && this.count === this.blockSize - 1 && js(this.state),
          (this.state[~~((this.blockSize - 1) / 4)] ^=
            128 << (((this.blockSize - 1) % 4) * 8)),
          js(this.state),
          (this.count = 0),
          (this.squeezing = !0)
      }),
      (Cs.prototype.squeeze = function (t) {
        this.squeezing || this.absorbLastFewBits(1)
        const e = Buffer.alloc(t)
        for (let r = 0; r < t; ++r)
          (e[r] =
            (this.state[~~(this.count / 4)] >>> ((this.count % 4) * 8)) & 255),
            (this.count += 1),
            this.count === this.blockSize && (js(this.state), (this.count = 0))
        return e
      }),
      (Cs.prototype.copy = function (t) {
        for (let e = 0; e < 50; ++e) t.state[e] = this.state[e]
        ;(t.blockSize = this.blockSize),
          (t.count = this.count),
          (t.squeezing = this.squeezing)
      })
    var Us,
      Ds,
      Zs,
      Fs,
      Ks,
      Hs,
      Vs,
      $s,
      Ws = qs(Cs),
      Js = dt(function (t) {
        try {
          t.exports = Ls
        } catch (e) {
          t.exports = Ws
        }
      }),
      Gs = Xi,
      Xs = Gs.createHashFunction(function () {
        return Js('keccak224')
      }),
      Ys = Gs.createHashFunction(function () {
        return Js('keccak256')
      }),
      Qs = Gs.createHashFunction(function () {
        return Js('keccak384')
      }),
      ta = Gs.createHashFunction(function () {
        return Js('keccak512')
      }),
      ea = q.default.createHash,
      ra = /*#__PURE__*/ Object.defineProperty(
        { keccak224: Xs, keccak256: Ys, keccak384: Qs, keccak512: ta },
        '__esModule',
        { value: !0 }
      ),
      ia = dt(function (t, e) {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.rlphash =
            e.ripemd160FromArray =
            e.ripemd160FromString =
            e.ripemd160 =
            e.sha256FromArray =
            e.sha256FromString =
            e.sha256 =
            e.keccakFromArray =
            e.keccakFromHexString =
            e.keccakFromString =
            e.keccak256 =
            e.keccak =
              void 0),
          (e.keccak = function (t, e = 256) {
            switch (((0, Ji.assertIsBuffer)(t), e)) {
              case 224:
                return (0, ra.keccak224)(t)
              case 256:
                return (0, ra.keccak256)(t)
              case 384:
                return (0, ra.keccak384)(t)
              case 512:
                return (0, ra.keccak512)(t)
              default:
                throw new Error(`Invald algorithm: keccak${e}`)
            }
          }),
          (e.keccak256 = function (t) {
            return (0, e.keccak)(t)
          }),
          (e.keccakFromString = function (t, r = 256) {
            ;(0, Ji.assertIsString)(t)
            const i = Buffer.from(t, 'utf8')
            return (0, e.keccak)(i, r)
          }),
          (e.keccakFromHexString = function (t, r = 256) {
            return (
              (0, Ji.assertIsHexString)(t),
              (0, e.keccak)((0, Gi.toBuffer)(t), r)
            )
          }),
          (e.keccakFromArray = function (t, r = 256) {
            return (
              (0, Ji.assertIsArray)(t), (0, e.keccak)((0, Gi.toBuffer)(t), r)
            )
          })
        const r = function (t) {
          return (t = (0, Gi.toBuffer)(t)), ea('sha256').update(t).digest()
        }
        ;(e.sha256 = function (t) {
          return (0, Ji.assertIsBuffer)(t), r(t)
        }),
          (e.sha256FromString = function (t) {
            return (0, Ji.assertIsString)(t), r(t)
          }),
          (e.sha256FromArray = function (t) {
            return (0, Ji.assertIsArray)(t), r(t)
          })
        const i = function (t, e) {
          t = (0, Gi.toBuffer)(t)
          const r = ea('rmd160').update(t).digest()
          return !0 === e ? (0, Gi.setLengthLeft)(r, 32) : r
        }
        ;(e.ripemd160 = function (t, e) {
          return (0, Ji.assertIsBuffer)(t), i(t, e)
        }),
          (e.ripemd160FromString = function (t, e) {
            return (0, Ji.assertIsString)(t), i(t, e)
          }),
          (e.ripemd160FromArray = function (t, e) {
            return (0, Ji.assertIsArray)(t), i(t, e)
          }),
          (e.rlphash = function (t) {
            return (0, e.keccak)(vt.rlp.encode(t))
          })
      }),
      na = dt(function (t, e) {
        function r(t) {
          return (0, Gi.unpadBuffer)(t.toArrayLike(Buffer))
        }
        var i
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.toType =
            e.TypeOutput =
            e.bnToRlp =
            e.bnToUnpaddedBuffer =
            e.bnToHex =
              void 0),
          (e.bnToHex = function (t) {
            return `0x${t.toString(16)}`
          }),
          (e.bnToUnpaddedBuffer = r),
          (e.bnToRlp = function (t) {
            return r(t)
          }),
          (function (t) {
            ;(t[(t.Number = 0)] = 'Number'),
              (t[(t.BN = 1)] = 'BN'),
              (t[(t.Buffer = 2)] = 'Buffer'),
              (t[(t.PrefixedHexString = 3)] = 'PrefixedHexString')
          })((i = e.TypeOutput || (e.TypeOutput = {}))),
          (e.toType = function (t, e) {
            if (null === t) return null
            if (void 0 === t) return
            if ('string' == typeof t && !(0, Wi.isHexString)(t))
              throw new Error(
                `A string must be provided with a 0x-prefix, given: ${t}`
              )
            if ('number' == typeof t && !Number.isSafeInteger(t))
              throw new Error(
                'The provided number is greater than MAX_SAFE_INTEGER (please use an alternative input type)'
              )
            const r = (0, Gi.toBuffer)(t)
            if (e === i.Buffer) return r
            if (e === i.BN) return new vt.BN(r)
            if (e === i.Number) {
              const t = new vt.BN(r),
                e = new vt.BN(Number.MAX_SAFE_INTEGER.toString())
              if (t.gt(e))
                throw new Error(
                  'The provided number is greater than MAX_SAFE_INTEGER (please use an alternative output type)'
                )
              return t.toNumber()
            }
            return `0x${r.toString('hex')}`
          })
      }),
      oa = $i,
      sa = dt(function (t, e) {
        var r =
          (ft && ft.__importDefault) ||
          function (t) {
            return t && t.__esModule ? t : { default: t }
          }
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.isZeroAddress =
            e.zeroAddress =
            e.importPublic =
            e.privateToAddress =
            e.privateToPublic =
            e.publicToAddress =
            e.pubToAddress =
            e.isValidPublic =
            e.isValidPrivate =
            e.generateAddress2 =
            e.generateAddress =
            e.isValidChecksumAddress =
            e.toChecksumAddress =
            e.isValidAddress =
            e.Account =
              void 0)
        const i = r(O.default)
        class n {
          constructor(
            t = new vt.BN(0),
            e = new vt.BN(0),
            r = yt.KECCAK256_RLP,
            i = yt.KECCAK256_NULL
          ) {
            ;(this.nonce = t),
              (this.balance = e),
              (this.stateRoot = r),
              (this.codeHash = i),
              this._validate()
          }
          static fromAccountData(t) {
            const { nonce: e, balance: r, stateRoot: i, codeHash: o } = t
            return new n(
              e ? new vt.BN((0, Gi.toBuffer)(e)) : void 0,
              r ? new vt.BN((0, Gi.toBuffer)(r)) : void 0,
              i ? (0, Gi.toBuffer)(i) : void 0,
              o ? (0, Gi.toBuffer)(o) : void 0
            )
          }
          static fromRlpSerializedAccount(t) {
            const e = vt.rlp.decode(t)
            if (!Array.isArray(e))
              throw new Error('Invalid serialized account input. Must be array')
            return this.fromValuesArray(e)
          }
          static fromValuesArray(t) {
            const [e, r, i, o] = t
            return new n(new vt.BN(e), new vt.BN(r), i, o)
          }
          _validate() {
            if (this.nonce.lt(new vt.BN(0)))
              throw new Error('nonce must be greater than zero')
            if (this.balance.lt(new vt.BN(0)))
              throw new Error('balance must be greater than zero')
            if (32 !== this.stateRoot.length)
              throw new Error('stateRoot must have a length of 32')
            if (32 !== this.codeHash.length)
              throw new Error('codeHash must have a length of 32')
          }
          raw() {
            return [
              (0, na.bnToUnpaddedBuffer)(this.nonce),
              (0, na.bnToUnpaddedBuffer)(this.balance),
              this.stateRoot,
              this.codeHash
            ]
          }
          serialize() {
            return vt.rlp.encode(this.raw())
          }
          isContract() {
            return !this.codeHash.equals(yt.KECCAK256_NULL)
          }
          isEmpty() {
            return (
              this.balance.isZero() &&
              this.nonce.isZero() &&
              this.codeHash.equals(yt.KECCAK256_NULL)
            )
          }
        }
        ;(e.Account = n),
          (e.isValidAddress = function (t) {
            try {
              ;(0, Ji.assertIsString)(t)
            } catch (t) {
              return !1
            }
            return /^0x[0-9a-fA-F]{40}$/.test(t)
          }),
          (e.toChecksumAddress = function (t, e) {
            ;(0, Ji.assertIsHexString)(t)
            const r = (0, Wi.stripHexPrefix)(t).toLowerCase()
            let i = ''
            e && (i = (0, na.toType)(e, na.TypeOutput.BN).toString() + '0x')
            const n = (0, ia.keccakFromString)(i + r).toString('hex')
            let o = '0x'
            for (let t = 0; t < r.length; t++)
              parseInt(n[t], 16) >= 8 ? (o += r[t].toUpperCase()) : (o += r[t])
            return o
          }),
          (e.isValidChecksumAddress = function (t, r) {
            return (
              (0, e.isValidAddress)(t) && (0, e.toChecksumAddress)(t, r) === t
            )
          }),
          (e.generateAddress = function (t, e) {
            ;(0, Ji.assertIsBuffer)(t), (0, Ji.assertIsBuffer)(e)
            const r = new vt.BN(e)
            return r.isZero()
              ? (0, ia.rlphash)([t, null]).slice(-20)
              : (0, ia.rlphash)([t, Buffer.from(r.toArray())]).slice(-20)
          }),
          (e.generateAddress2 = function (t, e, r) {
            return (
              (0, Ji.assertIsBuffer)(t),
              (0, Ji.assertIsBuffer)(e),
              (0, Ji.assertIsBuffer)(r),
              (0, i.default)(20 === t.length),
              (0, i.default)(32 === e.length),
              (0, ia.keccak256)(
                Buffer.concat([
                  Buffer.from('ff', 'hex'),
                  t,
                  e,
                  (0, ia.keccak256)(r)
                ])
              ).slice(-20)
            )
          }),
          (e.isValidPrivate = function (t) {
            return (0, oa.privateKeyVerify)(t)
          }),
          (e.isValidPublic = function (t, e = !1) {
            return (
              (0, Ji.assertIsBuffer)(t),
              64 === t.length
                ? (0, oa.publicKeyVerify)(Buffer.concat([Buffer.from([4]), t]))
                : !!e && (0, oa.publicKeyVerify)(t)
            )
          }),
          (e.pubToAddress = function (t, e = !1) {
            return (
              (0, Ji.assertIsBuffer)(t),
              e &&
                64 !== t.length &&
                (t = Buffer.from((0, oa.publicKeyConvert)(t, !1).slice(1))),
              (0, i.default)(64 === t.length),
              (0, ia.keccak)(t).slice(-20)
            )
          }),
          (e.publicToAddress = e.pubToAddress),
          (e.privateToPublic = function (t) {
            return (
              (0, Ji.assertIsBuffer)(t),
              Buffer.from((0, oa.publicKeyCreate)(t, !1)).slice(1)
            )
          }),
          (e.privateToAddress = function (t) {
            return (0, e.publicToAddress)((0, e.privateToPublic)(t))
          }),
          (e.importPublic = function (t) {
            return (
              (0, Ji.assertIsBuffer)(t),
              64 !== t.length &&
                (t = Buffer.from((0, oa.publicKeyConvert)(t, !1).slice(1))),
              t
            )
          }),
          (e.zeroAddress = function () {
            const t = (0, Gi.zeros)(20)
            return (0, Gi.bufferToHex)(t)
          }),
          (e.isZeroAddress = function (t) {
            try {
              ;(0, Ji.assertIsString)(t)
            } catch (t) {
              return !1
            }
            return (0, e.zeroAddress)() === t
          })
      }),
      aa = dt(function (t, e) {
        var r =
          (ft && ft.__importDefault) ||
          function (t) {
            return t && t.__esModule ? t : { default: t }
          }
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.Address = void 0)
        const i = r(O.default)
        class n {
          constructor(t) {
            ;(0, i.default)(20 === t.length, 'Invalid address length'),
              (this.buf = t)
          }
          static zero() {
            return new n((0, Gi.zeros)(20))
          }
          static fromString(t) {
            return (
              (0, i.default)((0, sa.isValidAddress)(t), 'Invalid address'),
              new n((0, Gi.toBuffer)(t))
            )
          }
          static fromPublicKey(t) {
            ;(0, i.default)(Buffer.isBuffer(t), 'Public key should be Buffer')
            const e = (0, sa.pubToAddress)(t)
            return new n(e)
          }
          static fromPrivateKey(t) {
            ;(0, i.default)(Buffer.isBuffer(t), 'Private key should be Buffer')
            const e = (0, sa.privateToAddress)(t)
            return new n(e)
          }
          static generate(t, e) {
            return (
              (0, i.default)(vt.BN.isBN(e)),
              new n((0, sa.generateAddress)(t.buf, e.toArrayLike(Buffer)))
            )
          }
          static generate2(t, e, r) {
            return (
              (0, i.default)(Buffer.isBuffer(e)),
              (0, i.default)(Buffer.isBuffer(r)),
              new n((0, sa.generateAddress2)(t.buf, e, r))
            )
          }
          equals(t) {
            return this.buf.equals(t.buf)
          }
          isZero() {
            return this.equals(n.zero())
          }
          isPrecompileOrSystemAddress() {
            const t = new vt.BN(this.buf),
              e = new vt.BN(0),
              r = new vt.BN('ffff', 'hex')
            return t.gte(e) && t.lte(r)
          }
          toString() {
            return '0x' + this.buf.toString('hex')
          }
          toBuffer() {
            return Buffer.from(this.buf)
          }
        }
        e.Address = n
      }),
      ha = dt(function (t, e) {
        function r(t, e) {
          const r = (0, na.toType)(t, na.TypeOutput.BN)
          if (!e) return r.subn(27)
          const i = (0, na.toType)(e, na.TypeOutput.BN)
          return r.sub(i.muln(2).addn(35))
        }
        function i(t) {
          const e = new vt.BN(t)
          return e.eqn(0) || e.eqn(1)
        }
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.hashPersonalMessage =
            e.isValidSignature =
            e.fromRpcSig =
            e.toCompactSig =
            e.toRpcSig =
            e.ecrecover =
            e.ecsign =
              void 0),
          (e.ecsign = function (t, e, r) {
            const { signature: i, recid: n } = (0, oa.ecdsaSign)(t, e),
              o = Buffer.from(i.slice(0, 32)),
              s = Buffer.from(i.slice(32, 64))
            if (!r || 'number' == typeof r) {
              if (r && !Number.isSafeInteger(r))
                throw new Error(
                  'The provided number is greater than MAX_SAFE_INTEGER (please use an alternative input type)'
                )
              return { r: o, s: s, v: r ? n + (2 * r + 35) : n + 27 }
            }
            return {
              r: o,
              s: s,
              v: (0, na.toType)(r, na.TypeOutput.BN)
                .muln(2)
                .addn(35)
                .addn(n)
                .toArrayLike(Buffer)
            }
          }),
          (e.ecrecover = function (t, e, n, o, s) {
            const a = Buffer.concat(
                [(0, Gi.setLengthLeft)(n, 32), (0, Gi.setLengthLeft)(o, 32)],
                64
              ),
              h = r(e, s)
            if (!i(h)) throw new Error('Invalid signature v value')
            const u = (0, oa.ecdsaRecover)(a, h.toNumber(), t)
            return Buffer.from((0, oa.publicKeyConvert)(u, !1).slice(1))
          }),
          (e.toRpcSig = function (t, e, n, o) {
            if (!i(r(t, o))) throw new Error('Invalid signature v value')
            return (0, Gi.bufferToHex)(
              Buffer.concat([
                (0, Gi.setLengthLeft)(e, 32),
                (0, Gi.setLengthLeft)(n, 32),
                (0, Gi.toBuffer)(t)
              ])
            )
          }),
          (e.toCompactSig = function (t, e, n, o) {
            if (!i(r(t, o))) throw new Error('Invalid signature v value')
            const s = (0, na.toType)(t, na.TypeOutput.Number)
            let a = n
            return (
              ((s > 28 && s % 2 == 1) || 1 === s || 28 === s) &&
                ((a = Buffer.from(n)), (a[0] |= 128)),
              (0, Gi.bufferToHex)(
                Buffer.concat([
                  (0, Gi.setLengthLeft)(e, 32),
                  (0, Gi.setLengthLeft)(a, 32)
                ])
              )
            )
          }),
          (e.fromRpcSig = function (t) {
            const e = (0, Gi.toBuffer)(t)
            let r, i, n
            if (e.length >= 65)
              (r = e.slice(0, 32)),
                (i = e.slice(32, 64)),
                (n = (0, Gi.bufferToInt)(e.slice(64)))
            else {
              if (64 !== e.length) throw new Error('Invalid signature length')
              ;(r = e.slice(0, 32)),
                (i = e.slice(32, 64)),
                (n = (0, Gi.bufferToInt)(e.slice(32, 33)) >> 7),
                (i[0] &= 127)
            }
            return n < 27 && (n += 27), { v: n, r: r, s: i }
          }),
          (e.isValidSignature = function (t, e, n, o = !0, s) {
            const a = new vt.BN(
                '7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0',
                16
              ),
              h = new vt.BN(
                'fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141',
                16
              )
            if (32 !== e.length || 32 !== n.length) return !1
            if (!i(r(t, s))) return !1
            const u = new vt.BN(e),
              f = new vt.BN(n)
            return !(
              u.isZero() ||
              u.gt(h) ||
              f.isZero() ||
              f.gt(h) ||
              (o && 1 === f.cmp(a))
            )
          }),
          (e.hashPersonalMessage = function (t) {
            ;(0, Ji.assertIsBuffer)(t)
            const e = Buffer.from(
              `Ethereum Signed Message:\n${t.length}`,
              'utf-8'
            )
            return (0, ia.keccak)(Buffer.concat([e, t]))
          })
      }),
      ua = dt(function (t, e) {
        var r =
          (ft && ft.__importDefault) ||
          function (t) {
            return t && t.__esModule ? t : { default: t }
          }
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.defineProperties = void 0)
        const i = r(O.default)
        e.defineProperties = function (t, e, r) {
          if (
            ((t.raw = []),
            (t._fields = []),
            (t.toJSON = function (e = !1) {
              if (e) {
                const e = {}
                return (
                  t._fields.forEach((r) => {
                    e[r] = `0x${t[r].toString('hex')}`
                  }),
                  e
                )
              }
              return (0, Gi.baToJSON)(t.raw)
            }),
            (t.serialize = function () {
              return vt.rlp.encode(t.raw)
            }),
            e.forEach((e, r) => {
              function n() {
                return t.raw[r]
              }
              function o(n) {
                '00' !== (n = (0, Gi.toBuffer)(n)).toString('hex') ||
                  e.allowZero ||
                  (n = Buffer.allocUnsafe(0)),
                  e.allowLess && e.length
                    ? ((n = (0, Gi.unpadBuffer)(n)),
                      (0, i.default)(
                        e.length >= n.length,
                        `The field ${e.name} must not have more ${e.length} bytes`
                      ))
                    : (e.allowZero && 0 === n.length) ||
                      !e.length ||
                      (0, i.default)(
                        e.length === n.length,
                        `The field ${e.name} must have byte length of ${e.length}`
                      ),
                  (t.raw[r] = n)
              }
              t._fields.push(e.name),
                Object.defineProperty(t, e.name, {
                  enumerable: !0,
                  configurable: !0,
                  get: n,
                  set: o
                }),
                e.default && (t[e.name] = e.default),
                e.alias &&
                  Object.defineProperty(t, e.alias, {
                    enumerable: !1,
                    configurable: !0,
                    set: o,
                    get: n
                  })
            }),
            r)
          )
            if (
              ('string' == typeof r &&
                (r = Buffer.from((0, Wi.stripHexPrefix)(r), 'hex')),
              Buffer.isBuffer(r) && (r = vt.rlp.decode(r)),
              Array.isArray(r))
            ) {
              if (r.length > t._fields.length)
                throw new Error('wrong number of fields in data')
              r.forEach((e, r) => {
                t[t._fields[r]] = (0, Gi.toBuffer)(e)
              })
            } else {
              if ('object' != typeof r) throw new Error('invalid data')
              {
                const i = Object.keys(r)
                e.forEach((e) => {
                  ;-1 !== i.indexOf(e.name) && (t[e.name] = r[e.name]),
                    -1 !== i.indexOf(e.alias) && (t[e.alias] = r[e.alias])
                })
              }
            }
        }
      })
    dt(function (t, e) {
      var r =
          (ft && ft.__createBinding) ||
          (Object.create
            ? function (t, e, r, i) {
                void 0 === i && (i = r),
                  Object.defineProperty(t, i, {
                    enumerable: !0,
                    get: function () {
                      return e[r]
                    }
                  })
              }
            : function (t, e, r, i) {
                void 0 === i && (i = r), (t[i] = e[r])
              }),
        i =
          (ft && ft.__exportStar) ||
          function (t, e) {
            for (var i in t)
              'default' === i ||
                Object.prototype.hasOwnProperty.call(e, i) ||
                r(e, t, i)
          }
      Object.defineProperty(e, '__esModule', { value: !0 }),
        (e.isHexString =
          e.getKeys =
          e.fromAscii =
          e.fromUtf8 =
          e.toAscii =
          e.arrayContainsArray =
          e.getBinarySize =
          e.padToEven =
          e.stripHexPrefix =
          e.isHexPrefixed =
            void 0),
        i(yt, e),
        i(sa, e),
        i(aa, e),
        i(ia, e),
        i(ha, e),
        i(Gi, e),
        i(ua, e),
        i(vt, e),
        i(na, e),
        Object.defineProperty(e, 'isHexPrefixed', {
          enumerable: !0,
          get: function () {
            return Wi.isHexPrefixed
          }
        }),
        Object.defineProperty(e, 'stripHexPrefix', {
          enumerable: !0,
          get: function () {
            return Wi.stripHexPrefix
          }
        }),
        Object.defineProperty(e, 'padToEven', {
          enumerable: !0,
          get: function () {
            return Wi.padToEven
          }
        }),
        Object.defineProperty(e, 'getBinarySize', {
          enumerable: !0,
          get: function () {
            return Wi.getBinarySize
          }
        }),
        Object.defineProperty(e, 'arrayContainsArray', {
          enumerable: !0,
          get: function () {
            return Wi.arrayContainsArray
          }
        }),
        Object.defineProperty(e, 'toAscii', {
          enumerable: !0,
          get: function () {
            return Wi.toAscii
          }
        }),
        Object.defineProperty(e, 'fromUtf8', {
          enumerable: !0,
          get: function () {
            return Wi.fromUtf8
          }
        }),
        Object.defineProperty(e, 'fromAscii', {
          enumerable: !0,
          get: function () {
            return Wi.fromAscii
          }
        }),
        Object.defineProperty(e, 'getKeys', {
          enumerable: !0,
          get: function () {
            return Wi.getKeys
          }
        }),
        Object.defineProperty(e, 'isHexString', {
          enumerable: !0,
          get: function () {
            return Wi.isHexString
          }
        })
    }),
      dt(function (t) {
        !(function () {
          var e = 'input is invalid type',
            r = 'object' == typeof window,
            i = r ? window : {}
          i.JS_SHA3_NO_WINDOW && (r = !1)
          var n = !r && 'object' == typeof self
          !i.JS_SHA3_NO_NODE_JS &&
          'object' == typeof process &&
          process.versions &&
          process.versions.node
            ? (i = ft)
            : n && (i = self)
          var o = !i.JS_SHA3_NO_COMMON_JS && t.exports,
            s = !i.JS_SHA3_NO_ARRAY_BUFFER && 'undefined' != typeof ArrayBuffer,
            a = '0123456789abcdef'.split(''),
            h = [4, 1024, 262144, 67108864],
            u = [0, 8, 16, 24],
            f = [
              1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907,
              0, 2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138,
              0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139,
              2147483648, 32905, 2147483648, 32771, 2147483648, 32770,
              2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648,
              2147516545, 2147483648, 32896, 2147483648, 2147483649, 0,
              2147516424, 2147483648
            ],
            d = [224, 256, 384, 512],
            l = [128, 256],
            c = ['hex', 'buffer', 'arrayBuffer', 'array', 'digest'],
            p = { 128: 168, 256: 136 }
          ;(!i.JS_SHA3_NO_NODE_JS && Array.isArray) ||
            (Array.isArray = function (t) {
              return '[object Array]' === Object.prototype.toString.call(t)
            }),
            !s ||
              (!i.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW && ArrayBuffer.isView) ||
              (ArrayBuffer.isView = function (t) {
                return (
                  'object' == typeof t &&
                  t.buffer &&
                  t.buffer.constructor === ArrayBuffer
                )
              })
          for (
            var m = function (t, e, r) {
                return function (i) {
                  return new I(t, e, t).update(i)[r]()
                }
              },
              b = function (t, e, r) {
                return function (i, n) {
                  return new I(t, e, n).update(i)[r]()
                }
              },
              g = function (t, e, r) {
                return function (e, i, n, o) {
                  return _['cshake' + t].update(e, i, n, o)[r]()
                }
              },
              v = function (t, e, r) {
                return function (e, i, n, o) {
                  return _['kmac' + t].update(e, i, n, o)[r]()
                }
              },
              y = function (t, e, r, i) {
                for (var n = 0; n < c.length; ++n) {
                  var o = c[n]
                  t[o] = e(r, i, o)
                }
                return t
              },
              w = function (t, e) {
                var r = m(t, e, 'hex')
                return (
                  (r.create = function () {
                    return new I(t, e, t)
                  }),
                  (r.update = function (t) {
                    return r.create().update(t)
                  }),
                  y(r, m, t, e)
                )
              },
              M = [
                {
                  name: 'keccak',
                  padding: [1, 256, 65536, 16777216],
                  bits: d,
                  createMethod: w
                },
                {
                  name: 'sha3',
                  padding: [6, 1536, 393216, 100663296],
                  bits: d,
                  createMethod: w
                },
                {
                  name: 'shake',
                  padding: [31, 7936, 2031616, 520093696],
                  bits: l,
                  createMethod: function (t, e) {
                    var r = b(t, e, 'hex')
                    return (
                      (r.create = function (r) {
                        return new I(t, e, r)
                      }),
                      (r.update = function (t, e) {
                        return r.create(e).update(t)
                      }),
                      y(r, b, t, e)
                    )
                  }
                },
                {
                  name: 'cshake',
                  padding: h,
                  bits: l,
                  createMethod: function (t, e) {
                    var r = p[t],
                      i = g(t, 0, 'hex')
                    return (
                      (i.create = function (i, n, o) {
                        return n || o
                          ? new I(t, e, i).bytepad([n, o], r)
                          : _['shake' + t].create(i)
                      }),
                      (i.update = function (t, e, r, n) {
                        return i.create(e, r, n).update(t)
                      }),
                      y(i, g, t, e)
                    )
                  }
                },
                {
                  name: 'kmac',
                  padding: h,
                  bits: l,
                  createMethod: function (t, e) {
                    var r = p[t],
                      i = v(t, 0, 'hex')
                    return (
                      (i.create = function (i, n, o) {
                        return new N(t, e, n)
                          .bytepad(['KMAC', o], r)
                          .bytepad([i], r)
                      }),
                      (i.update = function (t, e, r, n) {
                        return i.create(t, r, n).update(e)
                      }),
                      y(i, v, t, e)
                    )
                  }
                }
              ],
              _ = {},
              S = [],
              A = 0;
            A < M.length;
            ++A
          )
            for (var k = M[A], x = k.bits, E = 0; E < x.length; ++E) {
              var R = k.name + '_' + x[E]
              if (
                (S.push(R),
                (_[R] = k.createMethod(x[E], k.padding)),
                'sha3' !== k.name)
              ) {
                var B = k.name + x[E]
                S.push(B), (_[B] = _[R])
              }
            }
          function I(t, e, r) {
            ;(this.blocks = []),
              (this.s = []),
              (this.padding = e),
              (this.outputBits = r),
              (this.reset = !0),
              (this.finalized = !1),
              (this.block = 0),
              (this.start = 0),
              (this.blockCount = (1600 - (t << 1)) >> 5),
              (this.byteCount = this.blockCount << 2),
              (this.outputBlocks = r >> 5),
              (this.extraBytes = (31 & r) >> 3)
            for (var i = 0; i < 50; ++i) this.s[i] = 0
          }
          function N(t, e, r) {
            I.call(this, t, e, r)
          }
          ;(I.prototype.update = function (t) {
            if (this.finalized) throw new Error('finalize already called')
            var r,
              i = typeof t
            if ('string' !== i) {
              if ('object' !== i) throw new Error(e)
              if (null === t) throw new Error(e)
              if (s && t.constructor === ArrayBuffer) t = new Uint8Array(t)
              else if (!(Array.isArray(t) || (s && ArrayBuffer.isView(t))))
                throw new Error(e)
              r = !0
            }
            for (
              var n,
                o,
                a = this.blocks,
                h = this.byteCount,
                f = t.length,
                d = this.blockCount,
                l = 0,
                c = this.s;
              l < f;

            ) {
              if (this.reset)
                for (this.reset = !1, a[0] = this.block, n = 1; n < d + 1; ++n)
                  a[n] = 0
              if (r)
                for (n = this.start; l < f && n < h; ++l)
                  a[n >> 2] |= t[l] << u[3 & n++]
              else
                for (n = this.start; l < f && n < h; ++l)
                  (o = t.charCodeAt(l)) < 128
                    ? (a[n >> 2] |= o << u[3 & n++])
                    : o < 2048
                    ? ((a[n >> 2] |= (192 | (o >> 6)) << u[3 & n++]),
                      (a[n >> 2] |= (128 | (63 & o)) << u[3 & n++]))
                    : o < 55296 || o >= 57344
                    ? ((a[n >> 2] |= (224 | (o >> 12)) << u[3 & n++]),
                      (a[n >> 2] |= (128 | ((o >> 6) & 63)) << u[3 & n++]),
                      (a[n >> 2] |= (128 | (63 & o)) << u[3 & n++]))
                    : ((o =
                        65536 +
                        (((1023 & o) << 10) | (1023 & t.charCodeAt(++l)))),
                      (a[n >> 2] |= (240 | (o >> 18)) << u[3 & n++]),
                      (a[n >> 2] |= (128 | ((o >> 12) & 63)) << u[3 & n++]),
                      (a[n >> 2] |= (128 | ((o >> 6) & 63)) << u[3 & n++]),
                      (a[n >> 2] |= (128 | (63 & o)) << u[3 & n++]))
              if (((this.lastByteIndex = n), n >= h)) {
                for (this.start = n - h, this.block = a[d], n = 0; n < d; ++n)
                  c[n] ^= a[n]
                T(c), (this.reset = !0)
              } else this.start = n
            }
            return this
          }),
            (I.prototype.encode = function (t, e) {
              var r = 255 & t,
                i = 1,
                n = [r]
              for (r = 255 & (t >>= 8); r > 0; )
                n.unshift(r), (r = 255 & (t >>= 8)), ++i
              return e ? n.push(i) : n.unshift(i), this.update(n), n.length
            }),
            (I.prototype.encodeString = function (t) {
              var r,
                i = typeof t
              if ('string' !== i) {
                if ('object' !== i) throw new Error(e)
                if (null === t) throw new Error(e)
                if (s && t.constructor === ArrayBuffer) t = new Uint8Array(t)
                else if (!(Array.isArray(t) || (s && ArrayBuffer.isView(t))))
                  throw new Error(e)
                r = !0
              }
              var n = 0
              if (r) n = t.length
              else
                for (var o = 0; o < t.length; ++o) {
                  var a = t.charCodeAt(o)
                  a < 128
                    ? (n += 1)
                    : a < 2048
                    ? (n += 2)
                    : a < 55296 || a >= 57344
                    ? (n += 3)
                    : ((a =
                        65536 +
                        (((1023 & a) << 10) | (1023 & t.charCodeAt(++o)))),
                      (n += 4))
                }
              return (n += this.encode(8 * n)), this.update(t), n
            }),
            (I.prototype.bytepad = function (t, e) {
              for (var r = this.encode(e), i = 0; i < t.length; ++i)
                r += this.encodeString(t[i])
              var n = []
              return (n.length = e - (r % e)), this.update(n), this
            }),
            (I.prototype.finalize = function () {
              if (!this.finalized) {
                this.finalized = !0
                var t = this.blocks,
                  e = this.lastByteIndex,
                  r = this.blockCount,
                  i = this.s
                if (
                  ((t[e >> 2] |= this.padding[3 & e]),
                  this.lastByteIndex === this.byteCount)
                )
                  for (t[0] = t[r], e = 1; e < r + 1; ++e) t[e] = 0
                for (t[r - 1] |= 2147483648, e = 0; e < r; ++e) i[e] ^= t[e]
                T(i)
              }
            }),
            (I.prototype.toString = I.prototype.hex =
              function () {
                this.finalize()
                for (
                  var t,
                    e = this.blockCount,
                    r = this.s,
                    i = this.outputBlocks,
                    n = this.extraBytes,
                    o = 0,
                    s = 0,
                    h = '';
                  s < i;

                ) {
                  for (o = 0; o < e && s < i; ++o, ++s)
                    h +=
                      a[((t = r[o]) >> 4) & 15] +
                      a[15 & t] +
                      a[(t >> 12) & 15] +
                      a[(t >> 8) & 15] +
                      a[(t >> 20) & 15] +
                      a[(t >> 16) & 15] +
                      a[(t >> 28) & 15] +
                      a[(t >> 24) & 15]
                  s % e == 0 && (T(r), (o = 0))
                }
                return (
                  n &&
                    ((h += a[((t = r[o]) >> 4) & 15] + a[15 & t]),
                    n > 1 && (h += a[(t >> 12) & 15] + a[(t >> 8) & 15]),
                    n > 2 && (h += a[(t >> 20) & 15] + a[(t >> 16) & 15])),
                  h
                )
              }),
            (I.prototype.buffer = I.prototype.arrayBuffer =
              function () {
                this.finalize()
                var t,
                  e = this.blockCount,
                  r = this.s,
                  i = this.outputBlocks,
                  n = this.extraBytes,
                  o = 0,
                  s = 0,
                  a = this.outputBits >> 3
                t = n ? new ArrayBuffer((i + 1) << 2) : new ArrayBuffer(a)
                for (var h = new Uint32Array(t); s < i; ) {
                  for (o = 0; o < e && s < i; ++o, ++s) h[s] = r[o]
                  s % e == 0 && T(r)
                }
                return n && ((h[o] = r[o]), (t = t.slice(0, a))), t
              }),
            (I.prototype.digest = I.prototype.array =
              function () {
                this.finalize()
                for (
                  var t,
                    e,
                    r = this.blockCount,
                    i = this.s,
                    n = this.outputBlocks,
                    o = this.extraBytes,
                    s = 0,
                    a = 0,
                    h = [];
                  a < n;

                ) {
                  for (s = 0; s < r && a < n; ++s, ++a)
                    (h[(t = a << 2)] = 255 & (e = i[s])),
                      (h[t + 1] = (e >> 8) & 255),
                      (h[t + 2] = (e >> 16) & 255),
                      (h[t + 3] = (e >> 24) & 255)
                  a % r == 0 && T(i)
                }
                return (
                  o &&
                    ((h[(t = a << 2)] = 255 & (e = i[s])),
                    o > 1 && (h[t + 1] = (e >> 8) & 255),
                    o > 2 && (h[t + 2] = (e >> 16) & 255)),
                  h
                )
              }),
            ((N.prototype = new I()).finalize = function () {
              return (
                this.encode(this.outputBits, !0),
                I.prototype.finalize.call(this)
              )
            })
          var T = function (t) {
            var e,
              r,
              i,
              n,
              o,
              s,
              a,
              h,
              u,
              d,
              l,
              c,
              p,
              m,
              b,
              g,
              v,
              y,
              w,
              M,
              _,
              S,
              A,
              k,
              x,
              E,
              R,
              B,
              I,
              N,
              T,
              P,
              O,
              q,
              L,
              z,
              j,
              C,
              U,
              D,
              Z,
              F,
              K,
              H,
              V,
              $,
              W,
              J,
              G,
              X,
              Y,
              Q,
              tt,
              et,
              rt,
              it,
              nt,
              ot,
              st,
              at,
              ht,
              ut,
              ft
            for (i = 0; i < 48; i += 2)
              (n = t[0] ^ t[10] ^ t[20] ^ t[30] ^ t[40]),
                (o = t[1] ^ t[11] ^ t[21] ^ t[31] ^ t[41]),
                (h = t[4] ^ t[14] ^ t[24] ^ t[34] ^ t[44]),
                (u = t[5] ^ t[15] ^ t[25] ^ t[35] ^ t[45]),
                (d = t[6] ^ t[16] ^ t[26] ^ t[36] ^ t[46]),
                (l = t[7] ^ t[17] ^ t[27] ^ t[37] ^ t[47]),
                (r =
                  (p = t[9] ^ t[19] ^ t[29] ^ t[39] ^ t[49]) ^
                  (((a = t[3] ^ t[13] ^ t[23] ^ t[33] ^ t[43]) << 1) |
                    ((s = t[2] ^ t[12] ^ t[22] ^ t[32] ^ t[42]) >>> 31))),
                (t[0] ^= e =
                  (c = t[8] ^ t[18] ^ t[28] ^ t[38] ^ t[48]) ^
                  ((s << 1) | (a >>> 31))),
                (t[1] ^= r),
                (t[10] ^= e),
                (t[11] ^= r),
                (t[20] ^= e),
                (t[21] ^= r),
                (t[30] ^= e),
                (t[31] ^= r),
                (t[40] ^= e),
                (t[41] ^= r),
                (r = o ^ ((u << 1) | (h >>> 31))),
                (t[2] ^= e = n ^ ((h << 1) | (u >>> 31))),
                (t[3] ^= r),
                (t[12] ^= e),
                (t[13] ^= r),
                (t[22] ^= e),
                (t[23] ^= r),
                (t[32] ^= e),
                (t[33] ^= r),
                (t[42] ^= e),
                (t[43] ^= r),
                (r = a ^ ((l << 1) | (d >>> 31))),
                (t[4] ^= e = s ^ ((d << 1) | (l >>> 31))),
                (t[5] ^= r),
                (t[14] ^= e),
                (t[15] ^= r),
                (t[24] ^= e),
                (t[25] ^= r),
                (t[34] ^= e),
                (t[35] ^= r),
                (t[44] ^= e),
                (t[45] ^= r),
                (r = u ^ ((p << 1) | (c >>> 31))),
                (t[6] ^= e = h ^ ((c << 1) | (p >>> 31))),
                (t[7] ^= r),
                (t[16] ^= e),
                (t[17] ^= r),
                (t[26] ^= e),
                (t[27] ^= r),
                (t[36] ^= e),
                (t[37] ^= r),
                (t[46] ^= e),
                (t[47] ^= r),
                (r = l ^ ((o << 1) | (n >>> 31))),
                (t[8] ^= e = d ^ ((n << 1) | (o >>> 31))),
                (t[9] ^= r),
                (t[18] ^= e),
                (t[19] ^= r),
                (t[28] ^= e),
                (t[29] ^= r),
                (t[38] ^= e),
                (t[39] ^= r),
                (t[48] ^= e),
                (t[49] ^= r),
                (b = t[1]),
                ($ = (t[11] << 4) | (t[10] >>> 28)),
                (W = (t[10] << 4) | (t[11] >>> 28)),
                (B = (t[20] << 3) | (t[21] >>> 29)),
                (I = (t[21] << 3) | (t[20] >>> 29)),
                (at = (t[31] << 9) | (t[30] >>> 23)),
                (ht = (t[30] << 9) | (t[31] >>> 23)),
                (F = (t[40] << 18) | (t[41] >>> 14)),
                (K = (t[41] << 18) | (t[40] >>> 14)),
                (q = (t[2] << 1) | (t[3] >>> 31)),
                (L = (t[3] << 1) | (t[2] >>> 31)),
                (v = (t[12] << 12) | (t[13] >>> 20)),
                (J = (t[22] << 10) | (t[23] >>> 22)),
                (G = (t[23] << 10) | (t[22] >>> 22)),
                (N = (t[33] << 13) | (t[32] >>> 19)),
                (T = (t[32] << 13) | (t[33] >>> 19)),
                (ut = (t[42] << 2) | (t[43] >>> 30)),
                (ft = (t[43] << 2) | (t[42] >>> 30)),
                (et = (t[5] << 30) | (t[4] >>> 2)),
                (rt = (t[4] << 30) | (t[5] >>> 2)),
                (z = (t[14] << 6) | (t[15] >>> 26)),
                (j = (t[15] << 6) | (t[14] >>> 26)),
                (w = (t[24] << 11) | (t[25] >>> 21)),
                (X = (t[34] << 15) | (t[35] >>> 17)),
                (Y = (t[35] << 15) | (t[34] >>> 17)),
                (P = (t[45] << 29) | (t[44] >>> 3)),
                (O = (t[44] << 29) | (t[45] >>> 3)),
                (k = (t[6] << 28) | (t[7] >>> 4)),
                (x = (t[7] << 28) | (t[6] >>> 4)),
                (it = (t[17] << 23) | (t[16] >>> 9)),
                (nt = (t[16] << 23) | (t[17] >>> 9)),
                (C = (t[26] << 25) | (t[27] >>> 7)),
                (U = (t[27] << 25) | (t[26] >>> 7)),
                (M = (t[36] << 21) | (t[37] >>> 11)),
                (_ = (t[37] << 21) | (t[36] >>> 11)),
                (Q = (t[47] << 24) | (t[46] >>> 8)),
                (tt = (t[46] << 24) | (t[47] >>> 8)),
                (H = (t[8] << 27) | (t[9] >>> 5)),
                (V = (t[9] << 27) | (t[8] >>> 5)),
                (E = (t[18] << 20) | (t[19] >>> 12)),
                (R = (t[19] << 20) | (t[18] >>> 12)),
                (ot = (t[29] << 7) | (t[28] >>> 25)),
                (st = (t[28] << 7) | (t[29] >>> 25)),
                (D = (t[38] << 8) | (t[39] >>> 24)),
                (Z = (t[39] << 8) | (t[38] >>> 24)),
                (S = (t[48] << 14) | (t[49] >>> 18)),
                (A = (t[49] << 14) | (t[48] >>> 18)),
                (t[0] =
                  (m = t[0]) ^
                  (~(g = (t[13] << 12) | (t[12] >>> 20)) &
                    (y = (t[25] << 11) | (t[24] >>> 21)))),
                (t[1] = b ^ (~v & w)),
                (t[10] = k ^ (~E & B)),
                (t[11] = x ^ (~R & I)),
                (t[20] = q ^ (~z & C)),
                (t[21] = L ^ (~j & U)),
                (t[30] = H ^ (~$ & J)),
                (t[31] = V ^ (~W & G)),
                (t[40] = et ^ (~it & ot)),
                (t[41] = rt ^ (~nt & st)),
                (t[2] = g ^ (~y & M)),
                (t[3] = v ^ (~w & _)),
                (t[12] = E ^ (~B & N)),
                (t[13] = R ^ (~I & T)),
                (t[22] = z ^ (~C & D)),
                (t[23] = j ^ (~U & Z)),
                (t[32] = $ ^ (~J & X)),
                (t[33] = W ^ (~G & Y)),
                (t[42] = it ^ (~ot & at)),
                (t[43] = nt ^ (~st & ht)),
                (t[4] = y ^ (~M & S)),
                (t[5] = w ^ (~_ & A)),
                (t[14] = B ^ (~N & P)),
                (t[15] = I ^ (~T & O)),
                (t[24] = C ^ (~D & F)),
                (t[25] = U ^ (~Z & K)),
                (t[34] = J ^ (~X & Q)),
                (t[35] = G ^ (~Y & tt)),
                (t[44] = ot ^ (~at & ut)),
                (t[45] = st ^ (~ht & ft)),
                (t[6] = M ^ (~S & m)),
                (t[7] = _ ^ (~A & b)),
                (t[16] = N ^ (~P & k)),
                (t[17] = T ^ (~O & x)),
                (t[26] = D ^ (~F & q)),
                (t[27] = Z ^ (~K & L)),
                (t[36] = X ^ (~Q & H)),
                (t[37] = Y ^ (~tt & V)),
                (t[46] = at ^ (~ut & et)),
                (t[47] = ht ^ (~ft & rt)),
                (t[8] = S ^ (~m & g)),
                (t[9] = A ^ (~b & v)),
                (t[18] = P ^ (~k & E)),
                (t[19] = O ^ (~x & R)),
                (t[28] = F ^ (~q & z)),
                (t[29] = K ^ (~L & j)),
                (t[38] = Q ^ (~H & $)),
                (t[39] = tt ^ (~V & W)),
                (t[48] = ut ^ (~et & it)),
                (t[49] = ft ^ (~rt & nt)),
                (t[0] ^= f[i]),
                (t[1] ^= f[i + 1])
          }
          if (o) t.exports = _
          else for (A = 0; A < S.length; ++A) i[S[A]] = _[S[A]]
        })()
      }),
      (function (t) {
        ;(t[(t.CreatingDataToken = 0)] = 'CreatingDataToken'),
          (t[(t.DataTokenCreated = 1)] = 'DataTokenCreated'),
          (t[(t.EncryptingFiles = 2)] = 'EncryptingFiles'),
          (t[(t.FilesEncrypted = 3)] = 'FilesEncrypted'),
          (t[(t.StoringDdo = 4)] = 'StoringDdo'),
          (t[(t.DdoStored = 5)] = 'DdoStored')
      })(Us || (Us = {})),
      (function (t) {
        t[(t.TransferDataToken = 0)] = 'TransferDataToken'
      })(Ds || (Ds = {})),
      (function (t) {
        ;(t.Loading = 'Loading'),
          (t.Unknown = 'Unknown'),
          (t.Stopped = 'Stopped'),
          (t.Working = 'Working')
      })(Zs || (Zs = {})),
      (function (t) {
        t[(t.TransferDataToken = 0)] = 'TransferDataToken'
      })(Fs || (Fs = {})),
      Object.freeze({
        WarmingUp: 1,
        Started: 10,
        ConfiguringVolumes: 20,
        ProvisioningSuccess: 30,
        DataProvisioningFailed: 31,
        AlgorithmProvisioningFailed: 32,
        RunningAlgorithm: 40,
        FilteringResults: 50,
        PublishingResult: 60,
        Completed: 70,
        Stopped: 80,
        Deleted: 90
      }),
      (function (t) {
        ;(t[(t.CreatingPool = 0)] = 'CreatingPool'),
          (t[(t.ApprovingDatatoken = 1)] = 'ApprovingDatatoken'),
          (t[(t.ApprovingOcean = 2)] = 'ApprovingOcean'),
          (t[(t.SetupPool = 3)] = 'SetupPool')
      })(Ks || (Ks = {})),
      (function (t) {
        ;(t[(t.CreatingExchange = 0)] = 'CreatingExchange'),
          (t[(t.ApprovingDatatoken = 1)] = 'ApprovingDatatoken')
      })(Hs || (Hs = {})),
      (function (t) {
        ;(t[(t.MakeDispenserMinter = 0)] = 'MakeDispenserMinter'),
          (t[(t.AcceptingNewMinter = 1)] = 'AcceptingNewMinter')
      })(Vs || (Vs = {})),
      (function (t) {
        ;(t[(t.MakeOwnerMinter = 0)] = 'MakeOwnerMinter'),
          (t[(t.AcceptingNewMinter = 1)] = 'AcceptingNewMinter')
      })($s || ($s = {}))
    const fa = {
      networkId: null,
      network: 'unknown',
      metadataCacheUri: 'https://aquarius.oceanprotocol.com',
      nodeUri: 'http://localhost:8545',
      providerUri: 'http://127.0.0.1:8030',
      subgraphUri: null,
      explorerUri: null,
      oceanTokenAddress: null,
      oceanTokenSymbol: 'OCEAN',
      factoryAddress: '0x1234',
      poolFactoryAddress: null,
      fixedRateExchangeAddress: null,
      dispenserAddress: null,
      metadataContractAddress: null,
      startBlock: 0,
      transactionBlockTimeout: 50,
      transactionConfirmationBlocks: 1,
      transactionPollingTimeout: 750,
      gasFeeMultiplier: 1
    }
    async function da(t, e) {
      try {
        const r = await D.default.get(`${e}/api/v1/aquarius/assets/ddo/${t}`)
        if (!r || 200 !== r.status || !r.data) return
        const i = Z({}, r.data)
        return new ut(i)
      } catch (t) {
        D.default.isCancel(t) ? F.log(t.message) : F.error(t.message)
      }
    }
    async function la(t, e, r, i, n) {
      const o = new Date(Date.now()).toISOString().split('.')[0] + 'Z',
        s = {
          created: o,
          updated: o,
          type: e.service[0].attributes.main.type,
          name: e.service[0].attributes.main.name,
          description:
            e.service[0].attributes.additionalInformation.description,
          tags: e.service[0].attributes.additionalInformation.tags,
          author: e.service[0].attributes.main.author,
          license: e.service[0].attributes.main.license,
          links: e.service[0].attributes.additionalInformation.links.url,
          additionalInformation: {
            termsAndConditions:
              e.service[0].attributes.additionalInformation.termsAndConditions
          }
        },
        a = Z(
          {
            id: t,
            type: e.service[1].type,
            files: n || '',
            datatokenAddress: i,
            serviceEndpoint: e.service[1].serviceEndpoint,
            timeout: e.service[1].attributes.main.timeout
          },
          'compute' === e.service[1].type && {
            compute: {
              namespace: '',
              allowRawAlgorithm: !1,
              allowNetworkAccess: !0,
              publisherTrustedAlgorithmPublishers: null,
              publisherTrustedAlgorithms: null
            }
          }
        )
      return {
        '@context': ['https://w3id.org/did/v1'],
        id: t,
        version: '4.0.0',
        chainId: e.chainId,
        nftAddress: r,
        metadata: s,
        services: [a]
      }
    }
    Z({}, fa),
      Z({}, fa, {
        networkId: 8996,
        network: 'development',
        metadataCacheUri: 'http://127.0.0.1:5000',
        rbacUri: 'http://127.0.0.1:3000'
      }),
      Z({}, fa, {
        networkId: 3,
        network: 'ropsten',
        nodeUri: 'https://ropsten.infura.io/v3',
        providerUri: 'https://provider.ropsten.oceanprotocol.com',
        subgraphUri: 'https://subgraph.ropsten.oceanprotocol.com',
        explorerUri: 'https://ropsten.etherscan.io',
        startBlock: 9227563
      }),
      Z({}, fa, {
        networkId: 4,
        network: 'rinkeby',
        nodeUri: 'https://rinkeby.infura.io/v3',
        providerUri: 'https://provider.rinkeby.oceanprotocol.com',
        subgraphUri: 'https://subgraph.rinkeby.oceanprotocol.com',
        explorerUri: 'https://rinkeby.etherscan.io',
        startBlock: 7294090
      }),
      Z({}, fa, {
        networkId: 1,
        network: 'mainnet',
        nodeUri: 'https://mainnet.infura.io/v3',
        providerUri: 'https://provider.mainnet.oceanprotocol.com',
        subgraphUri: 'https://subgraph.mainnet.oceanprotocol.com',
        explorerUri: 'https://etherscan.io',
        startBlock: 11105459,
        transactionBlockTimeout: 150,
        transactionConfirmationBlocks: 5,
        transactionPollingTimeout: 1750,
        gasFeeMultiplier: 1.05
      }),
      Z({}, fa, {
        networkId: 137,
        network: 'polygon',
        nodeUri: 'https://polygon-mainnet.infura.io/v3',
        providerUri: 'https://provider.polygon.oceanprotocol.com',
        subgraphUri: 'https://subgraph.polygon.oceanprotocol.com',
        explorerUri: 'https://polygonscan.com',
        oceanTokenSymbol: 'mOCEAN',
        startBlock: 11005222,
        gasFeeMultiplier: 1.05
      }),
      Z({}, fa, {
        networkId: 1287,
        network: 'moonbeamalpha',
        nodeUri: 'https://rpc.testnet.moonbeam.network',
        providerUri: 'https://provider.moonbeamalpha.oceanprotocol.com',
        subgraphUri: 'https://subgraph.moonbeamalpha.oceanprotocol.com',
        explorerUri: 'https://moonbase-blockscout.testnet.moonbeam.network/',
        startBlock: 90707
      }),
      Z({}, fa, {
        networkId: 2021e3,
        network: 'gaiaxtestnet',
        nodeUri: 'https://rpc.gaiaxtestnet.oceanprotocol.com',
        providerUri: 'https://provider.gaiaxtestnet.oceanprotocol.com',
        subgraphUri: 'https://subgraph.gaiaxtestnet.oceanprotocol.com',
        explorerUri: 'https://blockscout.gaiaxtestnet.oceanprotocol.com'
      }),
      Z({}, fa, {
        networkId: 2021001,
        network: 'catenaxtestnet',
        nodeUri: 'https://rpc.catenaxtestnet.oceanprotocol.com',
        providerUri: 'https://provider.catenaxtestnet.oceanprotocol.com',
        subgraphUri: 'https://subgraph.catenaxtestnet.oceanprotocol.com',
        explorerUri: 'https://blockscout.catenaxtestnet.oceanprotocol.com',
        metadataCacheUri: 'https://aquarius.catenaxtestnet.oceanprotocol.com'
      }),
      Z({}, fa, {
        networkId: 80001,
        network: 'mumbai',
        nodeUri: 'https://polygon-mumbai.infura.io/v3',
        providerUri: 'https://provider.mumbai.oceanprotocol.com',
        subgraphUri: 'https://subgraph.mumbai.oceanprotocol.com',
        explorerUri: 'https://mumbai.polygonscan.com'
      }),
      Z({}, fa, {
        networkId: 56,
        network: 'bsc',
        nodeUri: 'https://bsc-dataseed.binance.org',
        providerUri: 'https://provider.bsc.oceanprotocol.com',
        subgraphUri: 'https://subgraph.bsc.oceanprotocol.com',
        explorerUri: 'https://bscscan.com/',
        gasFeeMultiplier: 1.05
      }),
      Z({}, fa, {
        networkId: 44787,
        network: 'celoalfajores',
        nodeUri: 'https://alfajores-forno.celo-testnet.org',
        providerUri: 'https://provider.celoalfajores.oceanprotocol.com',
        subgraphUri: 'https://subgraph.celoalfajores.oceanprotocol.com',
        explorerUri: 'https://alfajores-blockscout.celo-testnet.org'
      }),
      Z({}, fa, {
        networkId: 246,
        network: 'energyweb',
        nodeUri: 'https://rpc.energyweb.org',
        providerUri: 'https://provider.energyweb.oceanprotocol.com',
        subgraphUri: 'https://subgraph.energyweb.oceanprotocol.com',
        explorerUri: 'https://explorer.energyweb.org',
        gasFeeMultiplier: 1.05
      }),
      Z({}, fa, {
        networkId: 1285,
        network: 'moonriver',
        nodeUri: 'https://moonriver.api.onfinality.io/public',
        providerUri: 'https://provider.moonriver.oceanprotocol.com',
        subgraphUri: 'https://subgraph.moonriver.oceanprotocol.com',
        explorerUri: 'https://blockscout.moonriver.moonbeam.network',
        gasFeeMultiplier: 1.05
      }),
      (t.convertDDO = la),
      (t.getAndConvertDDO = async function (t, e, r, i, n, o) {
        const s = await da(t, n)
        return await la(e, s, r, i, o)
      }),
      (t.getDDO = da)
  }
)
//# sourceMappingURL=index.umd.js.map
