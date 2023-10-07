// Use the CPU backend for running tests.
import "@aresobus/lightweight-models-backend-cpu";
import * as jasmine_util from "@aresobus/lightweight-models-core/dist/jasmine_util";
import { runTests } from "../test_util";

runTests(jasmine_util);
