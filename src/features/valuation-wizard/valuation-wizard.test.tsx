import assert from "node:assert/strict";

import React, { createRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { cityNameFromSlug } from "./slug";
import { StickySubmitCta } from "./sticky-submit-cta";
import { TrustReminderBadge } from "./trust-reminder-badge";
import { WhatHappensNext } from "./what-happens-next";

const trustBadgeStepSnapshots = [1, 2, 3].map((step) => ({
  step,
  html: renderToStaticMarkup(<TrustReminderBadge />)
}));

for (const snapshot of trustBadgeStepSnapshots) {
  assert.match(snapshot.html, /Datos protegidos RGPD/);
  assert.match(snapshot.html, /Respuesta en 24h/);
  assert.match(snapshot.html, /Sin llamada de venta/);
}

const whatHappensNextCollapsed = renderToStaticMarkup(<WhatHappensNext city="Hernani" />);
assert.match(whatHappensNextCollapsed, /¿Qué pasa después de enviar\?/);
assert.match(whatHappensNextCollapsed, /aria-expanded="false"/);

const whatHappensNextExpanded = renderToStaticMarkup(
  <WhatHappensNext city="Hernani" defaultOpen />
);
assert.match(whatHappensNextExpanded, /aria-expanded="true"/);
assert.match(whatHappensNextExpanded, /un agente colegiado de la red UrbanIQ en Hernani/);

assert.equal(cityNameFromSlug("hernani"), "Hernani");
assert.equal(cityNameFromSlug("malaga-el-palo"), "Málaga El Palo");

const step3StickySnapshot = renderToStaticMarkup(
  <div data-testid="valuation-step-3-snapshot">
    <WhatHappensNext city="Málaga El Palo" defaultOpen />
    <StickySubmitCta
      enabled
      isSubmitting={false}
      submitRef={createRef<HTMLButtonElement>()}
      onSubmit={() => undefined}
    />
  </div>
);

assert.match(step3StickySnapshot, /Enviar y recibir valoración en 24h/);
assert.match(step3StickySnapshot, /from-\[#2F80ED\]/);
assert.match(step3StickySnapshot, /Málaga El Palo/);

console.log("valuation wizard tests passed");
