export async function submitRodinJob(formData: FormData) {
  const response = await fetch("/api/rodin", {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    throw new Error(`La solicitud a la API falló: ${response.status}`)
  }

  return await response.json()
}

export async function checkJobStatus(subscriptionKey: string) {
  const response = await fetch(`/api/status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      subscription_key: subscriptionKey,
    }),
  })

  if (!response.ok) {
    throw new Error(`La verificación de estado falló: ${response.status}`)
  }

  return await response.json()
}

export async function downloadModel(taskUuid: string) {
  const response = await fetch(`/api/download`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      task_uuid: taskUuid,
    }),
  })

  if (!response.ok) {
    throw new Error(`La descarga falló: ${response.status}`)
  }

  return await response.json()
}
