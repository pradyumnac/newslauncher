import { describe, test, expect } from "vitest";
import { escapeHtml, generateKeySeq } from "../../src/bookmark-utils";
import {
  keybindingTestNames,
  usedCombosEmpty,
  usedCombosWithGi,
  usedCombosAllGithub,
} from "../fixtures/bookmarks.js";

describe("Helper Functions", () => {
  describe("escapeHtml", () => {
    test("EH-001: escapes ampersand correctly", () => {
      expect(escapeHtml("Tom & Jerry")).toBe("Tom &amp; Jerry");
    });

    test("EH-002: escapes less than correctly", () => {
      expect(escapeHtml("5 < 10")).toBe("5 &lt; 10");
    });

    test("EH-003: escapes double quote correctly", () => {
      expect(escapeHtml('He said "Hi"')).toBe("He said &quot;Hi&quot;");
    });

    test("EH-004: escapes single quote correctly", () => {
      expect(escapeHtml("It's fine")).toBe("It&#039;s fine");
    });

    test("EH-005: escapes all special characters", () => {
      // Note: > is not escaped by escapeHtml, only <, &, ", and '
      expect(escapeHtml('<script>alert("XSS")</script>')).toBe(
        "&lt;script>alert(&quot;XSS&quot;)&lt;/script>"
      );
    });

    test("EH-006: returns unchanged string without special characters", () => {
      expect(escapeHtml("Hello World")).toBe("Hello World");
    });

    test("EH-007: returns empty string for empty input", () => {
      expect(escapeHtml("")).toBe("");
    });

    test("EH-008: escapes only special characters", () => {
      // Note: > is not escaped by escapeHtml, only <, &, ", and '
      expect(escapeHtml("&<>\"'")).toBe("&amp;&lt;>&quot;&#039;");
    });

    test("EH-009: escapes multiple occurrences", () => {
      expect(escapeHtml("A & B & C")).toBe("A &amp; B &amp; C");
    });
  });

  describe("generateKeySeq", () => {
    test('KG-001: generates "gi" from "Github"', () => {
      const usedCombos = new Set();
      expect(generateKeySeq(keybindingTestNames.simple, usedCombos)).toBe("gi");
    });

    test('KG-002: generates "bu" from "Business Standard"', () => {
      const usedCombos = new Set();
      expect(generateKeySeq(keybindingTestNames.withSpaces, usedCombos)).toBe(
        "bu"
      );
    });

    test("KG-003: returns next available when first combo used", () => {
      expect(generateKeySeq(keybindingTestNames.simple, usedCombosWithGi)).toBe(
        "it"
      );
    });

    test("KG-004: returns null for single character", () => {
      expect(
        generateKeySeq(keybindingTestNames.short, usedCombosEmpty)
      ).toBeNull();
    });

    test("KG-005: returns null for empty string", () => {
      expect(
        generateKeySeq(keybindingTestNames.empty, usedCombosEmpty)
      ).toBeNull();
    });

    test('KG-006: generates "12" from "123test"', () => {
      const usedCombos = new Set();
      expect(generateKeySeq(keybindingTestNames.numbers, usedCombos)).toBe(
        "12"
      );
    });

    test("KG-007: skips special characters", () => {
      const usedCombos = new Set();
      expect(generateKeySeq(keybindingTestNames.specialChars, usedCombos)).toBe(
        "te"
      );
    });

    test("KG-008: returns null when all pairs used", () => {
      expect(
        generateKeySeq(keybindingTestNames.simple, usedCombosAllGithub)
      ).toBeNull();
    });

    test("KG-009: handles mixed case by lowercasing", () => {
      const usedCombos = new Set();
      expect(generateKeySeq(keybindingTestNames.mixedCase, usedCombos)).toBe(
        "gi"
      );
    });

    test("KG-011: trims leading spaces", () => {
      const usedCombos = new Set();
      expect(
        generateKeySeq(keybindingTestNames.leadingSpaces, usedCombos)
      ).toBe("gi");
    });

    test("KG-012: removes internal spaces", () => {
      const usedCombos = new Set();
      expect(
        generateKeySeq(keybindingTestNames.internalSpaces, usedCombos)
      ).toBe("gi");
    });

    test('KG-013: generates "12" from numbers only', () => {
      const usedCombos = new Set();
      expect(generateKeySeq(keybindingTestNames.numbersOnly, usedCombos)).toBe(
        "12"
      );
    });

    test('KG-014: generates "1p" from "1Password"', () => {
      const usedCombos = new Set();
      expect(
        generateKeySeq(keybindingTestNames.startsWithNumber, usedCombos)
      ).toBe("1p");
    });

    test('KG-015: returns "ab" from "ab"', () => {
      const usedCombos = new Set();
      expect(generateKeySeq(keybindingTestNames.minimal, usedCombos)).toBe(
        "ab"
      );
    });

    test("KG-016: adds to usedCombos set", () => {
      const usedCombos = new Set();
      generateKeySeq(keybindingTestNames.simple, usedCombos);
      expect(usedCombos.has("gi")).toBe(true);
    });
  });
});
