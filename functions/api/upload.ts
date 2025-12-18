export const onRequestPost: PagesFunction = async ({ request, env }) => {
  try {
    // ① 是否进入了 Pages Function
    if (!env) {
      return new Response(
        JSON.stringify({ step: 'init', ok: false, error: 'No env object' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // ② 是否拿到 formData
    const formData = await request.formData()
    if (!formData) {
      return new Response(
        JSON.stringify({ step: 'formData', ok: false, error: 'No formData' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // ③ 是否有 file
    const file = formData.get('file')
    if (!(file instanceof File)) {
      return new Response(
        JSON.stringify({
          step: 'file',
          ok: false,
          error: 'File field missing or not a File',
          receivedType: typeof file,
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // ④ 是否绑定了 R2
    const bucket = env.R2_BUCKET
    if (!bucket) {
      return new Response(
        JSON.stringify({
          step: 'r2',
          ok: false,
          error: 'R2 bucket not bound',
          envKeys: Object.keys(env),
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // ⑤ 写入 R2
    const key = `test-${Date.now()}-${file.name}`
    const buffer = await file.arrayBuffer()

    await bucket.put(key, buffer, {
      httpMetadata: { contentType: file.type },
    })

    // ✅ 成功
    return new Response(
      JSON.stringify({
        ok: true,
        step: 'done',
        key,
        size: file.size,
        type: file.type,
        url: env.R2_PUBLIC_DOMAIN
          ? `https://${env.R2_PUBLIC_DOMAIN}/${key}`
          : null,
      }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (err: any) {
    // ❌ 捕获所有异常
    return new Response(
      JSON.stringify({
        ok: false,
        step: 'catch',
        error: err?.message || String(err),
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
