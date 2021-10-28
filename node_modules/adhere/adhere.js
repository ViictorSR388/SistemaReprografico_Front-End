var builders = []

module.exports = function (method, additional, f) {
    if (arguments.length == 2) {
        f = additional
        additional = 0
    }
    // Preserving arity costs next to nothing; the call to `execute` in
    // these functions will be inlined. The airty function itself will never
    // be inlined because it is in a different context than that of our
    // dear user, but it will be compiled.

    // Avert your eyes if you're squeamish.
    while (builders.length < method.length + additional + 1) {
        var args = []
        for (var i = 0, I = builders.length; i < I; i++) {
            args[i] = '_' + i
        }
        var builder = (new Function('', '                                   \n\
            return function (f) {                                           \n\
                return function (' + args.join(',') + ') {                  \n\
                    var vargs = new Array                                   \n\
                    for (var i = 0, I = arguments.length; i < I; i++) {     \n\
                        vargs.push(arguments[i])                            \n\
                    }                                                       \n\
                    f(this, vargs)                                          \n\
                }                                                           \n\
            }                                                               \n\
       '))()
       builders.push(builder)
    }
    var adherence = builders[method.length + additional](f)

    adherence.toString = function () { return method.toString() }

    return adherence
}
