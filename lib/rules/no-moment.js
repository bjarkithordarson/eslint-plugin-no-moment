module.exports = {
    meta: {
      type: "problem",
      docs: {
        description: "Disallow use of moment.js",
        category: "Best Practices",
      },
      messages: {
        noMoment: "Do not use moment.js. Use date-fns or native Date instead.",
      },
      schema: [],
    },
    create(context) {
      return {
        ImportDeclaration(node) {
          if (node.source.value === "moment") {
            context.report({ node, messageId: "noMoment" });
          }
        },
        CallExpression(node) {
          if (
            node.callee.name === "require" &&
            node.arguments[0]?.value === "moment"
          ) {
            context.report({ node, messageId: "noMoment" });
          }
        },
      };
    },
  };