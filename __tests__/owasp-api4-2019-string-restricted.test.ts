import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "./__helpers__/helper";

testRule("owasp:api4:2019-string-restricted", [
  {
    name: "valid case: format (oas2)",
    document: {
      swagger: "2.0",
      info: { version: "1.0" },
      definitions: {
        Foo: {
          type: "string",
          format: "email",
        },
      },
    },
    errors: [],
  },

  {
    name: "valid case: format (oas2)",
    document: {
      swagger: "2.0",
      info: { version: "1.0" },
      definitions: {
        Foo: {
          type: "string",
          pattern: "/^foo/",
        },
      },
    },
    errors: [],
  },

  {
    name: "valid case: format (oas3)",
    document: {
      openapi: "3.0.0",
      info: { version: "1.0" },
      components: {
        schemas: {
          Foo: {
            type: "string",
            format: "email",
          },
        },
      },
    },
    errors: [],
  },

  {
    name: "valid case: format (oas3)",
    document: {
      openapi: "3.0.0",
      info: { version: "1.0" },
      components: {
        schemas: {
          Foo: {
            type: "string",
            pattern: "/^foo/",
          },
        },
      },
    },
    errors: [],
  },

  {
    name: "valid case: format (oas3.1)",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      components: {
        schemas: {
          Foo: {
            type: ["null", "string"],
            format: "email",
          },
        },
      },
    },
    errors: [],
  },

  {
    name: "valid case: pattern (oas3.1)",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      components: {
        schemas: {
          Foo: {
            type: ["null", "string"],
            pattern: "/^foo/",
          },
        },
      },
    },
    errors: [],
  },

  {
    name: "invalid case: neither format or pattern (oas2)",
    document: {
      swagger: "2.0",
      info: { version: "1.0" },
      definitions: {
        Foo: {
          type: "string",
        },
      },
    },
    errors: [
      {
        message: "Schema of type string must specify a format or pattern.",
        path: ["definitions", "Foo"],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },

  {
    name: "invalid case: neither format or pattern (oas3)",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      components: {
        schemas: {
          Foo: {
            type: ["null", "string"],
          },

          Bar: {
            type: "string",
          },
        },
      },
    },
    errors: [
      {
        message: "Schema of type string must specify a format or pattern.",
        path: ["components", "schemas", "Foo"],
        severity: DiagnosticSeverity.Error,
      },
      {
        message: "Schema of type string must specify a format or pattern.",
        path: ["components", "schemas", "Bar"],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },
]);
