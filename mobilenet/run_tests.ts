// Use the CPU backend for running tests.
import "@aresobus/aresobus-backend-cpu";
import * as jasmine_util from "@aresobus/aresobus-core/dist/jasmine_util";
import { runTests } from "../test_util";

runTests(jasmine_util);
