/*
Remix uses app/entry.client.tsx as the entry point for the browser bundle. 
This module gives you full control over the "hydrate" step
after JavaScript loads into the document.
*/

import { RemixBrowser } from "@remix-run/react";
import { StrictMode } from "react";
// React 17
// import { hydrate } from "react-dom";
// hydrate(<RemixBrowser />, document);

// React 18
import { hydrateRoot } from "react-dom/client";
hydrateRoot(document, <StrictMode>
                        <RemixBrowser />
                    </StrictMode>);
